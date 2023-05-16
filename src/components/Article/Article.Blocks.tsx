import { getBodyBlocks } from '@/utils/data.utils'
import { RenderArticleBlock } from './Article.Block'
import { GoogleDocEnhanced } from '@/lib/unbody/unbody.types'
import { useIntersectionObserver } from '@/utils/ui.utils'
import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { useArticleContext } from '@/context/article.context'
import { useSearchBarContext } from '@/context/searchbar.context'

type Props = {
  data: GoogleDocEnhanced
}

const ArticleBlocks = ({ data }: Props) => {
  const { resultsNumber } = useSearchBarContext()
  const { data: searchResultBlocks = [] } = useArticleContext()
  const ids = searchResultBlocks?.map((block) => block.doc._additional.id)
  const { setTocId, tocId } = useArticleContainerContext()
  const headingElementsRef = useIntersectionObserver(setTocId)

  const renderBlocks =
    resultsNumber !== null
      ? getBodyBlocks(data)
          .filter((block) => ids?.includes(block._additional.id))
          .sort((a, b) => {
            const aIndex = ids?.indexOf(a._additional.id)
            const bIndex = ids?.indexOf(b._additional.id)
            return aIndex! - bIndex!
          })
      : getBodyBlocks(data)

  return data.blocks.length ? (
    <>
      {renderBlocks.map((block, idx) => (
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
