import styled from '@emotion/styled'

import { LPE } from '../../types/lpe.types'
import ArticleBlocks from './Article.Blocks'
import ArticleFooter from './Footer/Article.Footer'
import ArticleHeader from './Header/Article.Header'

interface Props {
  data: LPE.Article.Document
}

export default function ArticleBody({ data }: Props) {
  return (
    <ArticleContainer>
      <ArticleHeader {...data.data} />
      <ArticleBlocks data={data.data} />
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
