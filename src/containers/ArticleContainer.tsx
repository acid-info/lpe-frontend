import { TableOfContents } from '@/components/TableOfContents'
import styled from '@emotion/styled'
import { useState } from 'react'
import { uiConfigs } from '@/configs/ui.configs'
import { ArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { UnbodyGoogleDoc } from '@/lib/unbody/unbody.types'
import ArticleBody from '@/components/Article/ArticleBody'

interface Props {
  data: UnbodyGoogleDoc
}

const ArticleContainer = (props: Props) => {
  const { data } = props
  const [tocIndex, setTocIndex] = useState(0)

  return (
    <Container>
      <ArticleContainerContext.Provider
        value={{ tocIndex: tocIndex, setTocIndex: setTocIndex }}
      >
        <TableOfContents contents={data.toc ?? []} />
        <ArticleBody data={data} />
        <Right />
      </ArticleContainerContext.Provider>
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
