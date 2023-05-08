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

const { UNBODY_API_KEY, UNBODY_LPE_PROJECT_ID } = process.env

type HomepagePost = Pick<
  UnbodyGoogleDoc,
  'title' | 'summary' | 'tags' | 'modifiedAt' | 'subtitle' | 'blocks'
>

type ApiResponse<T> = {
  data: T
  errors: any
}

class ApiService extends UnbodyClient {
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
}

const api = new ApiService()
export default api
