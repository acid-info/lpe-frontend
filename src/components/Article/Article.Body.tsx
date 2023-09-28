import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import ArticleBlocks from './Article.Blocks'
import ArticleFooter from './Footer/Article.Footer'
import ArticleHeader from './Header/Article.Header'

interface Props {
  data: LPE.Article.Document
  header?: boolean
  footer?: boolean
}

export default function ArticleBody({
  data,
  header = true,
  footer = true,
}: Props) {
  return (
    <ArticleContainer>
      {header && <ArticleHeader {...data.data} />}
      <ArticleBlocks data={data.data} />
      {footer && <ArticleFooter data={data} />}
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
