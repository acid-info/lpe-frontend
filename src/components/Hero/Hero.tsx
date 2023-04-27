import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

export default function Hero() {
  return (
    <Container>
      <Title genericFontFamily="serif" component="span" variant="h2">
        LOGOS →{' '}
        <Title
          style={{ whiteSpace: 'nowrap' }}
          genericFontFamily="serif"
          component="span"
          variant="h2"
        >
          PRESS ENGINE
        </Title>
      </Title>
      <Description component="div" variant="label2">
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
  }
`

const Title = styled(Typography)`
  // temporary breakpoint
  @media (min-width: 1440px) {
    padding-block: 16px;
    font-size: 90px;
  }
`

const Description = styled(Typography)`
  margin-top: 6px;
`
