import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { useArticleContext } from '@/context/article.context'
import { useSearchBarContext } from '@/context/searchbar.context'
import { useIntersectionObserver } from '@/utils/ui.utils'
import { useMemo } from 'react'
import { SearchResultsItemTypes } from '../../types/data.types'
import { LPE } from '../../types/lpe.types'
import { RenderArticleBlock } from './Article.Block'

type Props = {
  data: LPE.Article.Data
}

const ArticleBlocks = ({ data }: Props) => {
  const { resultsNumber } = useSearchBarContext()
  const { data: searchResultBlocks = [] } = useArticleContext()
  const ids = searchResultBlocks?.map(
    (block) => (block as SearchResultsItemTypes).doc.id,
  )
  const { setTocId, tocId } = useArticleContainerContext()
  const headingElementsRef = useIntersectionObserver(setTocId)

  const blocks = useMemo(
    () => data.content.filter((b) => b.labels.length === 0),
    [data.content],
  )

  const renderBlocks =
    resultsNumber !== null
      ? blocks
          .filter((block) => ids?.includes(block.id))
          .sort((a, b) => {
            const aIndex = ids?.indexOf(a.id)
            const bIndex = ids?.indexOf(b.id)
            return aIndex! - bIndex!
          })
      : blocks

  return renderBlocks.length ? (
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
