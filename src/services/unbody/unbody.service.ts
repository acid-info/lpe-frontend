import { ApolloClient, InMemoryCache } from '@apollo/client'
import {
  CountDocumentsDocument,
  CountDocumentsQueryVariables,
  GetAllArticleSlugsDocument,
  GetAllTopicsDocument,
  GetArticlePostQueryDocument,
  GetArticlesFromSameAuthorsDocument,
  GetHomepagePostsDocument,
  GetObjectsGoogleDocWhereInpObj,
  GetObjectsTextBlockWhereInpObj,
  GetPostsDocument,
  GetPostsQueryVariables,
  SearchArticlesDocument,
  SearchBlocksDocument,
  Txt2VecOpenAiGetObjectsTextBlockNearTextInpObj,
} from '../../lib/unbody/unbody.generated'
import { ApiResponse, SearchResultItem } from '../../types/data.types'
import { LPE } from '../../types/lpe.types'
import {
  createPromise,
  CreatePromiseResult,
  settle,
} from '../../utils/promise.utils'
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
const podcastEpisodeDocument = unbodyDataTypes.get({
  classes: ['podcast', 'document', 'episode'],
  objectType: 'GoogleDoc',
})!

const sortPosts = (a: LPE.Post.Document, b: LPE.Post.Document) =>
  (a.type === 'podcast' ? new Date(a.publishedAt) : new Date(a.modifiedAt!)) >
  (b.type === 'podcast' ? new Date(b.publishedAt) : new Date(b.modifiedAt!))
    ? -1
    : 1

export class UnbodyService {
  client: ApolloClient<any> = null as any
  helpers = UnbodyHelpers

  initialDataPromise: CreatePromiseResult<(typeof this)['initialData']> =
    createPromise()

  initialData: {
    posts: LPE.Post.Document[]
  } = { posts: [] }

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

    this.loadInitialData(true)
  }

  private _loadInitialData = async () => {
    const articles: LPE.Article.Data[] = await this.fetchAllArticles()
    const episodes: LPE.Podcast.Document[] = await this.fetchAllEpisodes()

    const posts: LPE.Post.Document[] = [...articles, ...episodes].sort(
      sortPosts,
    )

    this.initialData = {
      posts,
    }

    this.initialDataPromise.resolve({ posts })
  }

  loadInitialData = async (forced: boolean = false) => {
    if (forced) {
      this._loadInitialData()
    }

    return this.initialDataPromise.promise
  }

  private fetchAllEpisodes = async () => {
    const result: LPE.Podcast.Document[] = []

    let page = 0
    const limit = 50
    while (true) {
      page++

      const { data } = await this.getPodcastEpisodes({
        page,
        limit,
        highlighted: 'exclude',
        includeDrafts: false,
        parseContent: false,
        textBlocks: false,
        populateShow: true,
        toc: false,
      })

      result.push(
        ...data.map((episode) => ({
          ...episode,
        })),
      )

      if (data.length === 0) break
    }

    return result
  }

  private fetchAllArticles = async () => {
    const result: LPE.Article.Data[] = []

    let page = 0
    const limit = 50
    while (true) {
      page++

      const { data } = await this.getArticles({
        page,
        limit,
        highlighted: 'exclude',
        includeDrafts: false,
        parseContent: false,
        textBlocks: false,
      })

      result.push(
        ...data.map((article) => ({
          ...article,
          content: [],
        })),
      )

      if (data.length === 0) break
    }

    return result
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

  handleRequest = async <T = any>(
    handler: () => T | Promise<T>,
    defaultValue?: T,
  ): Promise<ApiResponse<T>> => {
    const [res, err] = await settle<T>(handler)
    if (err) return this.handleResponse(defaultValue || null, err)
    return this.handleResponse(res)
  }

  public countDocuments = async (
    filter: CountDocumentsQueryVariables['filter'] = {},
  ) =>
    this.handleRequest<number>(async () => {
      const {
        data: {
          Aggregate: { GoogleDoc },
        },
      } = await this.client.query({
        query: CountDocumentsDocument,
        variables: {
          filter,
        },
      })

      return GoogleDoc?.[0]?.meta?.count || 0
    }, 0)

  getArticles = ({
    page = 1,
    limit = 10,
    slug,
    toc = false,
    filter,
    nearObject,
    textBlocks = false,
    includeDrafts = false,
    highlighted = 'include',
  }: {
    slug?: string
    page?: number
    limit?: number
    toc?: boolean
    filter?: GetPostsQueryVariables['filter']
    nearObject?: string
    textBlocks?: boolean
    parseContent?: boolean
    includeDrafts?: boolean
    highlighted?: 'only' | 'include' | 'exclude'
  }) =>
    this.handleRequest<LPE.Article.Data[]>(async () => {
      const {
        data: {
          Get: { GoogleDoc: docs },
        },
      } = await this.client.query({
        query: GetPostsDocument,
        variables: {
          toc,
          textBlocks,
          mentions: true,
          imageBlocks: true,
          ...(nearObject
            ? {
                nearObject: {
                  id: nearObject,
                },
              }
            : {}),
          ...this.helpers.args.page(page, limit),
          filter: {
            operator: 'And',
            operands: [
              this.helpers.args.wherePath([
                'Articles',
                highlighted !== 'only' && '|published',
                highlighted !== 'only' && includeDrafts && '|drafts',
                (highlighted === 'include' || highlighted === 'only') &&
                  '|highlighted',
              ]),
              ...(slug
                ? [
                    {
                      path: ['slug'],
                      operator: 'Equal',
                      valueString: slug,
                    } as GetObjectsGoogleDocWhereInpObj,
                  ]
                : []),
              ...(nearObject
                ? [
                    {
                      path: ['id'],
                      operator: 'NotEqual',
                      valueString: nearObject,
                    } as GetObjectsGoogleDocWhereInpObj,
                  ]
                : []),
              ...(filter ? [filter] : []),
            ],
          },
        },
      })

      return unbodyDataTypes.transformMany<LPE.Article.Data>(
        articleDocument,
        docs,
        undefined,
      )
    }, [])

  getArticle = ({
    slug,
    includeDrafts = false,
  }: {
    slug?: string
    parseContent?: boolean
    includeDrafts?: boolean
  }) =>
    this.handleRequest<LPE.Article.Data | null>(
      async () =>
        this.getArticles({
          limit: 1,
          page: 1,
          slug,
          toc: true,
          includeDrafts,
          textBlocks: true,
          parseContent: true,
          highlighted: 'include',
        }).then((res) => res.data[0]),
      null,
    )

  getHighlightedArticles = ({
    page = 1,
    limit = 10,
  }: {
    page?: number
    limit?: number
  }) =>
    this.getArticles({
      limit,
      page,
      toc: true,
      highlighted: 'only',
      textBlocks: true,
      parseContent: true,
    })

  getRelatedArticles = ({
    id,
    page = 1,
    limit = 10,
  }: {
    id: string
    page?: number
    limit?: number
  }) =>
    this.getArticles({
      limit,
      page,
      toc: true,
      nearObject: id,
      textBlocks: true,
      parseContent: true,
      highlighted: 'include',
    })

  getPodcastShows = async ({
    showSlug,
    episodesLimit = 12,
    populateEpisodes = false,
  }: {
    showSlug?: string
    episodesLimit?: number
    populateEpisodes?: boolean
  }) =>
    this.handleRequest<LPE.Podcast.Show[]>(async () => {
      const {
        data: {
          Get: { GoogleDoc: docs },
        },
      } = await this.client.query({
        query: GetPostsDocument,
        variables: {
          filter: this.helpers.args.wherePath([
            'Podcasts',
            'index',
            showSlug && showSlug,
          ]),
          ...this.helpers.args.page(1, 50),
          imageBlocks: true,
          textBlocks: false,
          mentions: true,
        },
      })

      const shows = await Promise.all(
        docs.map(async (doc) =>
          unbodyDataTypes.transform<LPE.Podcast.Show>(podcastShowDocument, doc),
        ),
      )

      const result = await Promise.all(
        shows.map(async (show) => ({
          ...show,
          episodes: populateEpisodes
            ? await this.getPodcastEpisodes({
                showSlug: show.slug,
                page: 1,
                limit: episodesLimit,
                highlighted: 'include',
              }).then((res) => res.data)
            : [],
          numberOfEpisodes: await this.countDocuments(
            this.helpers.args.wherePath(['Podcasts', show.slug, 'published']),
          ).then((res) => res.data),
        })),
      )

      return result
    }, [])

  getPodcastShow = async ({
    showSlug,
    episodesLimit = 10,
    populateEpisodes = false,
  }: {
    showSlug: string
    episodesLimit?: number
    populateEpisodes?: boolean
  }) =>
    this.handleRequest<LPE.Podcast.Show | null>(
      async () =>
        this.getPodcastShows({
          showSlug,
          episodesLimit,
          populateEpisodes,
        }).then((res) => res.data[0]),
      null,
    )

  getPodcastEpisodes = ({
    page = 1,
    limit = 10,
    slug,
    showSlug = '',
    toc = false,
    filter,
    nearObject,
    textBlocks = false,
    parseContent = false,
    populateShow = false,
    includeDrafts = false,
    highlighted = 'include',
  }: {
    slug?: string
    showSlug?: string
    page?: number
    limit?: number
    toc?: boolean
    filter?: GetPostsQueryVariables['filter']
    nearObject?: string
    textBlocks?: boolean
    parseContent?: boolean
    populateShow?: boolean
    includeDrafts?: boolean
    highlighted?: 'only' | 'include' | 'exclude'
  }) =>
    this.handleRequest<LPE.Podcast.Document[]>(async () => {
      const {
        data: {
          Get: { GoogleDoc: docs },
        },
      } = await this.client.query({
        query: GetPostsDocument,
        variables: {
          toc,
          textBlocks,
          mentions: true,
          imageBlocks: true,
          ...(nearObject
            ? {
                nearObject: {
                  id: nearObject,
                },
              }
            : {}),
          ...this.helpers.args.page(page, limit),
          filter: {
            operator: 'And',
            operands: [
              this.helpers.args.wherePath([
                'Podcasts',
                showSlug,
                highlighted !== 'only' && '|published',
                highlighted !== 'only' && includeDrafts && '|drafts',
                (highlighted === 'include' || highlighted === 'only') &&
                  '|highlighted',
              ]),
              ...(slug
                ? [
                    {
                      operator: 'Like',
                      path: ['slug'],
                      valueString: `ep*-${slug}`,
                    } as GetObjectsGoogleDocWhereInpObj,
                  ]
                : []),
              ...(filter ? [filter] : []),
            ],
          },
          sort: {
            order: 'desc',
            path: ['slug'],
          },
        },
      })

      let shows: LPE.Podcast.Show[] = []

      if (populateShow) {
        const { data } = (await this.getPodcastShows({
          populateEpisodes: false,
        })) as ApiResponse<LPE.Podcast.Show[]>

        shows = [...data]
      }

      return unbodyDataTypes
        .transformMany<LPE.Podcast.Document>(
          podcastEpisodeDocument,
          docs,
          undefined,
          { shows, parseContent },
        )
        .then((res) => res.filter((obj) => obj && obj.type === 'podcast'))
    }, [])

  getPodcastEpisode = ({
    slug,
    showSlug = '',
    toc = false,
    includeDraft = false,
    textBlocks = false,
  }: {
    slug: string
    showSlug?: string
    toc?: boolean
    textBlocks?: boolean
    includeDraft?: boolean
  }) =>
    this.handleRequest<LPE.Podcast.Document | null>(async () => {
      const { data } = await this.getPodcastEpisodes({
        slug,
        showSlug,
        page: 1,
        limit: 1,
        toc,
        textBlocks,
        parseContent: true,
        populateShow: true,
        highlighted: 'include',
        includeDrafts: includeDraft,
      })

      return data[0] || null
    }, null)

  getHighlightedEpisodes = ({
    page = 1,
    limit = 10,
    showSlug = '',
    textBlocks = false,
  }: {
    page?: number
    limit?: number
    showSlug?: string
    textBlocks?: boolean
  }) =>
    this.handleRequest<LPE.Podcast.Document[]>(async () => {
      const { data } = await this.getPodcastEpisodes({
        page,
        limit,
        showSlug,
        textBlocks,
        parseContent: true,
        populateShow: true,
        includeDrafts: false,
        highlighted: 'only',
      })

      return data
    }, [])

  getRelatedEpisodes = ({
    id,
    page = 1,
    limit = 10,
    showSlug = '',
    toc = false,
    includeDraft = false,
    textBlocks = false,
  }: {
    id: string
    toc?: boolean
    page?: number
    limit?: number
    showSlug?: string
    textBlocks?: boolean
    includeHighlighted?: boolean
    includeDraft?: boolean
  }) =>
    this.handleRequest<LPE.Podcast.Document[]>(async () => {
      const { data } = await this.getPodcastEpisodes({
        page,
        limit,
        toc,
        showSlug,
        textBlocks,
        nearObject: id,
        parseContent: true,
        populateShow: true,
        highlighted: 'include',
        includeDrafts: includeDraft,
      })

      return data
    }, [])

  getLatestEpisodes = async ({
    showSlug,
    page = 1,
    limit = 10,
  }: {
    showSlug?: string
    page?: number
    limit?: number
  }) =>
    this.getPodcastEpisodes({
      page,
      limit,
      showSlug,
      highlighted: 'include',
      populateShow: false,
    })

  getRecentPosts = async ({
    page = 1,
    limit = 10,
  }: {
    page?: number
    limit?: number
  }) =>
    this.handleRequest(async () => {
      const { posts } = await this.loadInitialData()

      const startIndex = (page - 1) * limit
      return posts.slice(startIndex, startIndex + limit)
    }, [])

  getHighlightedPosts = async () =>
    this.handleRequest<LPE.Post.Document[]>(async () => {
      const { data: articles } = await this.getHighlightedArticles({})
      const { data: episodes } = await this.getHighlightedEpisodes({})

      return [...articles, ...episodes].sort(sortPosts)
    }, [])

  getHomepagePosts = async () =>
    this.handleRequest<{
      posts: LPE.Article.Data[]
      highlighted: LPE.Article.Data | null
    }>(
      async () => {
        const { data } = await this.client.query({
          query: GetHomepagePostsDocument,
          variables: {
            ...this.helpers.args.page(1, 10),
            filter: this.helpers.args.wherePublished(true),
          },
        })

        if (!data) throw 'No data'

        const docs = data.Get?.GoogleDoc || []

        return {
          highlighted: null,
          posts: await unbodyDataTypes.transformMany<LPE.Article.Data>(
            articleDocument,
            docs,
          ),
        }
      },
      { highlighted: null, posts: [] },
    )

  getAllArticlePostSlugs = async () =>
    this.handleRequest<{ slug: string }[]>(async () => {
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

      return result
    }, [])

  getArticlePost = async (slug: string, published: boolean = true) =>
    this.handleRequest<LPE.Article.Data | null>(async () => {
      {
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

        if (!doc) throw 'No data'

        return await unbodyDataTypes.transform<LPE.Article.Data>(
          articleDocument,
          doc,
        )
      }
    }, null)

  getArticlesFromSameAuthors = async (
    slug: string,
    authors: string[],
    published: boolean = true,
  ) =>
    this.handleRequest<LPE.Article.Metadata[]>(async () => {
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

      if (docs.length === 0) throw 'No data for same authors'

      return await unbodyDataTypes.transformMany<LPE.Article.Metadata>(
        articleDocument,
        docs,
      )
    }, [])

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
  } = {}) =>
    this.handleRequest(async () => {
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

      return result
    }, [])

  searchArticles = async (
    q: string = '',
    tags: string[] = [],
    published: boolean = true,
  ) =>
    this.handleRequest(async () => {
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

      if (!data) throw 'No data'

      const result = await unbodyDataTypes.transformMany<LPE.Article.Data>(
        articleSearchResultItem,
        data.Get.GoogleDoc || [],
      )

      return result
    }, [])

  getTopics = async (published: boolean = true) =>
    this.handleRequest(async () => {
      const { data } = await this.client.query({
        query: GetAllTopicsDocument,
        variables: {
          filter: this.helpers.args.wherePath(['published|highlighted']),
        },
      })

      const topics = data.Aggregate.GoogleDoc.map((doc) => doc.groupedBy.value)

      return topics
    }, [])
}

const unbodyApi = new UnbodyService(
  process.env.UNBODY_API_KEY || '',
  process.env.UNBODY_LPE_PROJECT_ID || '',
)
export default unbodyApi
