import styled from '@emotion/styled'
import { uiConfigs } from '@/configs/ui.configs'
import { PropsWithChildren } from 'react'

const Main = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>
}

const Container = styled.main`
  margin-block: ${uiConfigs.postSectionMargin}px;
  margin-left: auto;
  margin-right: auto;
`

export default Main
