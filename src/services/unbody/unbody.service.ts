import { ApolloClient, InMemoryCache } from '@apollo/client'
import { minutesToMilliseconds } from 'date-fns'
import {
  CountDocumentsDocument,
  CountDocumentsQueryVariables,
  GetAllTopicsDocument,
  GetObjectsGoogleDocWhereInpObj,
  GetObjectsTextBlockHybridInpObj,
  GetObjectsTextBlockWhereInpObj,
  GetPostsDocument,
  GetPostsQueryVariables,
  SearchArticlesDocument,
  SearchBlocksDocument,
  Txt2VecOpenAiGetObjectsTextBlockNearTextInpObj,
} from '../../lib/unbody/unbody.generated'
import { getWebhookData } from '../../pages/api/webhook'
import { ApiResponse, SearchResultItem } from '../../types/data.types'
import { LPE } from '../../types/lpe.types'
import {
  CreatePromiseResult,
  createPromise,
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
const staticPageDocument = unbodyDataTypes.get({
  classes: ['static-page', 'document'],
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

  lastUpdate: number = 0
  initialDataLastUpdate: number = 0
  initialDataPromise: CreatePromiseResult<(typeof this)['initialData']> =
    createPromise()

  initialData: {
    posts: LPE.Post.Document[]
    staticPages: LPE.StaticPage.Document[]
  } = { posts: [], staticPages: [] }

  constructor(private apiKey: string, private projectId: string) {
    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            Get: {
              merge(existing = {}, incoming) {
                return {
                  ...existing,
                  ...incoming,
                }
              },
            },
          },
        },
      },
    })

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

    if (process.env.NODE_ENV !== 'development') this.checkForUpdates()
  }

  private checkForUpdates = async () => {
    const data = await getWebhookData()
    if (!data) return

    if (data.lastUpdate > this.lastUpdate) {
      this.lastUpdate = data.lastUpdate
      await this.clearCache()
      this.loadInitialData(true)
    }

    setTimeout(this.checkForUpdates, 1000)
  }

  private _loadInitialData = async () => {
    this.initialDataLastUpdate = +new Date()

    const articles: LPE.Article.Data[] = await this.fetchAllArticles()
    const episodes: LPE.Podcast.Document[] = await this.fetchAllEpisodes()
    const staticPages = await this.fetchAllStaticPages()

    const posts: LPE.Post.Document[] = [...articles, ...episodes].sort(
      sortPosts,
    )

    this.initialData = {
      posts,
      staticPages,
    }

    this.initialDataPromise.resolve({ posts, staticPages })
  }

  loadInitialData = async (forced: boolean = false) => {
    if (
      forced ||
      +new Date() - this.initialDataLastUpdate > minutesToMilliseconds(10)
    ) {
      console.log('load initial data')
      this.initialDataPromise &&
        this.initialDataPromise.resolve(this.initialData)

      this.initialDataPromise = createPromise()
      await this.clearCache()
      this._loadInitialData()
    }

    return this.initialDataPromise.promise
  }

  clearCache = async () => {
    this.client.cache.reset()
  }

  private fetchAllStaticPages = async () => {
    const result: LPE.StaticPage.Document[] = []

    let skip = 0
    const limit = 50
    while (true) {
      const { data } = await this.findStaticPages({
        skip,
        limit,
        parseContent: false,
        textBlocks: false,
        includeDrafts: false,
        toc: false,
      })

      result.push(...data)

      if (data.length === 0) break

      skip += 50
    }

    return result
  }

  private fetchAllEpisodes = async () => {
    const result: LPE.Podcast.Document[] = []

    let skip = 0
    const limit = 50
    while (true) {
      const { data } = await this.getPodcastEpisodes({
        skip,
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

      skip += 50
    }

    return result
  }

  private fetchAllArticles = async () => {
    const result: LPE.Article.Data[] = []

    let skip = 0
    const limit = 50
    while (true) {
      const { data } = await this.getArticles({
        skip,
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
      skip += limit
    }

    return result
  }

  handleResponse = <T>(
    data: T | null = null,
    errors: any = null,
  ): ApiResponse<T> => {
    if (errors) console.log(errors)
    if (errors || !data) {
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

  getStaticPages = () =>
    this.handleRequest<LPE.StaticPage.Document[]>(async () => {
      await this.loadInitialData()
      const { staticPages } = this.initialData

      return staticPages
    }, [])

  findStaticPages = ({
    skip = 0,
    limit = 10,
    slug,
    toc = false,
    filter,
    nearObject,
    textBlocks = false,
    includeDrafts = false,
  }: {
    slug?: string
    skip?: number
    limit?: number
    toc?: boolean
    filter?: GetPostsQueryVariables['filter']
    nearObject?: string
    textBlocks?: boolean
    parseContent?: boolean
    includeDrafts?: boolean
  }) =>
    this.handleRequest<LPE.StaticPage.Document[]>(async () => {
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
          ...this.helpers.args.page(skip, limit),
          filter: {
            operator: 'And',
            operands: [
              this.helpers.args.wherePath([
                'Static pages',
                includeDrafts ? 'published|draft' : 'published',
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

      return unbodyDataTypes.transformMany<LPE.StaticPage.Document>(
        staticPageDocument,
        docs,
        undefined,
      )
    }, [])

  getStaticPage = ({
    slug,
    includeDrafts = false,
  }: {
    slug: string
    includeDrafts?: boolean
  }) =>
    this.handleRequest<LPE.StaticPage.Document | null>(async () => {
      const { data } = await this.findStaticPages({
        limit: 1,
        slug,
        includeDrafts,
        textBlocks: true,
        parseContent: true,
      })

      if (data.length === 0) throw 'Static page not found!'

      return data[0]
    }, null)

  findPostDocs = ({
    skip = 0,
    limit = 10,
    slug,
    toc = false,
    filter,
    hybrid,
    nearObject,
    textBlocks = false,
    nearText,
    sort,
  }: {
    slug?: string
    skip?: number
    limit?: number
    toc?: boolean
    filter?: GetObjectsGoogleDocWhereInpObj | GetObjectsGoogleDocWhereInpObj[]
    hybrid?: GetPostsQueryVariables['hybrid']
    nearObject?: string
    textBlocks?: boolean
    nearText?: GetPostsQueryVariables['nearText']
    sort?: GetPostsQueryVariables['sort']
  }) =>
    this.handleRequest(async () => {
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
          sort,
          searchResult: !!hybrid || !!nearText || !!nearObject,
          ...(hybrid ? { hybrid } : {}),
          nearText,
          ...(nearObject
            ? {
                nearObject: {
                  id: nearObject,
                },
              }
            : {}),
          ...this.helpers.args.page(skip, limit),
          filter: {
            operator: 'And',
            operands: [
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
              ...(filter ? (Array.isArray(filter) ? filter : [filter]) : []),
            ],
          },
        },
      })

      return docs
    }, [])

  getArticles = ({
    skip = 0,
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
    skip?: number
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
          ...this.helpers.args.page(skip, limit),
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
    skip = 0,
    limit = 10,
  }: {
    skip?: number
    limit?: number
  }) =>
    this.getArticles({
      limit,
      skip,
      toc: true,
      highlighted: 'only',
      textBlocks: true,
      parseContent: true,
    })

  getRelatedArticles = ({
    id,
    skip = 0,
    limit = 10,
  }: {
    id: string
    skip?: number
    limit?: number
  }) =>
    this.getArticles({
      limit,
      skip,
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
          ...this.helpers.args.page(0, 50),
          imageBlocks: true,
          textBlocks: true,
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
    limit = 10,
    skip = 0,
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
    skip?: number
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
          ...this.helpers.args.page(skip, limit),
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
        skip: 0,
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
    skip = 0,
    limit = 10,
    showSlug = '',
    textBlocks = false,
  }: {
    skip?: number
    limit?: number
    showSlug?: string
    textBlocks?: boolean
  }) =>
    this.handleRequest<LPE.Podcast.Document[]>(async () => {
      const { data } = await this.getPodcastEpisodes({
        skip,
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
    skip = 0,
    limit = 10,
    showSlug = '',
    toc = false,
    includeDraft = false,
    textBlocks = false,
  }: {
    id: string
    toc?: boolean
    skip?: number
    limit?: number
    showSlug?: string
    textBlocks?: boolean
    includeHighlighted?: boolean
    includeDraft?: boolean
  }) =>
    this.handleRequest<LPE.Podcast.Document[]>(async () => {
      const { data } = await this.getPodcastEpisodes({
        skip,
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
    skip = 0,
    limit = 10,
  }: {
    showSlug?: string
    skip?: number
    limit?: number
  }) =>
    this.getPodcastEpisodes({
      skip,
      limit,
      showSlug,
      highlighted: 'include',
      populateShow: false,
    })

  getRecentPosts = async ({
    limit = 10,
    skip = 0,
  }: {
    limit?: number
    skip?: number
  }) =>
    this.handleRequest(async () => {
      await this.loadInitialData()
      const { posts } = this.initialData

      return posts.slice(skip, skip + limit)
    }, [])

  getHighlightedPosts = async () =>
    this.handleRequest<LPE.Post.Document[]>(async () => {
      const { data: articles } = await this.getHighlightedArticles({})
      const { data: episodes } = await this.getHighlightedEpisodes({})

      return [...articles, ...episodes].sort(sortPosts)
    }, [])

  getArticlesFromSameAuthors = async ({
    slug,
    skip = 0,
    limit = 10,
    authors = [],
    includeDrafts,
  }: {
    slug?: string
    skip?: number
    limit?: number
    authors?: string[]
    includeDrafts?: boolean
  }) =>
    this.handleRequest<LPE.Article.Metadata[]>(async () => {
      const { data: docs } = await this.getArticles({
        includeDrafts,
        parseContent: false,
        highlighted: 'include',
        ...this.helpers.args.page(skip, limit),
        filter: {
          operator: 'And',
          operands: [
            {
              operator: 'Like',
              path: ['mentions'],
              valueText: authors.join(' '),
            },
            ...(slug
              ? [
                  {
                    operator: 'NotEqual',
                    valueString: slug,
                    path: ['slug'],
                  } as GetObjectsGoogleDocWhereInpObj,
                ]
              : []),
          ],
        },
      })

      if (docs.length === 0) throw 'No data for same authors'

      return docs
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
          ...this.helpers.args.page(0, 20),
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

      const { data: shows } = await this.getPodcastShows({
        populateEpisodes: false,
      })

      const blocks = await unbodyDataTypes.transformMany<
        SearchResultItem<LPE.Article.ContentBlock>
      >(
        articleSearchResultItem,
        [...(ImageBlock || []), ...(TextBlock || [])],
        undefined,
        { shows, query: q, tags },
      )

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

      const { data: shows } = await this.getPodcastShows({
        populateEpisodes: false,
      })

      const result = await unbodyDataTypes.transformMany<LPE.Article.Data>(
        articleSearchResultItem,
        data.Get.GoogleDoc || [],
        undefined,
        {
          shows,
          query: q,
          tags,
        },
      )

      return result
    }, [])

  searchPosts = ({
    skip = 0,
    limit = 10,
    query,
    tags = [],
    type = [LPE.PostTypes.Article, LPE.PostTypes.Podcast],
  }: {
    skip?: number
    limit?: number
    query?: string
    tags?: string[]
    type?: LPE.PostType[]
  }) =>
    this.handleRequest<LPE.Search.ResultItem[]>(async () => {
      const filter: GetObjectsGoogleDocWhereInpObj[] = [
        {
          operator: 'Or',
          operands: [
            ...(type.includes(LPE.PostTypes.Article)
              ? [
                  this.helpers.args.wherePath([
                    'Articles',
                    'published|highlighted',
                  ]),
                ]
              : []),
            ...(type.includes(LPE.PostTypes.Podcast)
              ? [
                  this.helpers.args.wherePath([
                    'Podcasts',
                    'published|highlighted',
                  ]),
                ]
              : []),
          ],
        },
      ]

      if (tags && tags.length > 0) {
        filter.push({
          operator: 'Or',
          operands: [
            ...tags.map(
              (tag) =>
                ({
                  operator: 'Equal',
                  path: ['tags'],
                  valueString: tag,
                } as GetObjectsGoogleDocWhereInpObj),
            ),
          ],
        })
      }

      const { data } = await this.findPostDocs({
        skip,
        limit,
        filter,
        hybrid: {
          query: query || '',
          alpha: 0.75,
        },
      })

      const { data: shows } = await this.getPodcastShows({
        populateEpisodes: false,
      })

      return unbodyDataTypes.transformMany<LPE.Search.ResultItem>(
        articleSearchResultItem,
        data,
        undefined,
        {
          query,
          tags,
          shows,
        },
      )
    }, [])

  searchPostBlocks = async ({
    skip = 0,
    limit = 10,
    postId,
    query = '',
    tags = [],
    postType = [],
    type,
  }: {
    skip?: number
    limit?: number
    query?: string
    tags?: string[]
    postId?: string
    postType?: LPE.PostType[]
    type?: LPE.Post.ContentBlockType[]
  } = {}) =>
    this.handleRequest(async () => {
      const _type =
        type && type.length > 0
          ? type
          : [LPE.Post.ContentBlockTypes.Text, LPE.Post.ContentBlockTypes.Image]

      const _postType =
        postType && postType.length > 0
          ? postType
          : [LPE.PostTypes.Article, LPE.PostTypes.Podcast]

      const hybrid =
        (query.trim().length > 0 || tags.length > 0) &&
        ({
          query: query,
          alpha: 0.75,
        } as GetObjectsTextBlockHybridInpObj)

      const filter = {
        operator: 'And',
        operands: [],
      } as GetObjectsTextBlockWhereInpObj

      if (!postId)
        filter.operands!.push({
          operator: 'Or',
          operands: _postType.map((type) =>
            this.helpers.args.wherePath(
              [
                type === 'podcast' ? 'Podcasts' : 'Articles',
                !postId && 'published|highlighted',
              ],
              ['document', 'GoogleDoc', 'path'],
            ),
          ),
        })

      if (postId)
        filter.operands!.push({
          operator: 'Equal',
          path: ['document', 'GoogleDoc', 'id'],
          valueString: postId,
        })

      if (tags && tags.length > 0) {
        filter.operands!.push({
          operator: 'Or',
          operands: [
            ...tags.map(
              (tag) =>
                ({
                  operator: 'Equal',
                  path: ['document', 'GoogleDoc', 'tags'],
                  valueString: tag,
                } as GetObjectsGoogleDocWhereInpObj),
            ),
          ],
        })
      }

      const {
        data: {
          Get: { ImageBlock, TextBlock },
        },
      } = await this.client.query({
        query: SearchBlocksDocument,
        variables: {
          ...this.helpers.args.page(skip, limit),
          imageFilter: filter,
          textFilter: filter,
          text: _type.includes('text'),
          image: _type.includes('image'),
          ...(hybrid ? { textHybrid: hybrid, imageHybrid: hybrid } : {}),
        },
      })

      const { data: shows } = await this.getPodcastShows({
        populateEpisodes: false,
      })

      const blocks = await unbodyDataTypes.transformMany<LPE.Search.ResultItem>(
        articleSearchResultItem,
        [...(ImageBlock || []), ...(TextBlock || [])],
        undefined,
        { shows, query, tags },
      )

      return [...blocks].sort((a, b) => (a.score > b.score ? -1 : 1))
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
  process.env.UNBODY_PROJECT_ID || '',
)
export default unbodyApi
