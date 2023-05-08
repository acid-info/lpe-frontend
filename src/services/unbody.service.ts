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

const unbody = new UnbodyClient(
  UNBODY_API_KEY as string,
  UNBODY_LPE_PROJECT_ID as string,
)

type HomepagePost = Pick<
  UnbodyGoogleDoc,
  'title' | 'summary' | 'tags' | 'modifiedAt' | 'subtitle' | 'blocks'
>

export const getHomepagePosts = (): Promise<HomepagePost[]> => {
  return unbody
    .request<UnbodyGraphQlResponseGoogleDoc>(getHomePagePostsQuery())
    .then(({ data }) => data.Get.GoogleDoc)
}

export const getAllArticlePostSlugs = (): Promise<{ remoteId: string }[]> => {
  console.log(getAllPostsSlugQuery())
  return unbody
    .request<UnbodyGraphQlResponseGoogleDoc>(getAllPostsSlugQuery())
    .then(({ data }) => data.Get.GoogleDoc)
}

export const getArticlePost = (id: string): Promise<UnbodyGoogleDoc> => {
  const query = getArticlePostQuery({
    where: {
      path: ['remoteId'],
      operator: UnbodyGraphQl.Filters.WhereOperatorEnum.Equal,
      valueString: id,
    },
  })

  return unbody
    .request<UnbodyGraphQlResponseGoogleDoc>(getArticlePostQuery())
    .then(({ data }) => {
      const article = data.Get.GoogleDoc[0]
      return {
        ...article,
        toc: JSON.parse(
          article.toc as string,
        ) as Array<UnbodyGraphQl.Fragments.TocItem>,
      }
    })
}

export default unbody
