import styled from '@emotion/styled'

import { ArticlePostData } from '@/types/data.types'
import ArticleHeader from './Header/Article.Header'
import ArticleFooter from './Footer/Article.Footer'
import { MobileToc } from './Article.MobileToc'
import ArticleBlocks from './Article.Blocks'
import { useArticleContext } from '@/context/article.context'
import { useSearchBarContext } from '@/context/searchbar.context'
import { useEffect } from 'react'
import { TextBlockEnhanced, UnbodyImageBlock } from '@/lib/unbody/unbody.types'
import { Typography } from '@acid-info/lsd-react'

interface Props {
  data: ArticlePostData
}

export default function ArticleBody({ data }: Props) {
  const { resultsNumber, setResultsHelperText } = useSearchBarContext()
  const { data: searchResultBlocks = [] } = useArticleContext()

  useEffect(() => {
    if (resultsNumber !== null) {
      setResultsHelperText(data.article.title)
    }
  }, [resultsNumber, data.article.title, setResultsHelperText])

  const ids = searchResultBlocks?.map((block) => block.doc._additional.id)

  const blocks =
    resultsNumber !== null
      ? data.article.blocks.filter((block) =>
          ids?.includes(block._additional.id),
        )
      : data.article.blocks

  return (
    <ArticleContainer>
      {resultsNumber === null && <ArticleHeader {...data.article} />}
      {resultsNumber === null && <MobileToc toc={data.article.toc} />}
      <TextContainer>
        {/*@ts-ignore*/}
        <ArticleBlocks data={{ ...data.article, blocks }} />
        {resultsNumber === 0 && (
          <Typography variant="body1">No results found</Typography>
        )}
      </TextContainer>
      <ArticleFooter data={data} />
    </ArticleContainer>
  )
}

const ArticleContainer = styled.article`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 16px;
  max-width: 700px;
  margin-inline: 5%;
  padding-bottom: 80px;

  // temporary breakpoint
  @media (max-width: 1024px) {
    margin-inline: 16px;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  margin-bottom: 80px;
`
