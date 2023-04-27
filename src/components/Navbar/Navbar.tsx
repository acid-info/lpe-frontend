import styled from '@emotion/styled'
import { LogosIcon } from '../icons/LogosIcon'
import { IconButton, Typography } from '@acid-info/lsd-react'
import { MoonIcon } from '../icons/MoonIcon'
import { SunIcon } from '../icons/SunIcon'

interface NavbarProps {
  isDark: boolean
  toggle: () => void
}

export default function Navbar({ isDark, toggle }: NavbarProps) {
  return (
    <Container>
      <LogosIcon color="primary" />
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

const Icons = styled.div`
  display: flex;
  align-items: center;
`

const Selector = styled(IconButton)`
  border-left: none;
`
