import { NavbarLinks } from '@/components/NavBar/Navbar.Links'
import { NavbarMobileMenu } from '@/components/NavBar/Navbar.MobileMenu'
import { SocialMediaKit } from '@/components/NavBar/Navbar.SocialMediaKit'
import { ThemeSwitch } from '@/components/ThemeSwitch/ThemeSwitch'
import { NavLinksItems } from '@/configs/data.configs'
import { uiConfigs } from '@/configs/ui.configs'
import { useThemeState } from '@/states/themeState'
import {
  CloseIcon,
  IconButton,
  MenuIcon,
  SearchIcon,
  Typography,
} from '@acid-info/lsd-react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NavbarState, useNavbarState } from '../../states/navbarState'
import { lsdUtils } from '../../utils/lsd.utils'
import { LogosIcon } from '../Icons/LogosIcon'
import { SubscribeButton } from '../SubscribeButton'

export interface NavBarProps {
  defaultState?: Partial<NavbarState>
}

export default function NavBar({ defaultState }: NavBarProps) {
  const state = useNavbarState(defaultState)
  const themeState = useThemeState()
  const { pathname } = useRouter()
  const [hide, setHide] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const className = pathname.split('/')[1] + '_page'

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  useEffect(() => {
    setShowMobileMenu(false)
  }, [pathname])

  useEffect(() => {
    defaultState && state.state.set((value) => ({ ...value, ...defaultState }))
  }, [defaultState])

  const searchButton =
    state.showSearchButton.get() &&
    (!!state.onSearch ? (
      <IconButton size={'small'} onClick={() => state.onSearch!()}>
        <SearchIcon color={'primary'} />
      </IconButton>
    ) : (
      <Link href={'/search'}>
        <IconButton size={'small'}>
          <SearchIcon color={'primary'} />
        </IconButton>
      </Link>
    ))

  const buttons = (
    <>
      <SubscribeButton />
      <Buttons>
        <ThemeSwitch
          toggle={themeState.toggleMode}
          mode={themeState.get().mode}
        />
        {searchButton}
      </Buttons>
      <Buttons mobile>
        {searchButton}

        <IconButton size={'small'} onClick={toggleMobileMenu}>
          {showMobileMenu ? (
            <CloseIcon color="primary" />
          ) : (
            <MenuIcon color={'primary'} />
          )}
        </IconButton>
      </Buttons>
    </>
  )

  return (
    <Container className={`${hide ? 'hide' : ''} ${className}`}>
      <NavBarContainer bordered={state.showTitle.get()}>
        <LeftContainer href={'/'}>
          <LogosIcon color="primary" />
          <PressLogoType
            variant={'h6'}
            genericFontFamily={'serif'}
            display={state.showTitle.get() || showMobileMenu}
          >
            {state.title.get()}
          </PressLogoType>
        </LeftContainer>
        <NavLinksContainer>
          <NavbarLinks links={NavLinksItems} />
        </NavLinksContainer>
        <ControlsContainer>
          <SocialMediaKitContainer>
            <SocialMediaKit />
          </SocialMediaKitContainer>
          {buttons}
        </ControlsContainer>
        {showMobileMenu && <NavbarMobileMenu />}
      </NavBarContainer>
    </Container>
  )
}

export const PressLogoType = styled(Typography)<{ display: boolean }>`
  text-transform: uppercase;
  ${(props) =>
    !props.display &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
`

const SocialMediaKitContainer = styled.div`
  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    display: none;
  }
`

const Container = styled.header<{
  bordered?: boolean
}>`
  width: 100%;
  height: 44px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;

  background: rgb(var(--lsd-surface-primary));
  transition: top 0.2s;

  &.article_page,
  &.search_page {
  }
`

const Buttons = styled.div<{ mobile?: boolean }>`
  display: none;
  align-items: center;
  justify-content: center;

  > * {
    background: rgb(var(--lsd-surface-primary));

    :last-of-type {
      margin-left: -1px;
    }
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
    ${(props) => props.mobile && `display: flex;`}
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'up')} {
    ${(props) => !props.mobile && `display: flex;`}
  }
`
const NavBarContainer = styled.nav<{
  bordered?: boolean
}>`
  display: flex;
  padding: 16px 0;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 100%;
  border-bottom: ${(props) => (props.bordered ? '1px' : '0px')} solid
    rgb(var(--lsd-theme-primary));

  margin: auto;

  top: 0;
  width: calc(100% - 32px);
  max-width: ${uiConfigs.maxContainerWidth}px;
  box-sizing: border-box;

  > * {
    display: flex;
    align-items: center;
  }

  style {
    display: none !important;
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
    border-bottom: 1px solid rgb(var(--lsd-theme-primary));
  }
`

const NavLinksContainer = styled.div`
  flex: 1;
  justify-content: center;

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    display: none !important;
  }
`

const LeftContainer = styled(Link)`
  flex: 0 0 auto;
  text-decoration: none;
  position: absolute;
  left: 0;
  display: flex;

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    position: relative;
  }
`

const ControlsContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  gap: 24px;

  .theme-switch {
    display: block;
  }

  .menu-button {
    display: none;
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    .theme-switch {
      // hide theme switch
      display: none;
    }

    .menu-button {
      display: block;
    }
  }
`
