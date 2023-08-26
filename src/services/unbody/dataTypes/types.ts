import {
  GoogleDoc,
  ImageBlock,
  TextBlock,
} from '../../../lib/unbody/unbody.generated'
import { UnbodyDataTypes } from './UnbodyDataTypes'

export type UnbodyDataTypeConfig<
  D = any,
  T = any,
  O = any,
  R = any,
  C = any,
> = {
  key: UnbodyDataTypeKey
  classes: UnbodyDataTypeClass[]
  objectType:
    | GoogleDoc['__typename']
    | TextBlock['__typename']
    | ImageBlock['__typename']

  isMatch: (
    helpers: UnbodyDataTypeConfigHelpers,
    object: D,
    original: O,
    root: R | undefined,
    context: C,
  ) => boolean

  transform: (
    helpers: UnbodyDataTypeConfigHelpers,
    object: D,
    original: O,
    root: R | undefined,
    context: C,
  ) => T | Promise<T>
}

export type UnbodyDataTypeConfigHelpers = {
  dataTypes: UnbodyDataTypes
}

export const UnbodyDataTypeKeys = {
  TextBlock: 'TextBlock',
  ImageBlock: 'ImageBlock',
  ArticleDocument: 'ArticleDocument',
  ArticleTextBlock: 'ArticleTextBlock',
  ArticleImageBlock: 'ArticleImageBlock',
  ArticleSearchResultItem: 'ArticleSearchResultItem',
  PodcastShowDocument: 'PodcastShowDocument',
  PodcastEpisodeDocument: 'PodcastEpisodeDocument',
  StaticPageDocument: 'StaticPageDocument',
  PostSearchResultDocument: 'PostSearchResultDocument',
} as const

export type UnbodyDataTypeKey =
  (typeof UnbodyDataTypeKeys)[keyof typeof UnbodyDataTypeKeys]

export const UnbodyDataTypeClasses = {
  Article: 'article',
  Podcast: 'podcast',
  Show: 'show',
  Episode: 'episode',
  Document: 'document',
  Search: 'search',
  StaticPage: 'static-page',
} as const

export type UnbodyDataTypeClass =
  (typeof UnbodyDataTypeClasses)[keyof typeof UnbodyDataTypeClasses]
