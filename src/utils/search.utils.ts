import { LPE } from '@/types/lpe.types'

export const searchBlocksBasicFilter = (
  block: LPE.Search.ResultItemBase<LPE.Post.ContentBlock>,
) => {
  const isTitle = (b: LPE.Post.TextBlock) => {
    return b.classNames.includes('title')
  }
  const isLongEnough = (b: LPE.Post.TextBlock) => {
    return b.text.length > 60
  }

  if (block.type === LPE.ContentTypes.Text) {
    return (
      !isTitle(block.data as LPE.Post.TextBlock) &&
      isLongEnough(block.data as LPE.Post.TextBlock)
    )
  } else {
    //   is an image
    const isPodcastImage = block.data.document.type === LPE.PostTypes.Podcast
    return !isPodcastImage
  }
}
