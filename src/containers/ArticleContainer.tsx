import { Article } from '@/components/Article'
import { TableOfContents } from '@/components/TableOfContents'
import { ArticleProps } from '@/pages/article/[slug]'
import styled from '@emotion/styled'
import { useState } from 'react'
import { uiConfigs } from '@/configs/ui.configs'
import { ArticleContainerContext } from '@/containers/ArticleContainer.Context'

const ArticleContainer = (props: ArticleProps) => {
  const { post } = props
  const [tocIndex, setTocIndex] = useState(0)

  return (
    <Container>
      {typeof post !== 'undefined' ? (
        <ArticleContainerContext.Provider
          value={{ tocIndex: tocIndex, setTocIndex: setTocIndex }}
        >
          <TableOfContents contents={post.toc ?? []} />
          <Article data={post} />
          <Right />
        </ArticleContainerContext.Provider>
      ) : (
        <div style={{ marginTop: '108px', textAlign: 'center' }}>
          <h3>Loading</h3>
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${uiConfigs.postMarginTop}px;
`

const Right = styled.aside`
  width: 162px;
  // temporary breakpoint
  @media (max-width: 1024px) {
    display: none;
  }
`

export default ArticleContainer
