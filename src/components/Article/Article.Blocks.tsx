import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { useIntersectionObserver } from '@/utils/ui.utils'
import { useMemo } from 'react'
import { LPE } from '../../types/lpe.types'
import { RenderArticleBlock } from './Article.Block'

type Props = {
  data: LPE.Article.Data
}

const ArticleBlocks = ({ data }: Props) => {
  const { setTocId, tocId } = useArticleContainerContext()
  const headingElementsRef = useIntersectionObserver(setTocId)

  const blocks = useMemo(
    () =>
      data.content.filter(
        (b) =>
          b.labels.length === 0 ||
          b.labels.includes(LPE.Post.ContentBlockLabels.Embed),
      ),
    [data.content],
  )

  return blocks.length ? (
    <>
      {blocks.map((block, idx) => (
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
