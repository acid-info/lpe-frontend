import {
  UnbodyGoogleDoc,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

export enum PostTypes {
  Article = 'article',
  Block = 'block',
}

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

export type SearchHookDataPayload = {
  articles: SearchResultItem<UnbodyGoogleDoc>[]
  blocks: SearchResultItem<UnbodyImageBlock | UnbodyTextBlock>[]
}

export type SearchResults = {
  articles: SearchHook<UnbodyGoogleDoc>
  blocks: SearchHook<UnbodyImageBlock | UnbodyTextBlock>
  search: (
    query: string,
    tags: string[],
    docType: UnbodyGraphQl.UnbodyDocumentTypeNames,
  ) => Promise<void>
  reset: (initialData: SearchHookDataPayload) => void
}

export type SearchResultsItemTypes =
  | SearchResultItem<UnbodyGoogleDoc>
  | SearchResultItem<UnbodyImageBlock | UnbodyTextBlock>

export type SearchHook<T> = {
  data: SearchResultItem<T>[]
  loading: boolean
  error: string | null
  search: (query: string, tags: string[]) => Promise<SearchResultItem<T>[]>
  reset: (initialData: SearchResultItem<T>[]) => void
}
