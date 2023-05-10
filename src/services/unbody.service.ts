import { UnbodyClient } from '@/lib/unbody/client.class'
import {
  UnbodyGoogleDoc,
  UnbodyGraphQlResponseGoogleDoc,
  UnbodyGetFilters,
  UnbodyImageBlock,
  UnbodyTextBlock,
  UnbodyGraphQlResponseBlocks,
  UnbodyGraphQlResponse,
} from '@/lib/unbody/unbody.types'

import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

type WhereOperandsInpObj = UnbodyGraphQl.Filters.WhereOperandsInpObj

import { getArticlePostQuery } from '@/queries/getPost'
import { getHomePagePostsQuery } from '@/queries/getPosts'
import { getAllPostsSlugQuery } from '@/queries/getPostsSlugs'
import { getSearchArticlesQuery } from '@/queries/searchArticles'

import {
  ApiResponse,
  GlobalSearchResponse,
  SearchResultItem,
} from '@/types/data.types'
import { getSearchBlocksQuery } from '@/queries/searchBlocks'

const { UNBODY_API_KEY, UNBODY_LPE_PROJECT_ID } = process.env

type HomepagePost = Pick<
  UnbodyGoogleDoc,
  | 'remoteId'
  | 'title'
  | 'summary'
  | 'tags'
  | 'modifiedAt'
  | 'subtitle'
  | 'blocks'
>

type HomePageData = {
  posts: HomepagePost[]
  featured: HomepagePost | null
}

type UnbodyDocTypes = UnbodyGoogleDoc | UnbodyImageBlock | UnbodyTextBlock

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
  WHERE_PUBLISHED: () =>
    OperandFactory(
      UnbodyGraphQl.Filters.WhereOperatorEnum.Like,
      'pathString',
      '*/published/*',
      'valueString',
    ),
  WHERE_ID_IS: (id) =>
    OperandFactory(
      UnbodyGraphQl.Filters.WhereOperatorEnum.Equal,
      'remoteId',
      id,
      'valueString',
    ),
}

const mapSearchResultItem = <T extends UnbodyDocTypes>(
  q: string,
  tags: string[],
  item: T,
): SearchResultItem<T> => ({
  doc: item,
  score: q.length > 0 || tags.length > 0 ? item._additional.certainty : 0,
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
        data: null as any,
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
        if (!data)
          return this.handleResponse({ featured: null, posts: [] }, 'No data')
        const featured =
          data.Get.GoogleDoc.find((post) =>
            post.pathString.includes('/featured/'),
          ) || null
        const posts = data.Get.GoogleDoc.filter(
          (post) => !post.pathString.includes('/featured/'),
        )
        return this.handleResponse({ featured, posts })
      })
      .catch((e) => this.handleResponse({ featured: null, posts: [] }, e))
  }

  getAllArticlePostSlugs = (): Promise<ApiResponse<{ remoteId: string }[]>> => {
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
    id: string,
    published: boolean = true,
  ): Promise<ApiResponse<UnbodyGoogleDoc | null>> => {
    const query = getArticlePostQuery({
      where: published
        ? {
            operator: UnbodyGraphQl.Filters.WhereOperatorEnum.And,
            operands: [Operands.WHERE_PUBLISHED(), Operands.WHERE_ID_IS(id)],
          }
        : Operands.WHERE_ID_IS(id),
    })

    return this.request<UnbodyGraphQlResponseGoogleDoc>(query)
      .then(({ data }) => {
        if (!data) return this.handleResponse(null, 'No data')
        const article = data.Get.GoogleDoc[0]
        return this.handleResponse({
          ...article,
          blocks: article.blocks.sort((a, b) => a.order - b.order),
          toc: JSON.parse(
            article.toc as string,
          ) as Array<UnbodyGraphQl.Fragments.TocItem>,
        })
      })
      .catch((e) => this.handleResponse(null, e))
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
              certainty: 0.75,
            },
            ...(published
              ? {
                  where: Operands.WHERE_PUBLISHED(),
                }
              : {}),
          }
        : {}),
    })
    return this.request<UnbodyGraphQlResponseBlocks>(query)
      .then(({ data }) => {
        if (!data || !(data.Get.ImageBlock || data.Get.TextBlock))
          return this.handleResponse([], 'No data')
        const blocks = [...data.Get.ImageBlock, ...data.Get.TextBlock]
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
  ): Promise<ApiResponse<SearchResultItem<UnbodyGoogleDoc>[]>> => {
    let queryFilters = {}
    if (q.trim().length > 0) {
      queryFilters = {
        nearText: {
          concepts: [q],
        },
      }
    }

    if (tags.length > 0) {
      queryFilters = {
        ...queryFilters,
        where: {
          operator: UnbodyGraphQl.Filters.WhereOperatorEnum.And,
          operands: tags.map((tag) => ({
            path: ['tags'],
            operator: UnbodyGraphQl.Filters.WhereOperatorEnum.Like,
            valueString: tag,
          })),
        },
      }
    }

    if (published) {
      queryFilters = {
        ...queryFilters,
        where: {
          ...((queryFilters as any).where || {}),
          ...Operands.WHERE_PUBLISHED(),
        },
      }
    }

    const query = getSearchArticlesQuery(queryFilters)

    return this.request<UnbodyGraphQlResponseGoogleDoc>(query)
      .then(({ data }) => {
        if (!data || !data.Get.GoogleDoc)
          return this.handleResponse([], 'No data')
        return this.handleResponse(
          data.Get.GoogleDoc.map((item) => ({
            doc: item,
            score:
              q.length > 0 || tags.length > 0 ? item._additional.certainty : 0,
          })),
        )
      })
      .catch((e) => this.handleResponse([], e))
  }
}

const unbodyApi = new UnbodyService()
export default unbodyApi
