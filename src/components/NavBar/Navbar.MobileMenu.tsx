import styled from '@emotion/styled'
import { NavbarLinks } from '@/components/NavBar/Navbar.Links'
import { NavLinksItems } from '@/configs/data.configs'
import { uiConfigs } from '@/configs/ui.configs'
import { FooterOrgPanel } from '@/components/Footer/Footer.OrgPanel'
import { useThemeState } from '@/states/themeState'
import { ThemeSwitchWithLabel } from '@/components/ThemeSwitch/ThemeSwitch'

interface Props {}

export const NavbarMobileMenu = (props: Props) => {
  const themeState = useThemeState()
  return (
    <NavbarMobileMenuContainer>
      <InnerContainer>
        <NavbarLinks links={NavLinksItems} />
        <FooterOrgPanel />
        <ThemeSwitchWithLabel
          toggle={themeState.toggleMode}
          mode={themeState.get().mode}
        />
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
`

const InnerContainer = styled.div`
  height: 100%;
  width: calc(100% - 32px);
  margin: auto;

  display: flex;
  flex-direction: column;

  > * {
    border-top: 1px solid rgb(var(--lsd-theme-primary));
    margin-top: 16px;
  }
`
