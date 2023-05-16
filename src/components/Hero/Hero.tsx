import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { uiConfigs } from '@/configs/ui.configs'
import { NavbarFiller } from '@/components/AppBar/NavbarFiller'
import { Searchbar } from '@/components/Searchbar'

export default function Hero() {
  return (
    <Container>
      <HeroText>
        <Title genericFontFamily="serif" component="h1" variant="h1">
          <span>LOGOS</span>
          <span> → </span>
          <span>PRESS ENGINE</span>
        </Title>
        <Description component="div" variant="body1">
          Blog with media written by Logos members
        </Description>
      </HeroText>
      <NavbarFiller />
    </Container>
  )
}

const Container = styled.div`
  border-bottom: 1px solid rgb(var(--lsd-theme-primary));
  @media (max-width: 768px) {
    .desktop {
      display: none;
    }
  }
`

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 8px 16px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`

const Title = styled(Typography)`
  @media (min-width: 1440px) {
    font-size: var(--lsd-display1-fontSize);
    line-height: var(--lsd-display1-lineHeight);
  }

  @media (max-width: 768px) {
    font-size: var(--lsd-h4-fontSize);
    line-height: var(--lsd-h4-lineHeight);
  }
`

const Description = styled(Typography)`
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 16px;
  }
`
