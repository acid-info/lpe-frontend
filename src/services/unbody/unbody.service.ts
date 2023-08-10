import { ApolloClient, InMemoryCache } from '@apollo/client'
import {
  GetAllArticleSlugsDocument,
  GetAllTopicsDocument,
  GetArticlePostQueryDocument,
  GetArticlesFromSameAuthorsDocument,
  GetFeaturedArticlesDocument,
  GetHomepagePostsDocument,
  GetObjectsGoogleDocWhereInpObj,
  GetObjectsTextBlockWhereInpObj,
  GetRelatedPostsDocument,
  SearchArticlesDocument,
  SearchBlocksDocument,
  Txt2VecOpenAiGetObjectsTextBlockNearTextInpObj,
} from '../../lib/unbody/unbody.generated'
import { ApiResponse, SearchResultItem } from '../../types/data.types'
import { LPE } from '../../types/lpe.types'
import { unbodyDataTypes } from './dataTypes'
import { UnbodyHelpers } from './unbody.helpers'

const articleDocument = unbodyDataTypes.get({
  objectType: 'GoogleDoc',
  classes: ['article', 'document'],
})!
const articleSearchResultItem = unbodyDataTypes.get({
  classes: ['article', 'search'],
})!
const podcastShowDocument = unbodyDataTypes.get({
  classes: ['podcast', 'document'],
  objectType: 'GoogleDoc',
})!

export class UnbodyService {
  client: ApolloClient<any> = null as any
  helpers = UnbodyHelpers

  constructor(private apiKey: string, private projectId: string) {
    const cache = new InMemoryCache({})

    this.client = new ApolloClient({
      uri: 'https://graphql.unbody.io',
      cache,
      headers: {
        authorization: this.apiKey,
        'x-project-id': this.projectId,
      },
      resolvers: {
        GoogleDoc: {
          mentionsObj(rootValue, args, context, info) {
            return JSON.parse(rootValue.mentions || '')
          },
          tocObj(rootValue, args, context, info) {
            return JSON.parse(rootValue.toc || '[]')
          },
        },
        TextBlock: {
          footnotesObj(rootValue, args, context, info) {
            return JSON.parse(rootValue.footnotes || '[]')
          },
        },
      },
      ssrMode: true,
    })
  }

  handleResponse = <T>(
    data: T | null = null,
    errors: any = null,
  ): ApiResponse<T> => {
    if (errors || !data) {
      console.log(errors)
      return {
        data: data as any,
        errors: JSON.stringify(errors),
      }
    }
    return {
      data,
      errors,
    }
  }

  getFeaturedPost = async (): Promise<ApiResponse<LPE.Article.Data | null>> => {
    try {
      const { data, errors, error } = await this.client.query({
        query: GetFeaturedArticlesDocument,
        variables: {
          ...this.helpers.args.page(1, 1),
          filter: {
            operator: 'Like',
            path: ['pathString'],
            valueString: '*/highlighted/*',
          },
        },
      })

      if (!data) return this.handleResponse(null, 'No data')

      const docs = data.Get?.GoogleDoc || []
      const [doc] = docs

      const result = doc
        ? await unbodyDataTypes.transform<LPE.Article.Data>(
            articleDocument,
            doc,
          )
        : null

      return this.handleResponse(result)
    } catch (error) {
      return this.handleResponse(null, error)
    }
  }

  getHomepagePosts = async (): Promise<
    ApiResponse<{
      posts: LPE.Article.Data[]
      featured: LPE.Article.Data | null
    }>
  > => {
    try {
      const { data, errors, error } = await this.client.query({
        query: GetHomepagePostsDocument,
        variables: {
          ...this.helpers.args.page(1, 10),
          filter: this.helpers.args.wherePublished(true),
        },
      })

      if (!data)
        return this.handleResponse({ featured: null, posts: [] }, 'No data')

      const docs = data.Get?.GoogleDoc || []

      return this.handleResponse({
        featured: (await this.getFeaturedPost())?.data,
        posts: await unbodyDataTypes.transformMany<LPE.Article.Data>(
          articleDocument,
          docs,
        ),
      })
    } catch (error) {
      return this.handleResponse({ featured: null, posts: [] }, error)
    }
  }

  getAllArticlePostSlugs = async (): Promise<
    ApiResponse<{ slug: string }[]>
  > => {
    try {
      const result: { slug: string }[] = []

      let page = 1

      while (true) {
        const res = await this.client.query({
          query: GetAllArticleSlugsDocument,
          variables: {
            filter: UnbodyHelpers.args.wherePublished(true),
            ...this.helpers.args.page(page, 50),
          },
        })

        const docs = res.data.Get?.GoogleDoc ?? []

        if (docs.length === 0) break

        result.push(...docs.map((doc) => ({ slug: doc!.slug! })))

        page++
      }

      return this.handleResponse(result)
    } catch (error) {
      return this.handleResponse([], error)
    }
  }

  getArticlePost = async (
    slug: string,
    published: boolean = true,
  ): Promise<ApiResponse<LPE.Article.Data | null>> => {
    try {
      const res = await this.client.query({
        query: GetArticlePostQueryDocument,
        variables: {
          filter: {
            operator: 'And',
            operands: [
              UnbodyHelpers.args.wherePublished(published),
              UnbodyHelpers.args.whereSlugIs(slug),
            ],
          },
        },
      })

      const docs = res.data.Get?.GoogleDoc ?? []
      const doc = docs[0]

      return doc
        ? this.handleResponse(
            await unbodyDataTypes.transform<LPE.Article.Data>(
              articleDocument,
              doc,
            ),
          )
        : this.handleResponse(null, 'No data')
    } catch (error) {
      return this.handleResponse(null, error)
    }
  }

  getRelatedArticles = async (id: string, published: boolean = true) => {
    try {
      const res = await this.client.query({
        query: GetRelatedPostsDocument,
        variables: {
          id,
          filter: {
            operator: 'And',
            operands: [
              UnbodyHelpers.args.wherePublished(true),
              UnbodyHelpers.args.whereIdIsNot(id),
            ],
          },
          ...this.helpers.args.page(1, 10),
        },
      })

      const docs = res.data.Get?.GoogleDoc || []

      if (res.errors) {
        return this.handleResponse([], res.errors)
      }

      return this.handleResponse(docs)
    } catch (error) {
      return this.handleResponse([], error)
    }
  }

  getArticlesFromSameAuthors = async (
    slug: string,
    authors: string[],
    published: boolean = true,
  ): Promise<ApiResponse<LPE.Article.Metadata[]>> => {
    try {
      const res = await this.client.query({
        query: GetArticlesFromSameAuthorsDocument,
        variables: {
          authors: authors.join(' '),
          filter: {
            operator: 'And',
            operands: [
              UnbodyHelpers.args.whereSlugIsNot(slug),
              UnbodyHelpers.args.wherePublished(published),
            ],
          },
          ...this.helpers.args.page(1, 10),
        },
      })

      const docs = res.data.Get?.GoogleDoc || []

      if (docs.length === 0)
        return this.handleResponse([], 'No data for same authors')

      return this.handleResponse(
        await unbodyDataTypes.transformMany<LPE.Article.Metadata>(
          articleDocument,
          docs,
        ),
      )
    } catch (error) {
      return this.handleResponse([], error)
    }
  }

  searchBlocks = async ({
    q = '',
    tags = [],
    published = true,
    articleSlug,
  }: {
    q?: string
    tags?: string[]
    published?: boolean
    articleSlug?: string
  } = {}) => {
    try {
      const nearText =
        (q.trim().length > 0 || tags.length > 0) &&
        ({
          concepts: [q, ...tags],
          certainty: 0.75,
        } as Txt2VecOpenAiGetObjectsTextBlockNearTextInpObj)

      const filter = {
        operator: 'And',
        operands: [
          this.helpers.args.wherePublished(published, [
            'document',
            'GoogleDoc',
            'pathString',
          ]),
          ...(articleSlug
            ? [
                this.helpers.args.whereSlugIs(articleSlug, [
                  'document',
                  'GoogleDoc',
                  'slug',
                ]),
              ]
            : []),
        ],
      } as GetObjectsTextBlockWhereInpObj

      const {
        data: {
          Get: { ImageBlock, TextBlock },
        },
      } = await this.client.query({
        query: SearchBlocksDocument,
        variables: {
          ...this.helpers.args.page(1, 20),
          imageFilter: filter,
          textFilter: filter,
          ...(nearText
            ? {
                textNearText: nearText,
                imageNearText: nearText,
              }
            : {}),
        },
      })

      const blocks = await unbodyDataTypes.transformMany<
        SearchResultItem<LPE.Article.ContentBlock>
      >(articleSearchResultItem, [...(ImageBlock || []), ...(TextBlock || [])])

      const result = blocks.sort((a, b) => b.score - a.score)

      return this.handleResponse(result)
    } catch (error) {
      return this.handleResponse([], error)
    }
  }

  searchArticles = async (
    q: string = '',
    tags: string[] = [],
    published: boolean = true,
  ) => {
    try {
      const { data } = await this.client.query({
        query: SearchArticlesDocument,
        variables: {
          ...(q.trim().length > 0
            ? {
                nearText: {
                  concepts: [q],
                },
              }
            : {}),

          filter: {
            operator: 'And',
            operands: [
              this.helpers.args.wherePublished(published),
              ...tags.map(
                (tag) =>
                  ({
                    operator: 'Like',
                    path: ['tags'],
                    valueString: tag,
                  } as GetObjectsGoogleDocWhereInpObj),
              ),
            ],
          },
        },
      })

      if (!data) return this.handleResponse([], 'No data')

      const result = await unbodyDataTypes.transformMany<LPE.Article.Data>(
        articleSearchResultItem,
        data.Get.GoogleDoc || [],
      )

      return this.handleResponse(result)
    } catch (error) {
      return this.handleResponse(null, error)
    }
  }

  getTopics = async (published: boolean = true) => {
    try {
      const { data } = await this.client.query({
        query: GetAllTopicsDocument,
        variables: {
          filter: this.helpers.args.wherePublished(published),
        },
      })

      const topics = data.Aggregate.GoogleDoc.map((doc) => doc.groupedBy.value)

      return this.handleResponse(topics)
    } catch (error) {
      return this.handleResponse([], error)
    }
  }

  getPodcastShows = async (): Promise<ApiResponse<LPE.Podcast.Show[]>> => {
    try {
      const { data } = await this.client.query({
        query: GetArticlePostQueryDocument,
        variables: {
          filter: {
            operator: 'Like',
            path: ['pathString'],
            valueString: '*/Podcasts/*/index',
          },
        },
      })

      const docs = data.Get.GoogleDoc
      const result = await unbodyDataTypes.transformMany<LPE.Podcast.Show>(
        podcastShowDocument,
        docs,
      )

      console.log(JSON.stringify(result))

      return this.handleResponse([])
    } catch (error) {
      return this.handleResponse([], error)
    }
  }
}

const unbodyApi = new UnbodyService(
  process.env.UNBODY_API_KEY || '',
  process.env.UNBODY_LPE_PROJECT_ID || '',
)
export default unbodyApi
