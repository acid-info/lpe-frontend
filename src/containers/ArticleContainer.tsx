import { TableOfContents } from '@/components/TableOfContents'
import styled from '@emotion/styled'
import { useState } from 'react'
import { ArticleContainerContext } from '@/containers/ArticleContainer.Context'
import ArticleBody from '@/components/Article/Article.Body'
import { ArticlePostData } from '@/types/data.types'
import { useArticleContext } from '@/context/article.context'
import { Grid, GridItem } from '@/components/Grid/Grid'

interface Props {
  data: ArticlePostData
}

const ArticleContainer = (props: Props) => {
  const { data } = props
  const [tocId, setTocId] = useState<string | null>(null)

  return (
    <ArticleContainerContext.Provider value={{ tocId, setTocId }}>
      <ArticleGrid>
        <ArticleTocContainer className={'w-3'}>
          <TableOfContents contents={data.article.toc ?? []} />
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
