import { LPE } from '../../../types/lpe.types'
import {
  UnbodyResGoogleDocData,
  UnbodyResImageBlockData,
} from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const ImageBlockDataType: UnbodyDataTypeConfig<
  UnbodyResImageBlockData,
  LPE.Article.ImageBlock,
  UnbodyResImageBlockData,
  UnbodyResGoogleDocData
> = {
  key: 'ImageBlock',
  objectType: 'ImageBlock',
  classes: ['article'],

  isMatch: (helpers, data, original, root) => data.__typename === 'ImageBlock',

  transform: (helpers, data, original, root) => {
    return {
      id: data?._additional?.id || `${data.order}`,
      type: 'image',
      alt: data.alt,
      url: data.url,
      height: data.height,
      order: data.order,
      width: data.width,
      labels: [],
    }
  },
}
