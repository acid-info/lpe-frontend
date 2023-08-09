import { ArticleBlocksOrders } from '../../../configs/data.configs'
import { LPE } from '../../../types/lpe.types'
import {
  UnbodyResGoogleDocData,
  UnbodyResImageBlockData,
} from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const ArticleImageBlockDataType: UnbodyDataTypeConfig<
  LPE.Article.ImageBlock,
  LPE.Article.ImageBlock,
  UnbodyResImageBlockData,
  UnbodyResGoogleDocData
> = {
  key: 'ArticleImageBlock',
  objectType: 'ImageBlock',
  classes: ['article'],

  isMatch: (helpers, data, original, root) => data.type === 'image',

  transform: (helpers, data, original, root) => {
    if (!root) return data

    if (data.order === ArticleBlocksOrders.cover)
      return {
        ...data,
        labels: [...data.labels, LPE.Article.ContentBlockLabels.CoverImage],
      }

    return data
  },
}
