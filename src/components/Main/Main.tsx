import { uiConfigs } from '@/configs/ui.configs'
import styled from '@emotion/styled'

export type MainProps = Partial<React.ComponentProps<typeof Container>> & {}

export const Main = ({
  spacing = 'default',
  contentPadding = 'default',
  children,
  ...props
}: MainProps) => {
  return (
    <Container spacing={spacing} contentPadding={contentPadding} {...props}>
      {children}
    </Container>
  )
}

const Container = styled.main<{
  spacing: 'default' | boolean
  contentPadding: 'default' | boolean
}>`
  --main-margin-top: ${(props) =>
    props.spacing
      ? uiConfigs.postSectionMargin + uiConfigs.navbarRenderedHeight
      : uiConfigs.navbarRenderedHeight}px;
  --main-content-padding: 16px;

  margin-top: var(--main-margin-top);
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${uiConfigs.maxContainerWidth}px) {
    padding: 0
      ${(props) => (props.contentPadding ? `var(--main-content-padding)` : '0')};
  }

  @media (max-width: 768px) {
    --main-margin-top: ${({ spacing }) =>
      spacing
        ? uiConfigs.postSectionMobileMargin
        : uiConfigs.navbarRenderedHeight}px;
  }
`

export default Main
