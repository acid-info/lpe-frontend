import { ApolloClient, InMemoryCache } from '@apollo/client'
import axios, { Axios } from 'axios'
import {
  Enum_Post_Type,
  GetPodcastShowsDocument,
  GetPostsDocument,
  GetRelatedPostsDocument,
  GetStaticPagesDocument,
  PodcastShowFiltersInput,
  PostFiltersInput,
} from '../../lib/strapi/strapi.generated'
import { ApiResponse } from '../../types/data.types'
import { LPE } from '../../types/lpe.types'
import { settle } from '../../utils/promise.utils'
import { strapiTransformers } from './transformers/strapi.transformers'

export class StrapiService {
  client: ApolloClient<any> = null as any
  axios: Axios = null as any

  constructor(apiUrl: string, graphqlUrl: string, apiKey: string) {
    this.axios = axios.create({
      baseURL: apiUrl,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            podcast_shows: {
              merge(existing = {}, incoming) {
                return {
                  ...existing,
                  ...incoming,
                }
              },
            },
            pages: {
              merge(existing = {}, incoming) {
                return {
                  ...existing,
                  ...incoming,
                }
              },
            },
            posts: {
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
      cache,
      uri: graphqlUrl,
      ssrMode: true,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
  }

  handleResponse = <T>(
    data: T | null = null,
    errors: any = null,
  ): ApiResponse<T> => {
    if (errors) console.error(errors)
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

  getStaticPages = async ({
    skip = 0,
    limit = 10,
    sort = ['publishedAt:desc'],
    filters = {},
    id,
    slug,
    published = true,
    parseContent = false,
  }: {
    skip?: number
    limit?: number
    sort?: string[]
    id?: string
    slug?: string
    filters?: PostFiltersInput
    published?: boolean
    parseContent?: boolean
  }) =>
    this.handleRequest<LPE.StaticPage.Document[]>(async () => {
      const result: LPE.StaticPage.Document[] = []

      const {
        data: {
          pages: { data },
        },
      } = await this.client.query({
        query: GetStaticPagesDocument,
        variables: {
          pagination: {
            start: skip,
            limit: limit,
          },
          filters: {
            and: [
              ...(filters ? [filters] : []),
              ...(slug ? [{ slug: { eq: slug } }] : []),
              ...(id ? [{ id: { eq: id } }] : []),
            ],
          },
          sort,
          withContent: parseContent,
          publicationState: published ? 'LIVE' : 'PREVIEW',
        },
      })

      result.push(
        ...(await strapiTransformers.transformMany(
          strapiTransformers.get({}),
          data,
          undefined,
          undefined,
        )),
      )

      return result
    })

  getPosts = async ({
    skip = 0,
    limit = 10,
    sort = ['publish_date:desc'],
    filters = {},
    id,
    slug,
    published = true,
    highlighted = 'include',
    parseContent = false,
  }: {
    skip?: number
    limit?: number
    sort?: string[]
    id?: string
    slug?: string
    filters?: PostFiltersInput
    published?: boolean
    highlighted?: 'only' | 'include' | 'exclude'
    parseContent?: boolean
  }) =>
    this.handleRequest(async () => {
      const result: LPE.Post.Document[] = []

      const {
        data: {
          posts: { data, meta },
        },
      } = await this.client.query({
        query: GetPostsDocument,
        variables: {
          pagination: {
            start: skip,
            limit: limit,
          },
          filters: {
            and: [
              ...(filters ? [filters] : []),
              ...(slug ? [{ slug: { eq: slug } }] : []),
              ...(id ? [{ id: { eq: id } }] : []),
              ...(highlighted === 'only'
                ? [
                    {
                      featured: {
                        eq: true,
                      },
                    } as PostFiltersInput,
                  ]
                : highlighted === 'exclude'
                ? [
                    {
                      or: [
                        {
                          featured: {
                            eq: false,
                          },
                        },
                        {
                          featured: {
                            null: true,
                          },
                        },
                      ],
                    } as PostFiltersInput,
                  ]
                : []),
            ],
          },
          sort,
          withContent: parseContent,
          publicationState: published ? 'LIVE' : 'PREVIEW',
        },
      })

      result.push(
        ...(await strapiTransformers.transformMany(
          strapiTransformers.get({}),
          data,
          undefined,
          undefined,
        )),
      )

      return {
        data: result,
        total: meta.pagination.total,
        hasMore: meta.pagination.page < meta.pagination.pageCount,
      }
    })

  getPodcastShows = async ({
    skip = 0,
    limit = 10,
    sort = ['createdAt:desc'],
    filters = {},
    slug,
    published = true,
    populateEpisodes = false,
    episodesLimit = 10,
  }: {
    skip?: number
    limit?: number
    sort?: string[]
    slug?: string
    filters?: PodcastShowFiltersInput
    published?: boolean
    populateEpisodes?: boolean
    episodesLimit?: number
  }) =>
    this.handleRequest<LPE.Podcast.Show[]>(async () => {
      const result: LPE.Podcast.Show[] = []

      const {
        data: {
          podcastShows: { data },
        },
      } = await this.client.query({
        query: GetPodcastShowsDocument,
        variables: {
          pagination: {
            start: skip,
            limit: limit,
          },
          filters: {
            and: [
              ...(filters ? [filters] : []),
              ...(slug ? [{ slug: { eq: slug } }] : []),
            ],
          },
          sort,
          publicationState: published ? 'LIVE' : 'PREVIEW',
        },
      })

      result.push(
        ...(await strapiTransformers.transformMany(
          strapiTransformers.get({}),
          data,
          undefined,
          undefined,
        )),
      )

      for (const show of result) {
        const { data } = await this.getPosts({
          filters: {
            podcast_show: {
              id: {
                eq: show.id,
              },
            },
          },
          limit: episodesLimit,
          highlighted: 'include',
          parseContent: false,
          published: true,
        })

        if (populateEpisodes)
          show.episodes = data.data as LPE.Podcast.Document[]

        show.numberOfEpisodes = data.total
      }

      return result
    })

  getRecentPosts = async ({
    skip = 0,
    limit = 10,
    highlighted = 'exclude',
  }: {
    limit?: number
    skip?: number
    highlighted?: 'only' | 'include' | 'exclude'
  }) =>
    this.handleRequest(async () => {
      const posts = await this.getPosts({
        limit,
        skip,
        highlighted,
        parseContent: false,
        published: true,
      })

      return posts.data
    })

  getHighlightedPosts = async () =>
    this.handleRequest(async () => {
      const posts = await this.getPosts({
        limit: 10,
        highlighted: 'only',
        parseContent: false,
        published: true,
      })

      return posts.data.data
    })

  getLatestEpisodes = async ({
    showSlug,
    limit = 10,
    skip = 0,
    highlighted = 'include',
  }: {
    showSlug?: string
    limit?: number
    skip?: number
    highlighted?: 'only' | 'include' | 'exclude'
  }) =>
    this.getPosts({
      limit,
      skip,
      highlighted,
      parseContent: false,
      published: true,
      filters: {
        ...(showSlug
          ? {
              podcast_show: {
                slug: {
                  eq: showSlug,
                },
              },
            }
          : {}),
        type: {
          eq: 'Episode' as Enum_Post_Type,
        },
      },
    })

  getEpisode = async ({
    id,
    slug,
    showSlug,
    published = true,
  }: {
    showSlug: string
    slug?: string
    id?: string
    published?: boolean
  }) =>
    this.getPosts({
      limit: 1,
      highlighted: 'include',
      parseContent: true,
      published,
      id,
      slug,
      filters: {
        ...(showSlug
          ? {
              podcast_show: {
                slug: {
                  eq: showSlug,
                },
              },
            }
          : {}),
        type: {
          eq: 'Episode' as Enum_Post_Type,
        },
      },
    }).then((res) => ({
      ...res,
      data: res.data.data[0] as LPE.Podcast.Document,
    }))

  getPostsFromSameAuthors = async ({
    type,
    authors,
    excludeId,
  }: {
    authors: string[]
    excludeId?: string
    type: LPE.PostType
  }) =>
    this.getPosts({
      limit: 10,
      highlighted: 'include',
      parseContent: false,
      filters: {
        and: [
          {
            authors: {
              id: {
                in: authors,
              },
            },
          },
          {
            type: {
              eq: type === 'article' ? 'Article' : 'Podcast',
            },
          },
          ...(excludeId
            ? [
                {
                  id: {
                    ne: excludeId,
                  },
                },
              ]
            : []),
        ],
      },
    })

  getRelatedPosts = async ({ id, type }: { id: string; type: LPE.PostType }) =>
    this.handleRequest<LPE.Post.Document[]>(async () => {
      const { data } = await this.client.query({
        query: GetRelatedPostsDocument,
        variables: {
          id,
          type:
            type === 'article'
              ? ('Article' as Enum_Post_Type)
              : ('Episode' as Enum_Post_Type),
        },
      })

      return strapiTransformers.transformMany(
        strapiTransformers.get({}),
        data.post.data.attributes.related_posts.data,
        undefined,
        undefined,
      )
    })

  getTopics = async () =>
    this.handleRequest<LPE.Tag.Document[]>(async () => {
      const { data } = await this.axios.get('/tags/getAll')
      return data.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        postsCount: tag.posts?.count ?? 0,
      }))
    })
}

export const strapiApi = new StrapiService(
  process.env.STRAPI_API_URL || '',
  process.env.STRAPI_GRAPHQL_URL || '',
  process.env.STRAPI_API_KEY || '',
)