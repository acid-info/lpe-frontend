import { LPE } from '@/types/lpe.types'

export const searchBlocksBasicFilter = (
  block: LPE.Search.ResultItemBase<LPE.Post.ContentBlock>,
) => {
  const isLongEnough = (b: LPE.Post.TextBlock) => {
    return b.text.length > 60
  }

  if (block.type === LPE.ContentTypes.Text) {
    return (
      isLongEnough(block.data as LPE.Post.TextBlock) &&
      !block.data.labels.includes('link_only')
    )
  }

  return true
}
