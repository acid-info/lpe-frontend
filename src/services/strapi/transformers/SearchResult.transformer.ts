import { Transformer } from '../../../lib/TransformPipeline/types'
import { LPE } from '../../../types/lpe.types'
import { StrapiPostData } from '../strapi.types'

export const searchResultTransformer: Transformer<
  LPE.Post.Document,
  LPE.Search.ResultItemBase<LPE.Post.Document>,
  StrapiPostData & { score: number },
  undefined,
  undefined
> = {
  key: 'SearchResultTransformer',
  classes: ['post', 'search'],
  objectType: 'Post',
  isMatch: (helpers, object, original) =>
    [LPE.PostTypes.Article, LPE.PostTypes.Podcast].includes(object.type) &&
    typeof original.score !== 'undefined',
  transform: (helpers, data, original, root, ctx) => {
    return {
      data: data,
      type: data.type,
      score: original.score,
    }
  },
}
