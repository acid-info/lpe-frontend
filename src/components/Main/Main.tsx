import { uiConfigs } from '@/configs/ui.configs'
import styled from '@emotion/styled'

export type MainProps = Partial<React.ComponentProps<typeof Container>> & {}

export const Main = ({
  spacing = 'default',
  children,
  ...props
}: MainProps) => {
  return (
    <Container spacing={spacing} {...props}>
      {children}
    </Container>
  )
}

const Container = styled.main<{
  spacing: 'default' | false
}>`
  margin-top: ${({ spacing }) =>
    spacing ? uiConfigs.postSectionMargin : uiConfigs.navbarRenderedHeight}px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${uiConfigs.maxContainerWidth}px) {
    padding: 0 16px;
  }

  @media (max-width: 768px) {
    margin-top: ${({ spacing }) =>
      spacing
        ? uiConfigs.postSectionMobileMargin
        : uiConfigs.navbarRenderedHeight}px;
  }
`

export default Main
