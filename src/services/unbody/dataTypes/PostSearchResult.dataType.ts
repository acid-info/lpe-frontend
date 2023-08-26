import { LPE } from '../../../types/lpe.types'
import { UnbodyHelpers } from '../unbody.helpers'
import { UnbodyResSearchGoogleDocData } from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const PostSearchResultDataType: UnbodyDataTypeConfig<
  UnbodyResSearchGoogleDocData,
  LPE.Search.ResultItem,
  UnbodyResSearchGoogleDocData,
  undefined,
  {
    query: string
    tags: string[]
    shows: LPE.Podcast.Show[]
  }
> = {
  key: 'PostSearchResultDocument',
  objectType: 'GoogleDoc',
  classes: ['article', 'episode', 'search'],

  isMatch: (helpers, data, original, root) =>
    data.__typename === 'GoogleDoc' && !root,

  transform: async (helpers, data, original, root, context) => {
    const { query = '', tags = [] } = context ?? {}

    const score =
      data.__typename === 'GoogleDoc'
        ? UnbodyHelpers.resolveScore(data._additional)
        : query.length > 0 || tags.length > 0
        ? data._additional.certainty
        : 0

    const transformers = helpers.dataTypes.get({ objectType: 'GoogleDoc' })
    const transformed = await helpers.dataTypes.transform<LPE.Post.Document>(
      transformers,
      data,
      undefined,
      { ...context },
    )

    return {
      score,
      data: transformed,
    }
  },
}
