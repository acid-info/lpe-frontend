import {
  TextField,
  IconButton,
  SearchIcon,
  CloseIcon,
  Typography,
} from '@acid-info/lsd-react'
import styles from './Search.module.css'
import { SearchbarContainer } from '@/components/Searchbar/SearchbarContainer'
import { copyConfigs } from '@/configs/copy.configs'
import { ESearchScope, ESearchStatus } from '@/types/ui.types'
import React, { useCallback, useEffect, useState } from 'react'
import FilterTags from '@/components/FilterTags/FilterTags'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import {
  addQueryToQuery,
  addTopicsToQuery,
  createMinimizedSearchText,
  createSearchLink,
  extractQueryFromQuery,
  extractTopicsFromQuery,
} from '@/utils/search.utils'
import Link from 'next/link'

export type SearchbarProps = {
  searchScope?: ESearchScope
  className?: string
}

export default function Searchbar(props: SearchbarProps) {
  const [searchScope, setSearchScope] = useState<ESearchScope>(
    props.searchScope || ESearchScope.GLOBAL,
  )
  const [active, setActive] = useState(false)
  const router = useRouter()

  const [query, setQuery] = useState<string>(
    extractQueryFromQuery(router.query),
  )
  const [filterTags, setFilterTags] = useState<string[]>(
    extractTopicsFromQuery(router.query),
  )

  const isValidSearchInput = (_filterTags: string[] = []) =>
    (query && query.length > 0) || _filterTags.length > 0

  const performSearch = async (
    q: string = query,
    _filterTags: string[] = filterTags,
  ) => {
    await router.push(
      {
        pathname: '/search',
        query: {
          ...addQueryToQuery(q),
          ...addTopicsToQuery(_filterTags),
        },
      },
      undefined,
      { shallow: true },
    )
  }

  useEffect(() => {
    setQuery(extractQueryFromQuery(router.query))
    setFilterTags(extractTopicsFromQuery(router.query))
    if (router.pathname === '/article/[slug]') {
      setSearchScope(ESearchScope.ARTICLE)
    } else {
      setSearchScope(ESearchScope.GLOBAL)
    }
  }, [router.query.query, router.query.topics])

  const performClear = useCallback(() => {
    performSearch('', [])
  }, [setQuery, setFilterTags])

  const handleTagClick = (tag: string) => {
    let newSelectedTags = [...filterTags]
    if (newSelectedTags.includes(tag)) {
      newSelectedTags = newSelectedTags.filter((t) => t !== tag)
    } else {
      newSelectedTags.push(tag)
    }
    performSearch(query, newSelectedTags)
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch()
    }
  }

  const isCollapsed = isValidSearchInput() && !active

  const placeholder =
    searchScope === ESearchScope.GLOBAL
      ? copyConfigs.search.searchbarPlaceholders.global()
      : copyConfigs.search.searchbarPlaceholders.article()

  return (
    <SearchbarContainer onUnfocus={() => setActive(false)}>
      <SearchBox>
        <TextField
          className={styles.searchBox}
          placeholder={placeholder}
          value={query as string}
          onFocus={() => setActive(true)}
          onKeyDown={handleEnter}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
        {searchScope === ESearchScope.ARTICLE && (
          <GlobalSearchTrigger
            href={createSearchLink(query, filterTags)}
            className={!active ? '' : 'hide'}
          >
            <Typography variant="body2" className={styles.globalSearchTrigger}>
              global search
            </Typography>
          </GlobalSearchTrigger>
        )}
        <div>
          <IconButton
            className={styles.searchButton}
            onClick={() =>
              isValidSearchInput() ? performClear() : performSearch()
            }
          >
            {isValidSearchInput() ? <CloseIcon /> : <SearchIcon />}
          </IconButton>
        </div>
      </SearchBox>
      <TagsWrapper className={active ? 'active' : ''}>
        <FilterTags
          tags={copyConfigs.search.filterTags}
          onTagClick={handleTagClick}
          selectedTags={filterTags}
        />
      </TagsWrapper>
      <Collapsed
        className={isCollapsed ? 'enabled' : ''}
        onClick={() => setActive(true)}
        dangerouslySetInnerHTML={{
          __html: createMinimizedSearchText(query, filterTags),
        }}
      />
    </SearchbarContainer>
  )
}

const TagsWrapper = styled.div`
  transition: height 250ms ease-in-out;
  overflow: hidden;
  height: 0;

  &.active {
    height: 45px;
  }
`

const Collapsed = styled.div`
  display: flex;
  align-items: baseline;
  background: rgb(var(--lsd-surface-primary));
  padding: 8px 14px;
  width: calc(90% - 28px);
  position: absolute;
  z-index: auto;

  top: -100%;
  left: 0;

  font-size: 14px;

  transition: top 250ms ease-in-out;

  &.enabled {
    top: 0;
  }

  > * {
    margin-right: 4px;
  }

  > *:not(:first-child) {
    margin-left: 4px;
  }

  b {
    transform: translateY(-2px);
  }
`
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`

const GlobalSearchTrigger = styled(Link)`
  position: absolute;
  left: 256px;
  top: 7px;

  transition: opacity 250ms ease-in-out;

  &.hide {
    opacity: 0;
  }
`
