import styled from '@emotion/styled'
import { CloseIcon, IconButton, SearchIcon } from '@acid-info/lsd-react'
import { LogosIcon } from '../Icons/LogosIcon'
import { SunIcon } from '../Icons/SunIcon'
import { MoonIcon } from '../Icons/MoonIcon'
import { uiConfigs } from '@/configs/ui.configs'
import Link from 'next/link'
import styles from '@/components/Searchbar/Search.module.css'
import React, { useEffect, useState } from 'react'
import { Searchbar } from '@/components/Searchbar'
import { useScrollDirection } from '@/utils/ui.utils'
import { useRouter } from 'next/router'
import { useSearchBarContext } from '@/context/searchbar.context'

interface NavbarProps {
  isDark: boolean
  toggle: () => void
  onSearch?: (query: string, tags: string[]) => void
  onReset?: () => void
}

export default function Navbar({
  isDark,
  toggle,
  onReset,
  onSearch,
}: NavbarProps) {
  const { resultsNumber } = useSearchBarContext()
  const { pathname } = useRouter()
  const isSearchPage = pathname === '/search'

  const [hideSearch, setHideSearch] = useState(
    resultsNumber === null && !isSearchPage,
  )
  const [hide, setHide] = useState(false)
  const scrollDirection = useScrollDirection()
  const onSearchIconClick = () => {
    setHideSearch(!hideSearch)
  }

  useEffect(() => {
    if (scrollDirection) {
      setHide(scrollDirection === 'down')
      if (!hideSearch && resultsNumber === null) {
        setHideSearch(scrollDirection === 'down')
      }
    }
    setHideSearch(resultsNumber === null)
  }, [scrollDirection, resultsNumber])

  const className = pathname.split('/')[1] + '_page'

  return (
    <Container className={`${hide ? 'hide' : ''} ${className}`}>
      <AppBar>
        <LogosIconContainer href={'/'}>
          <LogosIcon color="primary" />
        </LogosIconContainer>
        <Icons>
          <IconButton size="small" onClick={() => toggle()}>
            {isDark ? (
              <SunIcon color="primary" />
            ) : (
              <MoonIcon color="primary" />
            )}
          </IconButton>
          <IconButton
            className={'searchIcon searchIconHome'}
            size="small"
            onClick={() => onSearchIconClick()}
          >
            <SearchIcon />
          </IconButton>
        </Icons>
      </AppBar>
      <MobileSearchContainer
        className={`searchBar ${hideSearch ? 'hide' : ''}`}
      >
        <Searchbar
          className={'mobile'}
          onSearch={onSearch}
          onReset={onReset}
          withFilterTags={isSearchPage}
        />
      </MobileSearchContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  transition: top 0.2s;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;

  &._page {
    @media (min-width: 768px) {
      .searchBar {
        display: none;
      }
    }
    .searchIconHome {
      display: none;
    }
  }

  &.article_page,
  &.search_page {
  }

  @media (max-width: 768px) {
    &.hide {
      top: -44px;
    }
  }

  > * {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const MobileSearchContainer = styled.div`
  width: 100%;
  transition: transform 0.3s ease-in-out;
  z-index: 98;
  transform: translateY(44px);

  @media (max-width: 768px) {
    display: block;
    &.hide {
      transform: translateY(0);
    }
  }
`

const AppBar = styled.nav`
  display: flex;
  padding: 8px 0;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(var(--lsd-theme-primary));
  //position: fixed;
  top: 0;
  width: 100%;
  height: 44px;
  max-width: ${uiConfigs.maxContainerWidth}px;
  background: rgb(var(--lsd-surface-primary));
  z-index: 100;
  box-sizing: border-box;

  &:last-child {
    margin-left: auto;
  }

  // to center-align logo
  &:before {
    content: 'D';
    width: 54px;
    margin: 1px auto 1px 1px;
    visibility: hidden;
  }

  /* temporary breakpoint */
  @media (max-width: 768px) {
    padding: 8px;

    &:before {
      display: none;
    }
  }
`

const LogosIconContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-left: unset;
  }
`

const Icons = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  > *:last-of-type {
    margin-left: -1px;
  }

  .searchIcon {
    display: none;
  }

  @media (max-width: 768px) {
    .searchIcon {
      display: block;
    }
  }
`

const Selector = styled(IconButton)`
  border-left: none;
`
