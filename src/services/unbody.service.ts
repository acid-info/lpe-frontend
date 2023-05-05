import { UnbodyClient } from '@/lib/unbody/client.class'
import {
  UnbodyGoogleDoc,
  UnbodyGraphQlResponseGoogleDoc,
} from '@/lib/unbody/unbody.types'
import { getHomePagePostsQuery } from '@/queries/getPosts'

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

export default unbody
