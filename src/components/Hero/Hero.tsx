import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

export default function Hero() {
  return (
    <Container>
      <Title genericFontFamily="serif" component="h1" variant="h1">
        LOGOS → PRESS ENGINE
      </Title>
      <Description component="div" variant="body1">
        Blog with media written by Logos members
      </Description>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 8px 16px;

  @media (max-width: 768px) {
    align-items: flex-start;
    text-align: left;
    gap: 6px;
  }
`

const Title = styled(Typography)`
  @media (min-width: 1440px) {
    font-size: 90px;
    line-height: 98px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
    line-height: 44px;
  }
`

const Description = styled(Typography)`
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 16px;
  }
`
