import { getBodyBlocks } from '@/utils/data.utils'
import { RenderArticleBlock } from './Article.Block'
import { ArticlePostData } from '@/types/data.types'
import {
  GoogleDocEnhanced,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'
import { useState } from 'react'
import { useIntersectionObserver } from '@/utils/ui.utils'
import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'

type Props = {
  data: GoogleDocEnhanced
}

const ArticleBlocks = ({ data }: Props) => {
  const { setTocId, tocId } = useArticleContainerContext()
  const headingElementsRef = useIntersectionObserver(setTocId)

  return data.blocks.length ? (
    <>
      {getBodyBlocks(data).map((block, idx) => (
        <RenderArticleBlock
          key={'block-' + idx}
          block={block}
          activeId={tocId}
          headingElementsRef={headingElementsRef}
        />
      ))}
    </>
  ) : null
}

export default ArticleBlocks
