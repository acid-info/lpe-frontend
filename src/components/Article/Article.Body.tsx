import styled from '@emotion/styled'

import { ArticlePostData } from '@/types/data.types'
import ArticleHeader from './Header/Article.Header'
import ArticleFooter from './Footer/Article.Footer'
import { MobileToc } from './Article.MobileToc'
import ArticleBlocks from './Article.Blocks'
import { useArticleContext } from '@/context/article.context'
import { useSearchBarContext } from '@/context/searchbar.context'
import { useEffect, useState } from 'react'
import { TextBlockEnhanced, UnbodyImageBlock } from '@/lib/unbody/unbody.types'
import { Typography } from '@acid-info/lsd-react'
import articleBlocks from './Article.Blocks'

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
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 80px;
`
