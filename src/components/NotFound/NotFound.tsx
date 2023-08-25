import { uiConfigs } from '@/configs/ui.configs'
import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'

const NotFound = () => {
  return (
    <Container>
      <Title genericFontFamily="serif" variant="h3">
        Page not found
      </Title>
      <Description variant="body1">
        Sorry, the page you are looking for doesn’t exist or has been moved.
        <br />
        Try searching our site.
      </Description>
      <Link href="/search">
        <SearchButton size="large">Go to search</SearchButton>
      </Link>
    </Container>
  )
}

export default NotFound

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: calc(120px + ${uiConfigs.navbarRenderedHeight}px);
`

const Title = styled(Typography)`
  margin-bottom: 16px;
`

const Description = styled(Typography)`
  margin-bottom: 48px;
  max-width: 510px;
  text-align: center;
`

const SearchButton = styled(Button)`
  width: fit-content;
`
