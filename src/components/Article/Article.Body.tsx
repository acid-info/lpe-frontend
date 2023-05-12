import styled from '@emotion/styled'

import { ArticlePostData } from '@/types/data.types'
import ArticleHeader from './Header/Article.Header'
import ArticleFooter from './Footer/Article.Footer'
import { MobileToc } from './Article.MobileToc'
import ArticleBlocks from './Article.Blocks'

interface Props {
  data: ArticlePostData
}

export default function ArticleBody({ data }: Props) {
  return (
    <ArticleContainer>
      <ArticleHeader {...data.article} />
      <MobileToc toc={data.article.toc} />
      <TextContainer>
        <ArticleBlocks data={data} />
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
