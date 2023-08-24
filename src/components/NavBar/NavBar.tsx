import { NavbarLinks } from '@/components/NavBar/Navbar.Links'
import { NavbarMobileMenu } from '@/components/NavBar/Navbar.MobileMenu'
import { ThemeSwitch } from '@/components/ThemeSwitch/ThemeSwitch'
import { NavLinksItems } from '@/configs/data.configs'
import { uiConfigs } from '@/configs/ui.configs'
import { useThemeState } from '@/states/themeState'
import { useScrollDirection } from '@/utils/ui.utils'
import { IconButton, MenuIcon, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NavbarState, useNavbarState } from '../../states/navbarState'
import { LogosIcon } from '../Icons/LogosIcon'

export interface NavBarProps {
  defaultState?: Partial<NavbarState>
}

export default function NavBar({ defaultState }: NavBarProps) {
  const state = useNavbarState(defaultState)
  const themeState = useThemeState()
  const { pathname } = useRouter()
  const isSearchPage = pathname === '/search'
  const [hide, setHide] = useState(false)
  const scrollDirection = useScrollDirection()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const className = pathname.split('/')[1] + '_page'

  const onSearchIconClick = () => {}

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  useEffect(() => {
    defaultState && state.state.set((value) => ({ ...value, ...defaultState }))
  }, [defaultState])

  return (
    <Container className={`${hide ? 'hide' : ''} ${className}`}>
      <NavBarContainer bordered={state.showTitle.get()}>
        <LeftContainer href={'/'}>
          <LogosIcon color="primary" />
          {state.showTitle.get() && (
            <PressLogoType variant={'h6'} genericFontFamily={'serif'}>
              {state.title.get()}
            </PressLogoType>
          )}
        </LeftContainer>
        <NavLinksContainer>
          <NavbarLinks links={NavLinksItems} />
        </NavLinksContainer>
        <ControlsContainer>
          <div className={'theme-switch'}>
            <ThemeSwitch
              toggle={themeState.toggleMode}
              mode={themeState.get().mode}
            />
          </div>
          <div className={'menu-button'}>
            <IconButton size={'small'} onClick={toggleMobileMenu}>
              <MenuIcon color={'primary'} />
            </IconButton>
          </div>
          {/*<IconButton*/}
          {/*    className={'searchIcon searchIconHome'}*/}
          {/*    size="small"*/}
          {/*    onClick={() => onSearchIconClick()}*/}
          {/*>*/}
          {/*    <SearchIcon color="primary"/>*/}
          {/*</IconButton>*/}
        </ControlsContainer>
        {showMobileMenu && <NavbarMobileMenu />}
      </NavBarContainer>
      {/*<MobileSearchContainer*/}
      {/*  className={`searchBar ${hideSearch ? 'hide' : ''}`}*/}
      {/*>*/}
      {/*  <Searchbar*/}
      {/*    className={'mobile'}*/}
      {/*    onSearch={onSearch}*/}
      {/*    onReset={onReset}*/}
      {/*    withFilterTags={isSearchPage}*/}
      {/*  />*/}
      {/*</MobileSearchContainer>*/}
    </Container>
  )
}

const PressLogoType = styled(Typography)``

const Container = styled.header`
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

const NavBarContainer = styled.nav<{
  bordered?: boolean
}>`
  display: flex;
  padding: 8px 0;
  align-items: center;
  justify-content: space-between;
  position: relative;

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
`

const NavLinksContainer = styled.div`
  flex: 1;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm.width}px) {
    display: none !important;
  }
`

const LeftContainer = styled(Link)`
  flex: 0 0 auto;
  text-decoration: none;
  position: absolute;
  left: 0;
  display: flex;

  @media (max-width: 768px) {
    position: relative;
  }
`

const ControlsContainer = styled.div`
  .theme-switch {
    display: block;
  }

  .menu-button {
    display: none;
  }

  @media (max-width: 768px) {
    .theme-switch {
      // hide theme switch
      display: none;
    }

    .menu-button {
      display: block;
    }
  }
`