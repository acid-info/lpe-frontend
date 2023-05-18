import styled from '@emotion/styled'

import { ArticlePostData } from '@/types/data.types'
import ArticleHeader from './Header/Article.Header'
import ArticleFooter from './Footer/Article.Footer'
import ArticleBlocks from './Article.Blocks'
import { useSearchBarContext } from '@/context/searchbar.context'
import { useEffect } from 'react'
import { Typography } from '@acid-info/lsd-react'
import { breakpoints } from '@/configs/ui.configs'

interface Props {
  data: ArticlePostData
}

export default function ArticleBody({ data }: Props) {
  const { resultsNumber, setResultsHelperText } = useSearchBarContext()

  useEffect(() => {
    if (resultsNumber !== null) {
      setResultsHelperText(data.article.title)
    }
  }, [resultsNumber, data.article.title, setResultsHelperText])

  return (
    <ArticleContainer>
      {resultsNumber === null && <ArticleHeader {...data.article} />}
      <ArticleBlocks data={data.article} />
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

  @media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.desktop}px) {
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 80px;
`
