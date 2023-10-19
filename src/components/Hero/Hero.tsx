import { HeroTags } from '@/components/Hero/Hero.tags'
import { copyConfigs } from '@/configs/copy.configs'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useEffect, useRef } from 'react'
import { useWindowScroll } from 'react-use'
import { uiConfigs } from '../../configs/ui.configs'
import { useNavbarState } from '../../states/navbarState'
import { lsdUtils } from '../../utils/lsd.utils'

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
        <span>{copyConfigs.site.heroTitle[0]}</span>
        <span>{copyConfigs.site.heroTitle[1]}</span>
        <span ref={ref}>{copyConfigs.site.heroTitle[2]}</span>
      </Title>
      <Description component="div" variant="subtitle1">
        {copyConfigs.site.description}
      </Description>
      <HeroTags tags={tags} />
      <Border />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
  align-items: center;

  position: relative;
  padding: 24px 16px 40px 16px;

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'down')} {
    padding: 8px 0 16px 0;
  }
`

const Title = styled(Typography)`
  text-align: center;
  text-transform: uppercase;
  padding: 0 var(--main-content-padding);

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'down')} {
    font-size: var(--lsd-h4-fontSize) !important;
    font-weight: var(--lsd-h4-fontWeight) !important;
    line-height: var(--lsd-h4-lineHeight) !important;
  }
`

const Description = styled(Typography)`
  text-align: center;
  max-width: 407px;
  text-transform: capitalize;
  padding: 0 var(--main-content-padding);

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'down')} {
    font-size: 12px !important;
    font-weight: 400 !important;
    line-height: 16px !important;
  }
`

const Border = styled.div`
  line-height: 0;
  height: 0;
  width: 100%;
  position: absolute;
  left: 0px;
  bottom: 0;
  border-bottom: 1px solid rgb(var(--lsd-border-primary));

  @media (max-width: ${uiConfigs.maxContainerWidth}px) {
    width: calc(100% - 2 * var(--main-content-padding));
    left: var(--main-content-padding);
  }
`
