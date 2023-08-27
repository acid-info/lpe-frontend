import { LPE } from '../../../types/lpe.types'
import { UnbodyHelpers } from '../unbody.helpers'
import {
  UnbodyResSearchGoogleDocData,
  UnbodyResSearchResultImageBlockData,
  UnbodyResSearchResultTextBlockData,
} from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const ArticleSearchResultItemDataType: UnbodyDataTypeConfig<
  | UnbodyResSearchGoogleDocData
  | UnbodyResSearchResultTextBlockData
  | UnbodyResSearchResultImageBlockData,
  LPE.Search.ResultItem,
  | UnbodyResSearchGoogleDocData
  | UnbodyResSearchResultTextBlockData
  | UnbodyResSearchResultImageBlockData,
  undefined,
  {
    query: string
    tags: string[]
    shows: LPE.Podcast.Show[]
  }
> = {
  key: 'ArticleSearchResultItem',
  objectType: 'GoogleDoc',
  classes: ['article', 'search'],

  isMatch: (helpers, data, original, root) =>
    data.__typename === 'GoogleDoc'
      ? !root &&
        (data.pathString.includes('/Articles/') ||
          data.pathString.includes('/Podcasts/'))
      : data.__typename === 'ImageBlock' || data.__typename === 'TextBlock',

  transform: async (helpers, data, original, root, context) => {
    const { query = '', tags = [] } = context ?? {}

    if (data.__typename === 'GoogleDoc') {
      const score = UnbodyHelpers.resolveScore(data._additional)

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
        type: transformed.type,
      }
    }

    const score =
      query.length > 0 || tags.length > 0
        ? UnbodyHelpers.resolveScore(data._additional)
        : 0

    const transformers = helpers.dataTypes.get({ objectType: 'GoogleDoc' })
    const document = await helpers.dataTypes.transform<LPE.Post.Document>(
      transformers,
      'document' in data && data.document?.[0],
      undefined,
      {
        ...context,
      },
    )

    const transformed = await helpers.dataTypes.transform<
      LPE.Post.ContentBlock<any>
    >(
      [
        helpers.dataTypes.getOne({
          objectType: 'TextBlock',
          classes: 'article',
        })!,
        helpers.dataTypes.getOne({
          objectType: 'ImageBlock',
          classes: 'article',
        })!,
      ],
      data,
    )

    return {
      score,
      data: { ...transformed, document } as any,
      type: transformed.type,
    }
  },
}
