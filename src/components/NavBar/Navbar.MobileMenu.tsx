import styled from '@emotion/styled'
import { NavbarLinks } from '@/components/NavBar/Navbar.Links'
import { NavLinksItems } from '@/configs/data.configs'
import { uiConfigs } from '@/configs/ui.configs'
import { FooterOrgPanel } from '@/components/Footer/Footer.OrgPanel'
import { useThemeState } from '@/states/themeState'
import { ThemeSwitchWithLabel } from '@/components/ThemeSwitch/ThemeSwitch'
import { useEffect } from 'react'
import { SocialMediaKit } from './Navbar.SocialMediaKit'

interface Props {}

export const NavbarMobileMenu = (props: Props) => {
  const themeState = useThemeState()

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = 'auto'
    }
  }, [])

  return (
    <NavbarMobileMenuContainer>
      <InnerContainer>
        <NavbarLinks links={NavLinksItems} />
        <SocialAndThemeSwitchContainer>
          <SocialMediaKit />
          <ThemeSwitchWithLabel
            toggle={themeState.toggleMode}
            mode={themeState.get().mode}
          />
        </SocialAndThemeSwitchContainer>
        <FooterOrgPanel />
      </InnerContainer>
    </NavbarMobileMenuContainer>
  )
}

const NavbarMobileMenuContainer = styled.div`
  position: fixed;
  top: ${uiConfigs.navbarRenderedHeight - 1}px;
  left: 0;
  width: 100%;
  height: calc(100vh - ${uiConfigs.navbarRenderedHeight - 2}px);
  z-index: 100;
  background: rgb(var(--lsd-surface-primary));
  overflow-y: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm.width}px) {
    display: none;
  }
`

const InnerContainer = styled.div`
  height: 100%;
  width: calc(100% - 32px);
  margin: auto;

  display: flex;
  flex-direction: column;

  > * {
    margin-top: 16px;
  }
`

const ThemeSwitchContainer = styled.div`
  bottom: 16px;
  left: 16px;
  margin-top: 0;
  padding-bottom: 16px;
`

const SocialAndThemeSwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgb(var(--lsd-border-primary));
`
