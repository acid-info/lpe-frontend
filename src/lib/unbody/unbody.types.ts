import { UnbodyGraphQl } from './unbody-content.types'

export type UnbodyGoogleDoc = UnbodyGraphQl.GoogleDoc
export type UnbodyGoogleCalendarEvent = UnbodyGraphQl.GoogleCalendarEvent
export type UnbodyTextBlock = UnbodyGraphQl.TextBlock
export type UnbodyImageBlock = UnbodyGraphQl.ImageBlock
export type UnbodyAudio = UnbodyGraphQl.AudioFile
export type UnbodyGetFilters = UnbodyGraphQl.Filters.GetDocsArgs
export type UnbodyTocItem = UnbodyGraphQl.Fragments.TocItem
export type UnbodyMentionItem = UnbodyGraphQl.Fragments.MentionItem

export type GoogleDocEnhanced = UnbodyGoogleDoc & {
  toc: Array<UnbodyGraphQl.Fragments.TocItem>
  mentions: Array<UnbodyGraphQl.Fragments.MentionItem>
  blocks: Array<UnbodyImageBlock | TextBlockEnhanced>
}

export type TextBlockEnhanced = UnbodyTextBlock & {
  footnotes: Array<UnbodyGraphQl.Fragments.FootnoteItem>
  document?: Array<GoogleDocEnhanced>
}

export type ImageBlockEnhanced = UnbodyImageBlock & {
  blurhash?: string
}

export * as UnbodyGraphQl from './unbody-content.types'

export type UnbodyGraphQlResponse<T> = {
  data: {
    Get: T
  }
}

export type UnbodyGraphQlResponseGoogleDoc = UnbodyGraphQlResponse<{
  GoogleDoc: UnbodyGoogleDoc[]
}>

export type UnbodyGraphQlResponseGoogleCalendarEvent = UnbodyGraphQlResponse<{
  GoogleCalendarEvent: UnbodyGoogleCalendarEvent[]
}>

export type UnbodyGraphQlResponseTextBlock = UnbodyGraphQlResponse<{
  TextBlock: UnbodyTextBlock[]
}>

export type UnbodyGraphQlResponseImageBlock = UnbodyGraphQlResponse<{
  ImageBlock: UnbodyImageBlock[]
}>

export type UnbodyGraphQlResponseBlocks = UnbodyGraphQlResponse<{
  ImageBlock: UnbodyImageBlock[]
  TextBlock: UnbodyTextBlock[]
}>
