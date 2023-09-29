import ArticleBody from '@/components/Article/Article.Body'
import { Grid, GridItem } from '@/components/Grid/Grid'
import { ArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { TableOfContents } from '../components/TableOfContents'
import { LPE } from '../types/lpe.types'
import { lsdUtils } from '../utils/lsd.utils'
import { PostSearchContainer } from './PostSearchContainer'
import { PostSearchContext } from './PostSearchContainer/PostSearch.context'

interface Props {
  data: LPE.Article.Document
}

const ArticleContainer = (props: Props) => {
  const { data } = props
  const [tocId, setTocId] = useState<string | null>(null)

  return (
    <PostSearchContainer postId={data.data.id} postTitle={data.data.title}>
      <PostSearchContext.Consumer>
        {(search) => (
          <ArticleContainerContext.Provider value={{ tocId, setTocId }}>
            <ArticleGrid searchMode={search.active}>
              <ArticleTocContainer className={'w-3'}>
                {!search.active && (
                  <TableOfContents contents={data.data.toc ?? []} />
                )}
              </ArticleTocContainer>
              <Gap className={'w-1'} />
              <ArticleBodyContainer className={'w-8'}>
                <ArticleBody
                  data={data}
                  header={!search.active}
                  footer={!search.active}
                />
              </ArticleBodyContainer>
            </ArticleGrid>
          </ArticleContainerContext.Provider>
        )}
      </PostSearchContext.Consumer>
    </PostSearchContainer>
  )
}

const ArticleGrid = styled(Grid)<{ searchMode?: boolean }>`
  width: 100%;

  ${(props) =>
    props.searchMode &&
    css`
      padding-top: 90px;
      min-height: 100vh;
    `}
`

const ArticleBodyContainer = styled(GridItem)`
  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'between', 'lg')} {
    grid-column: span 10 !important;
  }
`

const ArticleTocContainer = styled(GridItem)`
  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'between', 'lg')} {
    grid-column: span 4 !important;
  }
`

const Gap = styled(GridItem)`
  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    display: none;
  }
`

export default ArticleContainer
