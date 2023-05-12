import { TableOfContents } from '@/components/TableOfContents'
import styled from '@emotion/styled'
import { useState } from 'react'
import { ArticleContainerContext } from '@/containers/ArticleContainer.Context'
import ArticleBody from '@/components/Article/Article.Body'
import { ArticlePostData } from '@/types/data.types'

interface Props {
  data: ArticlePostData
}

const ArticleContainer = (props: Props) => {
  const { data } = props
  const [tocIndex, setTocIndex] = useState(0)

  return (
    <Container>
      <ArticleContainerContext.Provider
        value={{ tocIndex: tocIndex, setTocIndex: setTocIndex }}
      >
        <TableOfContents contents={data.article.toc ?? []} />
        <ArticleBody data={data} />
        <Right />
      </ArticleContainerContext.Provider>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Right = styled.aside`
  width: 162px;
  // temporary breakpoint
  @media (max-width: 1024px) {
    display: none;
  }
`

export default ArticleContainer
