import {
  UnbodyGoogleDoc,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

export interface ArticlePostData extends UnbodyGoogleDoc {
  toc: Array<UnbodyGraphQl.Fragments.TocItem>
}

export type ApiResponse<T> = {
  data: T
  errors: any
}

export type SearchResultItem<T> = {
  doc: T
  score: number
}

export type GlobalSearchResponse = {
  posts: ArticlePostData[]
  blocks: Array<SearchResultItem<UnbodyTextBlock | UnbodyImageBlock>>
}
