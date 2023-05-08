import { UnbodyGoogleDoc } from '@/lib/unbody/unbody.types'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

export interface ArticlePostData extends UnbodyGoogleDoc {
  toc: Array<UnbodyGraphQl.Fragments.TocItem>
}
