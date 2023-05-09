import { Article } from '@/components/Article'
import { TableOfContents } from '@/components/TableOfContents'
import styled from '@emotion/styled'
import { useState } from 'react'
import { uiConfigs } from '@/configs/ui.configs'
import { ArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { UnbodyGoogleDoc } from '@/lib/unbody/unbody.types'

interface Props {
  data: UnbodyGoogleDoc
  error: string | null
}

const ArticleContainer = (props: Props) => {
  const { data, error } = props
  const [tocIndex, setTocIndex] = useState(0)

  return !error?.length ? (
    <Container>
      <ArticleContainerContext.Provider
        value={{ tocIndex: tocIndex, setTocIndex: setTocIndex }}
      >
        <TableOfContents contents={data.toc ?? []} />
        <Article data={data} />
        <Right />
      </ArticleContainerContext.Provider>
    </Container>
  ) : (
    <div>{error}</div>
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
