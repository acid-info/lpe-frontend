import { UnbodyClient } from '@/lib/unbody/client.class'
import {
  UnbodyGoogleDoc,
  UnbodyGraphQlResponseGoogleDoc,
  UnbodyGetFilters,
} from '@/lib/unbody/unbody.types'

import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

import { getArticlePostQuery } from '@/queries/getPost'
import { getHomePagePostsQuery } from '@/queries/getPosts'
import { getAllPostsSlugQuery } from '@/queries/getPostsSlugs'
import { getSearchArticlesQuery } from '@/queries/searchArticles'

import {
  ApiResponse,
  GlobalSearchResponse,
  SearchResultItem,
} from '@/types/data.types'

const { UNBODY_API_KEY, UNBODY_LPE_PROJECT_ID } = process.env

type HomepagePost = Pick<
  UnbodyGoogleDoc,
  'title' | 'summary' | 'tags' | 'modifiedAt' | 'subtitle' | 'blocks'
>

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

  getHomepagePosts = (): Promise<ApiResponse<HomepagePost[]>> => {
    return this.request<UnbodyGraphQlResponseGoogleDoc>(getHomePagePostsQuery())
      .then(({ data }) => {
        if (!data) return this.handleResponse([], 'No data')
        return this.handleResponse(data.Get.GoogleDoc)
      })
      .catch((e) => this.handleResponse([], e))
  }

  getAllArticlePostSlugs = (): Promise<ApiResponse<{ remoteId: string }[]>> => {
    return this.request<UnbodyGraphQlResponseGoogleDoc>(getAllPostsSlugQuery())
      .then(({ data }) => {
        if (!data) return this.handleResponse([], 'No data')
        return this.handleResponse(data.Get.GoogleDoc)
      })
      .catch((e) => this.handleResponse([], e))
  }

  getArticlePost = (
    id: string,
  ): Promise<ApiResponse<UnbodyGoogleDoc | null>> => {
    const query = getArticlePostQuery({
      where: {
        path: ['remoteId'],
        operator: UnbodyGraphQl.Filters.WhereOperatorEnum.Equal,
        valueString: id,
      },
    })

    return this.request<UnbodyGraphQlResponseGoogleDoc>(query)
      .then(({ data }) => {
        if (!data) return this.handleResponse(null, 'No data')
        const article = data.Get.GoogleDoc[0]
        return this.handleResponse({
          ...article,
          toc: JSON.parse(
            article.toc as string,
          ) as Array<UnbodyGraphQl.Fragments.TocItem>,
        })
      })
      .catch((e) => this.handleResponse(null, e))
  }

  searchArticles = (
    q: string = '',
    tags: string[] = [],
  ): Promise<ApiResponse<SearchResultItem<UnbodyGoogleDoc>[]>> => {
    const query = getSearchArticlesQuery({
      ...(q.trim().length > 0
        ? {
            nearText: {
              concepts: [q],
            },
          }
        : {}),
      ...((tags.length > 0 && {
        where: {
          operator: UnbodyGraphQl.Filters.WhereOperatorEnum.And,
          operands: tags.map((tag) => ({
            path: ['tags'],
            operator: UnbodyGraphQl.Filters.WhereOperatorEnum.Like,
            valueString: tag,
          })),
        },
      }) ||
        {}),
    })

    console.log(q, tags, q.length, tags.length)

    return this.request<UnbodyGraphQlResponseGoogleDoc>(query)
      .then(({ data }) => {
        if (!data) return this.handleResponse([], 'No data')
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
