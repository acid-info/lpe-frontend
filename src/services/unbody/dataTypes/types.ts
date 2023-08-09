import {
  GoogleDoc,
  ImageBlock,
  TextBlock,
} from '../../../lib/unbody/unbody.generated'
import { UnbodyDataTypes } from './UnbodyDataTypes'

export type UnbodyDataTypeConfig<D = any, T = any, O = any, R = any> = {
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
    root?: R,
  ) => boolean

  transform: (
    helpers: UnbodyDataTypeConfigHelpers,
    object: D,
    original: O,
    root?: R,
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
  PodcastInfoDocument: 'PodcastInfoDocument',
} as const

export type UnbodyDataTypeKey =
  (typeof UnbodyDataTypeKeys)[keyof typeof UnbodyDataTypeKeys]

export const UnbodyDataTypeClasses = {
  Article: 'article',
  Podcast: 'podcast',
  Document: 'document',
  Search: 'search',
} as const

export type UnbodyDataTypeClass =
  (typeof UnbodyDataTypeClasses)[keyof typeof UnbodyDataTypeClasses]
