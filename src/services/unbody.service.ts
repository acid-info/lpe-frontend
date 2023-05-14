import { UnbodyClient } from '@/lib/unbody/client.class'
import {
  UnbodyGoogleDoc,
  UnbodyGraphQlResponseGoogleDoc,
  UnbodyGetFilters,
  UnbodyImageBlock,
  UnbodyTextBlock,
  UnbodyGraphQlResponseBlocks,
  UnbodyGraphQlResponse,
  GoogleDocEnhanced,
  TextBlockEnhanced,
  ImageBlockEnhanced,
  UnbodyGraphQlResponseTopics,
} from '@/lib/unbody/unbody.types'

import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

type WhereOperandsInpObj = UnbodyGraphQl.Filters.WhereOperandsInpObj

import { getArticlePostQuery, getRelatedArticlesQuery } from '@/queries/getPost'
import { getHomePagePostsQuery } from '@/queries/getPosts'
import { getAllPostsSlugQuery } from '@/queries/getPostsSlugs'
import { getSearchArticlesQuery } from '@/queries/searchArticles'

import {
  ApiResponse,
  GlobalSearchResponse,
  SearchResultItem,
} from '@/types/data.types'
import { getSearchBlocksQuery } from '@/queries/searchBlocks'
import axios from 'axios'
import { getTopicsQuery } from '@/queries/getTopics'

const { UNBODY_API_KEY, UNBODY_LPE_PROJECT_ID } = process.env

type HomepagePost = Pick<
  GoogleDocEnhanced,
  | 'remoteId'
  | 'title'
  | 'summary'
  | 'tags'
  | 'modifiedAt'
  | 'subtitle'
  | 'blocks'
  | 'mentions'
  | 'slug'
  | '_additional'
>

type HomePageData = {
  posts: HomepagePost[]
  featured: HomepagePost | null
}

type UnbodyDocTypes =
  | UnbodyGoogleDoc
  | UnbodyImageBlock
  | UnbodyTextBlock
  | GoogleDocEnhanced
  | TextBlockEnhanced

const OperandFactory = (
  operator: UnbodyGraphQl.Filters.WhereOperatorEnum,
  path: string | string[],
  value: string,
  valuePath: string,
): WhereOperandsInpObj => ({
  path,
  operator,
  [valuePath]: value,
})

export const Operands: Record<string, (...a: any) => WhereOperandsInpObj> = {
  WHERE_PUBLISHED: (subPath: string[] = ['pathString']) => {
    return OperandFactory(
      UnbodyGraphQl.Filters.WhereOperatorEnum.Like,
      [...subPath],
      '*/published/*',
      'valueString',
    )
  },
  WHERE_ID_IS: (id) =>
    OperandFactory(
      UnbodyGraphQl.Filters.WhereOperatorEnum.Equal,
      'remoteId',
      id,
      'valueString',
    ),
  WHERE_SLUG_IS: (slug) =>
    OperandFactory(
      UnbodyGraphQl.Filters.WhereOperatorEnum.Equal,
      'slug',
      slug,
      'valueString',
    ),
  WHERE_SLUG_IS_NOT: (slug) =>
    OperandFactory(
      UnbodyGraphQl.Filters.WhereOperatorEnum.NotEqual,
      'slug',
      slug,
      'valueString',
    ),
  WHERE_AUTHOR_IS: (author) =>
    OperandFactory(
      UnbodyGraphQl.Filters.WhereOperatorEnum.Like,
      'mentions',
      author,
      'valueText',
    ),
  WHERE_IS_IN_SLUG: (slug: string) =>
    OperandFactory(
      UnbodyGraphQl.Filters.WhereOperatorEnum.Equal,
      ['document', UnbodyGraphQl.UnbodyDocumentTypeNames.GoogleDoc, 'slug'],
      slug,
      'valueString',
    ),
}

const mapSearchResultItem = <T extends UnbodyDocTypes>(
  q: string,
  tags: string[],
  item: T,
): SearchResultItem<T> => ({
  // @ts-ignore
  doc:
    item.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock
      ? enhanceTextBlock(item)
      : item,
  score: q.length > 0 || tags.length > 0 ? item._additional.certainty : 0,
})

const enhanceGoogleDoc = (doc: UnbodyGoogleDoc): GoogleDocEnhanced => ({
  ...doc,
  mentions:
    typeof doc.mentions === 'string'
      ? (JSON.parse(doc.mentions) as Array<UnbodyGraphQl.Fragments.MentionItem>)
      : [],
  toc:
    typeof doc.toc === 'string'
      ? (JSON.parse(doc.toc) as Array<UnbodyGraphQl.Fragments.TocItem>)
      : [],
  blocks:
    doc.blocks && doc.blocks.length
      ? doc.blocks.map((b) => {
          return b.__typename ===
            UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock
            ? enhanceTextBlock(b)
            : b
        })
      : [],
})

const enhanceImageBlock = async (
  block: UnbodyImageBlock,
): Promise<ImageBlockEnhanced> => {
  try {
    let image = await axios.get(`${block.url}?blur=200&px=16&auto=format`, {
      responseType: 'arraybuffer',
    })
    let returnedB64 = Buffer.from(image.data).toString('base64')
    return {
      ...block,
      placeholderBase64: `data:image/png;base64,${returnedB64}`,
    }
  } catch (e) {
    return block
  }
}

const resolveScore = (_additional: any): number => {
  if (!_additional) {
    return 0
  }
  return _additional.certainty || parseFloat(_additional.score)
}

const enhanceTextBlock = (block: UnbodyTextBlock): TextBlockEnhanced => ({
  ...block,
  footnotes:
    typeof block.footnotes === 'string'
      ? (JSON.parse(
          block.footnotes,
        ) as Array<UnbodyGraphQl.Fragments.FootnoteItem>)
      : [],
  document: block.document ? block.document.map(enhanceGoogleDoc) : [],
})

class UnbodyService extends UnbodyClient {
  constructor() {
    super(UNBODY_API_KEY as string, UNBODY_LPE_PROJECT_ID as string)
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

  getHomepagePosts = (): Promise<ApiResponse<HomePageData>> => {
    const query = getHomePagePostsQuery({
      where: Operands.WHERE_PUBLISHED(),
    })

    return this.request<UnbodyGraphQlResponseGoogleDoc>(query)
      .then(({ data }) => {
        if (!data) {
          return this.handleResponse({ featured: null, posts: [] }, 'No data')
        }

        const featured =
          data.Get.GoogleDoc.find((post) =>
            post.pathString.includes('/featured/'),
          ) || null

        const posts = data.Get.GoogleDoc.filter(
          (post) => !post.pathString.includes('/featured/'),
        )

        return this.handleResponse({
          featured: featured ? enhanceGoogleDoc(featured) : null,
          posts: posts.map(enhanceGoogleDoc),
        })
      })
      .catch((e) => this.handleResponse({ featured: null, posts: [] }, e))
  }

  getAllArticlePostSlugs = (): Promise<ApiResponse<{ slug: string }[]>> => {
    return this.request<UnbodyGraphQlResponseGoogleDoc>(
      getAllPostsSlugQuery({
        where: Operands.WHERE_PUBLISHED(),
      }),
    )
      .then(({ data }) => {
        if (!data) return this.handleResponse([], 'No data')
        return this.handleResponse(data.Get.GoogleDoc)
      })
      .catch((e) => this.handleResponse([], e))
  }

  getArticlePost = (
    slug: string,
    published: boolean = true,
  ): Promise<ApiResponse<GoogleDocEnhanced | null>> => {
    const query = getArticlePostQuery({
      where: published
        ? {
            operator: UnbodyGraphQl.Filters.WhereOperatorEnum.And,
            operands: [
              Operands.WHERE_PUBLISHED(),
              Operands.WHERE_SLUG_IS(slug),
            ],
          }
        : Operands.WHERE_SLUG_IS(slug),
    })

    return this.request<UnbodyGraphQlResponseGoogleDoc>(query)
      .then(({ data }) => {
        if (!data) return this.handleResponse(null, 'No data')
        const article = data.Get.GoogleDoc[0]
        return this.handleResponse(enhanceGoogleDoc(article))
      })
      .catch((e) => this.handleResponse(null, e))
  }

  getRelatedArticles = (id: string, published: boolean = true) => {
    const query = getRelatedArticlesQuery({
      ...(published
        ? {
            where: Operands.WHERE_PUBLISHED(),
          }
        : {}),
      nearObject: {
        id,
      },
    })

    return this.request<UnbodyGraphQlResponseGoogleDoc>(query)
      .then(({ data }) => {
        if (!data) return this.handleResponse([], 'No data')
        return this.handleResponse(data.Get.GoogleDoc.map(enhanceGoogleDoc))
      })
      .catch((e) => this.handleResponse([], e))
  }

  getArticlesFromSameAuthors = (
    slug: string,
    authors: string[],
    published: boolean = true,
  ) => {
    const query = getRelatedArticlesQuery({
      where: {
        operator: UnbodyGraphQl.Filters.WhereOperatorEnum.And,
        operands: [
          ...(published ? [Operands.WHERE_PUBLISHED()] : []),
          ...authors.map(Operands.WHERE_AUTHOR_IS),
          Operands.WHERE_SLUG_IS_NOT(slug),
        ],
      },
    })

    return this.request<UnbodyGraphQlResponseGoogleDoc>(query)
      .then(({ data }) => {
        if (!data || !data.Get || !data.Get.GoogleDoc)
          return this.handleResponse([], 'No data')
        return this.handleResponse(data.Get.GoogleDoc.map(enhanceGoogleDoc))
      })
      .catch((e) => this.handleResponse([], e))
  }

  searchBlockInArticle = async (
    q: string = '',
    tags: string[] = [],
    published: boolean = true,
    articleSlug: string,
  ): Promise<
    ApiResponse<SearchResultItem<UnbodyImageBlock | TextBlockEnhanced>[]>
  > => {
    const query = getSearchBlocksQuery({
      ...(q.trim().length > 0
        ? {
            nearText: {
              concepts: [q, ...tags],
              certainty: 0.8,
            },
            where: {
              operator: UnbodyGraphQl.Filters.WhereOperatorEnum.And,
              operands: [
                ...(published
                  ? [
                      Operands.WHERE_PUBLISHED([
                        'document',
                        UnbodyGraphQl.UnbodyDocumentTypeNames.GoogleDoc,
                        'pathString',
                      ]),
                    ]
                  : []),
                Operands.WHERE_IS_IN_SLUG(articleSlug),
              ],
            },
          }
        : {}),
    })

    return this.request<UnbodyGraphQlResponseBlocks>(query)
      .then(({ data }) => {
        if (!data || !(data.Get.ImageBlock || data.Get.TextBlock))
          return this.handleResponse([], 'No data')

        const blocks = [
          ...(data.Get.ImageBlock || []),
          ...(data.Get.TextBlock || []),
        ]

        return this.handleResponse(
          blocks
            .map((block) => {
              if (
                block.__typename ===
                UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock
              ) {
                return mapSearchResultItem(q, tags, enhanceTextBlock(block))
              }
              return mapSearchResultItem(q, tags, block)
            })
            .sort((a, b) => b.score - a.score),
        )
      })
      .catch((e) => this.handleResponse([], e))
  }

  serachBlocks = async (
    q: string = '',
    tags: string[] = [],
    published: boolean = true,
  ): Promise<
    ApiResponse<SearchResultItem<UnbodyImageBlock | UnbodyTextBlock>[]>
  > => {
    const query = getSearchBlocksQuery({
      ...(q.trim().length > 0
        ? {
            nearText: {
              concepts: [q, ...tags],
              certainty: 0.85,
            },
            where: Operands.WHERE_PUBLISHED([
              'document',
              UnbodyGraphQl.UnbodyDocumentTypeNames.GoogleDoc,
              'pathString',
            ]),
            limit: 20,
          }
        : { limit: 20 }),
    })

    return this.request<UnbodyGraphQlResponseBlocks>(query)
      .then(({ data }) => {
        if (!data || !(data.Get.ImageBlock || data.Get.TextBlock))
          return this.handleResponse([], 'No data')

        const blocks = [
          ...(data.Get.ImageBlock || []),
          ...(data.Get.TextBlock || []),
        ]

        return this.handleResponse(
          blocks
            .map((block) => mapSearchResultItem(q, tags, block))
            .sort((a, b) => b.score - a.score),
        )
      })
      .catch((e) => this.handleResponse([], e))
  }

  searchArticles = (
    q: string = '',
    tags: string[] = [],
    published: boolean = true,
  ): Promise<ApiResponse<SearchResultItem<GoogleDocEnhanced>[]>> => {
    let queryFilters = {}
    let whereFilters: any = []

    if (q.trim().length > 0) {
      queryFilters = {
        nearText: {
          concepts: [q],
        },
      }
    }

    // if publushed is true, we add the published filter
    // if published is false, we don't add the published filter
    // if tags empty, we don't add the tags filter
    // if tags not empty, we add the tags filter

    if (published) {
      whereFilters.push(Operands.WHERE_PUBLISHED())
    }

    if (tags.length > 0) {
      whereFilters.push({
        operator: UnbodyGraphQl.Filters.WhereOperatorEnum.And,
        operands: tags.map((tag) => ({
          path: ['tags'],
          operator: UnbodyGraphQl.Filters.WhereOperatorEnum.Like,
          valueString: tag.toLowerCase(),
        })),
      })
    }

    queryFilters = {
      ...queryFilters,
      where: {
        operator: UnbodyGraphQl.Filters.WhereOperatorEnum.And,
        operands: whereFilters,
      },
    }

    const query = getSearchArticlesQuery(queryFilters)

    return this.request<UnbodyGraphQlResponseGoogleDoc>(query)
      .then(({ data }) => {
        if (!data || !data.Get.GoogleDoc)
          return this.handleResponse([], 'No data')

        return this.handleResponse(
          data.Get.GoogleDoc.map((item) => ({
            doc: enhanceGoogleDoc(item),
            score: resolveScore(item._additional),
          })),
        )
      })
      .catch((e) => this.handleResponse([], e))
  }

  getTopics = (published: boolean = true): Promise<ApiResponse<string[]>> => {
    const query = getTopicsQuery(
      published
        ? {
            where: Operands.WHERE_PUBLISHED(),
          }
        : {},
    )

    return this.request<UnbodyGraphQlResponseTopics>(query)
      .then(({ data }) => {
        if (!data || !data.Get || !data.Get.GoogleDoc)
          return this.handleResponse([], 'No data')
        const topics: string[] = data.Get.GoogleDoc.flatMap((item) => item.tags)
        const uniqueTopics = topics.filter(
          (item, index) => topics.indexOf(item) === index,
        )
        return this.handleResponse(uniqueTopics)
      })
      .catch((e) => this.handleResponse([], e))
  }
}

const unbodyApi = new UnbodyService()
export default unbodyApi
