import {
  GoogleDocCommonFragment,
  GoogleDocMentionsFragment,
  GoogleDocTocFragment,
  ImageBlockCommonFragment,
  SearchGoogleDocFragment,
  SearchImageBlockFragment,
  SearchTextBlockFragment,
  TextBlockCommonFragment,
} from '../../lib/unbody/unbody.generated'

export type UnbodyResTextBlockData = TextBlockCommonFragment
export type UnbodyResImageBlockData = ImageBlockCommonFragment
export type UnbodyResGoogleDocData = GoogleDocCommonFragment &
  GoogleDocMentionsFragment &
  GoogleDocTocFragment & {
    blocks: Array<UnbodyResTextBlockData | UnbodyResImageBlockData>
  }

export type UnbodyResRelatedPostData = GoogleDocCommonFragment &
  GoogleDocMentionsFragment

export type UnbodyResPostData = {
  data: UnbodyResGoogleDocData
  relatedArticles: UnbodyResRelatedPostData[]
  articlesFromSameAuthors: UnbodyResRelatedPostData[]
}

export type UnbodyResSearchGoogleDocData = SearchGoogleDocFragment
export type UnbodyResSearchResultTextBlockData = SearchTextBlockFragment
export type UnbodyResSearchResultImageBlockData = SearchImageBlockFragment

export type ApiSearchResultItem =
  | UnbodyResSearchGoogleDocData
  | UnbodyResSearchResultTextBlockData
  | UnbodyResSearchResultImageBlockData
