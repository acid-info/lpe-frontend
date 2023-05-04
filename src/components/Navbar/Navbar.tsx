import styled from '@emotion/styled'
import { IconButton, Typography } from '@acid-info/lsd-react'
import { LogosIcon } from '../Icons/LogosIcon'
import { SunIcon } from '../Icons/SunIcon'
import { MoonIcon } from '../Icons/MoonIcon'

interface NavbarProps {
  isDark: boolean
  toggle: () => void
}

export default function Navbar({ isDark, toggle }: NavbarProps) {
  return (
    <Container>
      <LogosIconContainer>
        <LogosIcon color="primary" />
      </LogosIconContainer>
      <Icons>
        <IconButton size="small" onClick={() => toggle()}>
          {isDark ? <SunIcon color="primary" /> : <MoonIcon color="primary" />}
        </IconButton>
        <Selector size="small">
          <Typography variant="label2">Aa</Typography>
        </Selector>
      </Icons>
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(var(--lsd-theme-primary));
  position: fixed;
  top: 0;
  width: calc(100% - 16px);
  background: rgb(var(--lsd-surface-primary));
  z-index: 100;
`

const LogosIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  @media (max-width: 768px) {
    margin-left: unset;
  }
`

const Icons = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`

const Selector = styled(IconButton)`
  border-left: none;
`
