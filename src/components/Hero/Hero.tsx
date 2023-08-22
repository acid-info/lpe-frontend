import { NavbarFiller } from '@/components/NavBar/NavbarFiller'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useEffect, useRef } from 'react'
import { useWindowScroll } from 'react-use'
import { uiConfigs } from '../../configs/ui.configs'
import { useNavbarState } from '../../states/navbarState'

export type HeroProps = Partial<React.ComponentProps<typeof Container>> & {
  tags?: string[]
}

export const Hero: React.FC<HeroProps> = ({ tags = [], ...props }) => {
  const ref = useRef<HTMLElement>(null)
  const scroll = useWindowScroll()
  const navbarState = useNavbarState()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    if (rect.bottom - uiConfigs.navbarRenderedHeight > 0) {
      navbarState.showTitle.get() && navbarState.setShowTitle(false)
    } else {
      !navbarState.showTitle.get() && navbarState.setShowTitle(true)
    }
  }, [scroll.y, navbarState])

  return (
    <Container {...props}>
      <Title genericFontFamily="serif" component="h1" variant="display2">
        <span>LOGOS</span>
        <span> → </span>
        <span ref={ref}>PRESS ENGINE</span>
      </Title>
      <Description component="div" variant="subtitle1">
        Your Guide to Network States and the technology driving Sovereign
        Communities
      </Description>
      <NavbarFiller tags={tags} className="navbar__filter" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
  align-items: center;

  padding: 24px 16px 40px 16px;
  border-bottom: 1px solid rgb(var(--lsd-border-primary));

  .navbar__filter {
    margin-top: 24px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md.width}px) {
    padding: 8px 16px 16px;
  }
`

const Title = styled(Typography)`
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.md.width}px) {
    font-size: var(--lsd-h4-fontSize) !important;
    font-weight: var(--lsd-h4-fontWeight) !important;
    line-height: var(--lsd-h4-lineHeight) !important;
  }
`

const Description = styled(Typography)`
  text-align: center;
  max-width: 407px;

  @media (max-width: ${(props) => props.theme.breakpoints.md.width}px) {
    font-size: 12px !important;
    font-weight: 400 !important;
    line-height: 16px !important;
  }
`
