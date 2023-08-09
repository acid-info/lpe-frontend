import { LPE } from '../../../types/lpe.types'
import { UnbodyHelpers } from '../unbody.helpers'
import { ApiSearchResultItem } from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const ArticleSearchResultItemDataType: UnbodyDataTypeConfig<
  ApiSearchResultItem,
  {
    score: number
    doc: LPE.Article.ContentBlock | LPE.Article.Data
  },
  ApiSearchResultItem,
  {
    q: string
    tags: string[]
  }
> = {
  key: 'ArticleSearchResultItem',
  objectType: 'GoogleDoc',
  classes: ['article', 'search'],

  isMatch: (helpers, data) =>
    data.__typename === 'GoogleDoc'
      ? data.pathString.includes('/Articles/')
      : data.__typename === 'ImageBlock' || data.__typename === 'TextBlock',

  transform: async (helpers, data, original, root) => {
    const { q = '', tags = [] } = root ?? {}

    const score =
      data.__typename === 'GoogleDoc'
        ? UnbodyHelpers.resolveScore(data._additional)
        : q.length > 0 || tags.length > 0
        ? data._additional.certainty
        : 0

    if (data.__typename === 'GoogleDoc')
      return {
        score,
        doc: await helpers.dataTypes.transform(
          [helpers.dataTypes.getOne({ key: 'ArticleDocument' })!],
          data,
        ),
      }

    const document = helpers.dataTypes.transform(
      [helpers.dataTypes.getOne({ key: 'ArticleDocument' })!],
      'document' in data && data.document?.[0],
    )

    const doc = await helpers.dataTypes.transform(
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
      doc: {
        ...doc,
        document,
      },
    }
  },
}
