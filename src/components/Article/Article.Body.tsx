import styled from '@emotion/styled'

import { useSearchBarContext } from '@/context/searchbar.context'
import { Typography } from '@acid-info/lsd-react'
import { useEffect } from 'react'
import { LPE } from '../../types/lpe.types'
import ArticleBlocks from './Article.Blocks'
import ArticleFooter from './Footer/Article.Footer'
import ArticleHeader from './Header/Article.Header'

interface Props {
  data: LPE.Article.Document
}

export default function ArticleBody({ data }: Props) {
  const { resultsNumber, setResultsHelperText } = useSearchBarContext()

  useEffect(() => {
    if (resultsNumber !== null) {
      setResultsHelperText(data.data.title)
    }
  }, [resultsNumber, data.data.title, setResultsHelperText])

  return (
    <ArticleContainer>
      {resultsNumber === null && <ArticleHeader {...data.data} />}
      <ArticleBlocks data={data.data} />
      {resultsNumber === 0 && (
        <Typography variant="body1">No results found</Typography>
      )}
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
  padding-bottom: 80px;

  @media (min-width: 768px) and (max-width: 1200px) {
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 80px;
`
