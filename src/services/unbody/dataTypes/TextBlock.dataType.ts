import { LPE } from '../../../types/lpe.types'
import { UnbodyResGoogleDocData, UnbodyResTextBlockData } from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const TextBlockDataType: UnbodyDataTypeConfig<
  UnbodyResTextBlockData,
  LPE.Article.TextBlock,
  UnbodyResTextBlockData,
  UnbodyResGoogleDocData
> = {
  key: 'TextBlock',
  objectType: 'TextBlock',
  classes: ['article'],

  isMatch: (helpers, data, original, root) => data.__typename === 'TextBlock',

  transform: (helpers, data, original, root) => {
    return {
      id: data?._additional?.id || `${data.order}`,
      type: 'text',
      html: data.html,
      text: data.text || '',
      classNames: data.classNames,
      footnotes: data.footnotesObj,
      order: data.order,
      tagName: data.tagName,
      labels: [],
    }
  },
}
