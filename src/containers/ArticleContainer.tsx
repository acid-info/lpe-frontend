import ArticleBody from '@/components/Article/Article.Body'
import { Grid, GridItem } from '@/components/Grid/Grid'
import { TableOfContents } from '@/components/TableOfContents'
import { ArticleContainerContext } from '@/containers/ArticleContainer.Context'
import styled from '@emotion/styled'
import { useState } from 'react'
import { LPE } from '../types/lpe.types'

interface Props {
  data: LPE.Article.Document
}

const ArticleContainer = (props: Props) => {
  const { data } = props
  const [tocId, setTocId] = useState<string | null>(null)

  return (
    <ArticleContainerContext.Provider value={{ tocId, setTocId }}>
      <ArticleGrid>
        <ArticleTocContainer className={'w-3'}>
          <TableOfContents contents={data.data.toc ?? []} />
        </ArticleTocContainer>
        <Gap className={'w-1'} />
        <ArticleBodyContainer className={'w-8'}>
          <ArticleBody data={data} />
        </ArticleBodyContainer>
      </ArticleGrid>
    </ArticleContainerContext.Provider>
  )
}

const ArticleBodyContainer = styled(GridItem)`
  @media (min-width: 768px) and (max-width: 1200px) {
    grid-column: span 10 !important;
  }
`

const ArticleTocContainer = styled(GridItem)`
  @media (min-width: 768px) and (max-width: 1200px) {
    grid-column: span 4 !important;
  }
`

const ArticleGrid = styled(Grid)`
  width: 100%;
  @media (min-width: 768px) and (max-width: 1200px) {
  }
`

const Gap = styled(GridItem)`
  @media (max-width: 550px) {
    display: none;
  }
`

export default ArticleContainer
