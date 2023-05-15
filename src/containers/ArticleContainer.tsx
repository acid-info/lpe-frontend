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
      <Grid
        style={{
          width: '100%',
        }}
      >
        <GridItem className={'w-3'}>
          <TableOfContents contents={data.article.toc ?? []} />
        </GridItem>
        <Gap className={'w-1'} />
        <GridItem className={'w-8'}>
          <ArticleBody data={data} />
        </GridItem>
      </Grid>
    </ArticleContainerContext.Provider>
  )
}

const Gap = styled(GridItem)`
  @media (max-width: 550px) {
    display: none;
  }
`

export default ArticleContainer
