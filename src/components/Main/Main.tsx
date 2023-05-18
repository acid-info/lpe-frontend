import styled from '@emotion/styled'
import { breakpoints, uiConfigs } from '@/configs/ui.configs'
import { PropsWithChildren } from 'react'

const Main = ({ children, ...props }: PropsWithChildren<any>) => {
  return <Container {...props}>{children}</Container>
}

const Container = styled.main`
  margin-top: ${uiConfigs.postSectionMargin}px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${uiConfigs.maxContainerWidth}px) {
    padding: 0 16px;
  }

  @media (max-width: ${breakpoints.mobile}px) {
    margin-top: ${uiConfigs.postSectionMobileMargin}px;
  }
`

export default Main
