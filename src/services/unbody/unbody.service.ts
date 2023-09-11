import { ApolloClient, InMemoryCache } from '@apollo/client'
import formatRFC7231 from 'date-fns/formatRFC7231'
import { WebhookClient } from 'discord.js'
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants'
import {
  CountDocumentsDocument,
  CountDocumentsQueryVariables,
  GetAllTopicsDocument,
  GetObjectsGoogleDocWhereInpObj,
  GetObjectsTextBlockHybridInpObj,
  GetObjectsTextBlockWhereInpObj,
  GetPostsDocument,
  GetPostsQueryVariables,
  SearchBlocksDocument,
  Txt2VecOpenAiGetObjectsTextBlockNearTextInpObj,
} from '../../lib/unbody/unbody.generated'
import { getWebhookData } from '../../pages/api/webhook'
import {
  ApiPaginatedPayload,
  ApiResponse,
  SearchResultItem,
} from '../../types/data.types'
import { LPE } from '../../types/lpe.types'
import {
  CreatePromiseResult,
  createPromise,
  settle,
} from '../../utils/promise.utils'
import { getPostUrl, getWebsiteUrl } from '../../utils/route.utils'
import { unbodyDataTypes } from './dataTypes'
import { UnbodyHelpers } from './unbody.helpers'

const isBuildTime = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
const isVercel = process.env.VERCEL === '1'

const discordWebhookURL =
  process.env.DISCORD_LOGS_WEBHOOK_URL ||
  'https://discord.com/api/webhooks/1149295380345925682/q70d7nmOZIOYl53ZIdPdtV00RcMarYBwHeqQ0x8XKq5SV0BRaNW1TUK7wClmRfSX6ZkT' // temporary for testing,
const sendDiscordNotifications =
  process.env.NODE_ENV === 'production' && !!discordWebhookURL

const discordWebhook = new WebhookClient({
  url: discordWebhookURL,
})

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

const getRecordDate = (record: PageRecord) =>
  record.type === 'podcast'
    ? new Date(record.publishedAt)
    : new Date(record.modifiedAt!)

const sortPosts = (a: LPE.Post.Document, b: LPE.Post.Document) =>
  getRecordDate(a) > getRecordDate(b) ? -1 : 1

type PageRecord = LPE.Post.Document | LPE.StaticPage.Document
type PageRecordChangeAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'publish'
  | 'unpublish'
type PageRecordChange = { action: PageRecordChangeAction; record: PageRecord }
type Data = {
  posts: LPE.Post.Document[]
  articles: LPE.Article.Data[]
  draftArticles: LPE.Article.Data[]
  highlightedArticles: LPE.Article.Data[]
  episodes: LPE.Podcast.Document[]
  draftEpisodes: LPE.Podcast.Document[]
  highlightedEpisodes: LPE.Podcast.Document[]
  staticPages: LPE.StaticPage.Document[]
  draftStaticPages: LPE.StaticPage.Document[]
  allRecords: PageRecord[]
}

export class UnbodyService {
  client: ApolloClient<any> = null as any
  helpers = UnbodyHelpers

  lastUpdate: number = 0
  firstLoad: boolean = true
  loadingData: boolean = false

  data: Data = {
    articles: [],
    episodes: [],
    posts: [],
    staticPages: [],
    allRecords: [],
    draftArticles: [],
    draftEpisodes: [],
    draftStaticPages: [],
    highlightedArticles: [],
    highlightedEpisodes: [],
  }
  fetchDataPromise: CreatePromiseResult<any> = null as any

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

    this.fetchData(true)

    if (!isVercel && process.env.NODE_ENV !== 'development')
      this.checkForUpdates()
  }

  private checkForUpdates = async () => {
    const data = await getWebhookData()

    if (!this.loadingData && data && data.lastUpdate > this.lastUpdate) {
      this.lastUpdate = data.lastUpdate
      this.fetchData(true)
    }

    setTimeout(this.checkForUpdates, 1000)
  }

  private _fetchData = async (callback: (data: any) => void) => {
    try {
      this.loadingData = true
      const articles: LPE.Article.Data[] = await this.fetchAllArticles()
      const episodes: LPE.Podcast.Document[] = await this.fetchAllEpisodes()
      const staticPages = await this.fetchAllStaticPages()

      const newData: Data = {
        articles: [],
        episodes: [],
        posts: [],
        staticPages: [],
        allRecords: [],
        draftArticles: [],
        draftEpisodes: [],
        draftStaticPages: [],
        highlightedArticles: [],
        highlightedEpisodes: [],
      }

      for (const article of articles) {
        if (article.isDraft) newData.draftArticles.push(article)
        else if (article.highlighted) newData.highlightedArticles.push(article)
        else newData.articles.push(article)
      }

      for (const episode of episodes) {
        if (episode.isDraft) newData.draftEpisodes.push(episode)
        else if (episode.highlighted) newData.highlightedEpisodes.push(episode)
        else newData.episodes.push(episode)
      }

      for (const staticPage of staticPages) {
        if (staticPage.isDraft) newData.draftStaticPages.push(staticPage)
        else newData.draftStaticPages.push(staticPage)
      }

      newData.posts = [...newData.articles, ...newData.episodes]
      newData.allRecords = [...articles, ...episodes, ...staticPages]

      if (!this.firstLoad && !isBuildTime && !isVercel) {
        const changes = this.findChanges(this.data, newData)
        if (sendDiscordNotifications)
          settle(() => this.sendUpdatesToDiscord(changes))
      }

      this.data = newData
      if (this.firstLoad) this.firstLoad = false
      callback(this.data)
    } catch (error) {
      console.error(error)
    } finally {
      this.loadingData = false
    }
  }

  findChanges = (current: Data, newData: Data): PageRecordChange[] => {
    const changes: PageRecordChange[] = []

    const [oldRecords, newRecords]: Array<Record<string, PageRecord>> = [
      current,
      newData,
    ].map(
      (i) =>
        Object.fromEntries(i.allRecords.map((r) => [r.id, r])) as Record<
          string,
          PageRecord
        >,
    )

    const oldIds = Object.keys(oldRecords)
    const newIds = Object.keys(newRecords)

    for (const id of oldIds) {
      if (!newRecords[id]) {
        changes.push({
          action: 'delete',
          record: oldRecords[id],
        })
      }
    }

    for (const id of newIds) {
      const record = newRecords[id]
      const oldRecord = oldRecords[id]
      if (!oldRecord) {
        changes.push({
          action: 'create',
          record,
        })
      } else {
        const newDate = getRecordDate(record)
        const oldDate = getRecordDate(oldRecord)
        const isUpdated = +newDate > +oldDate || record.slug !== oldRecord.slug
        if (!isUpdated) continue

        changes.push({
          record,
          action:
            oldRecord.isDraft && !record.isDraft
              ? 'publish'
              : !oldRecord.isDraft && record.isDraft
              ? 'unpublish'
              : 'update',
        })
      }
    }

    return changes
  }

  sendUpdatesToDiscord = async (changes: PageRecordChange[]) => {
    const logs: string[] = []

    const generateLog = async (
      record: PageRecord,
      action: (typeof changes)[number]['action'],
    ) => {
      const pageType =
        record.type === 'podcast'
          ? 'Episode'
          : record.type === 'article'
          ? 'Article'
          : 'static page'
      const actionMessage = {
        delete: 'removed',
        update: 'updated',
        create: 'created',
        publish: 'published',
        unpublish: 'was moved to drafts',
      }[action]

      if (action === 'delete')
        return `${
          record.isDraft ? 'Draft page' : 'Page'
        } ${actionMessage}\n${pageType} "${record.title}"`

      const pageUrl = record.isDraft
        ? new URL(
            `/preview?id=${
              (await this.findDocRemoteId({ id: record.id })).data
            }`,
            getWebsiteUrl(),
          ).toString()
        : getPostUrl(record.type, {
            postSlug: record.slug,
            showSlug: (record.type === 'podcast' && record?.show?.slug) || null,
            ...(record.isDraft ? { recordId: record.id, preview: true } : {}),
          })

      return `${
        action !== 'unpublish' && record.isDraft ? 'Draft page' : 'Page'
      } ${actionMessage}\n${pageType} "${record.title}" (${formatRFC7231(
        getRecordDate(record),
      )}).\n ${pageUrl}`
    }

    for (const change of changes) {
      logs.push(await generateLog(change.record, change.action))
    }

    for (const log of logs) {
      await discordWebhook.send({ content: log })
    }
  }

  fetchData = async (forced: boolean = false) => {
    if (forced) {
      this.fetchDataPromise && this.fetchDataPromise.resolve(this.data)

      this.fetchDataPromise = createPromise()

      await this.clearCache()
      this._fetchData(this.fetchDataPromise.callback)
    }

    return this.fetchDataPromise.promise
  }

  clearCache = async () => {
    this.client.cache.reset()
  }

  private fetchAllStaticPages = async () => {
    const result: LPE.StaticPage.Document[] = []

    let skip = 0
    const limit = 50
    while (true) {
      const { data, errors } = await this.findStaticPages({
        skip,
        limit,
        parseContent: false,
        textBlocks: false,
        includeDrafts: true,
        toc: false,
      })

      if (errors) throw errors

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
      const { data, errors } = await this.getPodcastEpisodes({
        skip,
        limit,
        highlighted: 'include',
        includeDrafts: true,
        parseContent: false,
        textBlocks: false,
        populateShow: true,
        toc: false,
      })

      if (errors) {
        throw errors
      }

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
      const { data, errors } = await this.getArticles({
        skip,
        limit,
        highlighted: 'include',
        includeDrafts: true,
        parseContent: false,
        textBlocks: false,
      })

      if (errors) {
        throw errors
      }

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
      await this.fetchData()
      const { staticPages } = this.data

      return staticPages
    }, [])

  findStaticPages = ({
    id,
    skip = 0,
    limit = 10,
    slug,
    toc = false,
    filter,
    nearObject,
    textBlocks = false,
    includeDrafts = false,
  }: {
    id?: string
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
              ...(id
                ? [
                    {
                      operator: 'Equal',
                      path: ['remoteId'],
                      valueString: id,
                    } as GetObjectsGoogleDocWhereInpObj,
                  ]
                : []),
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
    id,
    slug,
    includeDrafts = false,
  }: {
    id?: string
    slug: string
    includeDrafts?: boolean
  }) =>
    this.handleRequest<LPE.StaticPage.Document | null>(async () => {
      const { data } = await this.findStaticPages({
        limit: 1,
        id,
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
    id,
    slug,
    toc = false,
    filter,
    hybrid,
    nearObject,
    textBlocks = false,
    nearText,
    sort,
  }: {
    id?: string
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
              ...(id
                ? [
                    {
                      operator: 'Equal',
                      path: ['remoteId'],
                      valueString: id,
                    } as GetObjectsGoogleDocWhereInpObj,
                  ]
                : []),
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
    id,
    slug,
    toc = false,
    filter,
    nearObject,
    textBlocks = false,
    includeDrafts = false,
    highlighted = 'include',
  }: {
    id?: string
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
                highlighted !== 'only' && includeDrafts && '|draft',
                (highlighted === 'include' || highlighted === 'only') &&
                  '|highlighted',
              ]),
              ...(id
                ? [
                    {
                      operator: 'Equal',
                      path: ['remoteId'],
                      valueString: id,
                    } as GetObjectsGoogleDocWhereInpObj,
                  ]
                : []),
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
    id,
    slug,
    includeDrafts = false,
  }: {
    id?: string
    slug?: string
    parseContent?: boolean
    includeDrafts?: boolean
  }) =>
    this.handleRequest<LPE.Article.Data | null>(
      async () =>
        this.getArticles({
          limit: 1,
          id,
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
          sort: { order: 'desc', path: ['pathString'] },
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
    id,
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
    id?: string
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
                highlighted !== 'only' && includeDrafts && '|draft',
                (highlighted === 'include' || highlighted === 'only') &&
                  '|highlighted',
              ]),
              ...(id
                ? [
                    {
                      operator: 'Equal',
                      path: ['remoteId'],
                      valueString: id,
                    } as GetObjectsGoogleDocWhereInpObj,
                  ]
                : []),
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
    id,
    slug,
    showSlug = '',
    toc = false,
    includeDraft = false,
    textBlocks = false,
  }: {
    id?: string
    slug: string
    showSlug?: string
    toc?: boolean
    textBlocks?: boolean
    includeDraft?: boolean
  }) =>
    this.handleRequest<LPE.Podcast.Document | null>(async () => {
      const { data } = await this.getPodcastEpisodes({
        id,
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
    this.handleRequest<ApiPaginatedPayload<LPE.Podcast.Document[]>>(
      async () => {
        await this.fetchData()
        let episodes = [...this.data.episodes]
        if (showSlug)
          episodes = episodes.filter((ep) => ep.show?.slug === showSlug)

        const data = episodes.slice(skip, skip + limit)

        return {
          data,
          hasMore: episodes.length > skip + limit,
        }
      },
      { data: [], hasMore: false },
    )

  getRecentPosts = async ({
    limit = 10,
    skip = 0,
  }: {
    limit?: number
    skip?: number
  }) =>
    this.handleRequest<ApiPaginatedPayload<LPE.Post.Document[]>>(
      async () => {
        await this.fetchData()
        const { posts } = this.data

        const data = posts.slice(skip, skip + limit)

        return {
          data,
          hasMore: posts.length > skip + limit,
        }
      },
      {
        data: [],
        hasMore: false,
      },
    )

  getHighlightedPosts = async () =>
    this.handleRequest<LPE.Post.Document[]>(async () => {
      const { data: articles } = await this.getHighlightedArticles({})
      const { data: episodes } = await this.getHighlightedEpisodes({})

      return [...articles, ...episodes].sort(sortPosts)
    }, [])

  getArticlesFromSameAuthors = async ({
    slug,
    authors = [],
  }: {
    slug?: string
    authors?: string[]
  }) =>
    this.handleRequest<LPE.Article.Metadata[]>(async () => {
      await this.fetchData()
      const { posts } = this.data
      return posts.filter(
        (post) =>
          post.slug !== slug &&
          authors.every((name) => !!post.authors.find((a) => a.name === name)),
      ) as LPE.Article.Metadata[]
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

  getDocById = ({
    id,
    includeDrafts = false,
  }: {
    id: string
    includeDrafts?: boolean
  }) =>
    this.handleRequest<LPE.Post.Document | LPE.StaticPage.Document | null>(
      async () => {
        const { data, errors } = await this.findPostDocs({
          toc: true,
          skip: 0,
          limit: 1,
          textBlocks: false,
          filter: {
            operator: 'And',
            operands: [
              {
                operator: 'Equal',
                valueString: id,
                path: ['remoteId'],
              },
              this.helpers.args.wherePath([
                'published|highlighted',
                includeDrafts && '|draft',
              ]),
            ],
          },
        })

        if (errors) throw errors

        const [doc] = data
        if (!doc) throw 'Not found!'

        const { data: shows } = await this.getPodcastShows({
          populateEpisodes: false,
        })

        const transformers = unbodyDataTypes.get({
          classes: ['document'],
          objectType: 'GoogleDoc',
        })

        const transformed = await unbodyDataTypes.transform(
          transformers,
          doc,
          undefined,
          {
            shows,
            parseContent: false,
          },
        )

        return transformed
      },
      null,
    )

  findDocRemoteId = ({ id }: { id: string }) =>
    this.handleRequest<string | null>(async () => {
      const {
        data: {
          Get: { GoogleDoc: docs = [] },
        },
        errors,
      } = await this.client.query({
        query: GetPostsDocument,
        variables: {
          ...this.helpers.args.page(0, 1),
          imageBlocks: false,
          textBlocks: false,
          toc: false,
          remoteId: true,
          mentions: false,
          filter: {
            operator: 'Equal',
            path: ['id'],
            valueString: id,
          },
        },
      })

      if (errors) throw errors

      const [doc] = docs
      if (!doc) throw 'Not found!'

      return doc.remoteId || null
    }, null)

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

const _globalThis = globalThis as any
if (!_globalThis.unbodyApi)
  _globalThis.unbodyApi = new UnbodyService(
    process.env.UNBODY_API_KEY || '',
    process.env.UNBODY_PROJECT_ID || '',
  )

export default _globalThis.unbodyApi as UnbodyService
