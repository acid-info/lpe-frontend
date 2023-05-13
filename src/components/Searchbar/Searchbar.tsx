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
import { useSearchBarContext } from '@/context/searchbar.context'

export type SearchbarProps = {
  searchScope?: ESearchScope
  className?: string
  onSearch?: (query: string, filterTags: string[]) => void
  onReset?: () => void
}

export default function Searchbar(props: SearchbarProps) {
  const { onSearch, onReset } = props
  const { resultsNumber, resultsHelperText } = useSearchBarContext()

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

  const isArticlePage = router.pathname === '/article/[slug]'

  const performSearch = async (
    q: string = query,
    _filterTags: string[] = filterTags,
  ) => {
    //if it is article page, just call onSearch
    if (isArticlePage) {
      if (onSearch) {
        onSearch(q, _filterTags)
      }
      return
    }

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
    if (!isArticlePage) {
      performSearch('', [])
      return
    }

    setQuery('')
    setFilterTags([])
    setActive(false)
    onReset && onReset()
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
    <SearchbarContainer
      onUnfocus={() => {
        setActive(false)
        if (router.query.query && router.query.query.length > 0) {
          setQuery(router.query.query as string)
        }
      }}
    >
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
          style={{
            transition: 'height 150ms ease-in-out',
            height: active ? '56px' : 'auto',
          }}
          inputProps={{
            style: {
              fontSize: active ? '28px' : '14px',
              transition: 'font-size 150ms ease-in-out',
            },
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
      {!isArticlePage && (
        <TagsWrapper className={active ? 'active' : ''}>
          <FilterTags
            tags={copyConfigs.search.filterTags}
            onTagClick={handleTagClick}
            selectedTags={filterTags}
          />
        </TagsWrapper>
      )}
      {resultsNumber !== null && (
        <ResultsStatus>
          <Typography variant={'subtitle2'}>{resultsNumber} matches</Typography>
          {resultsHelperText && (
            <Typography variant={'subtitle2'}>.</Typography>
          )}
          {resultsHelperText && (
            <Typography variant={'subtitle2'}>{resultsHelperText}</Typography>
          )}
        </ResultsStatus>
      )}
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
  transition: height 150ms ease-in-out;
  overflow: hidden;
  height: 0;
  &.active {
    height: 45px;
  }
`

const ResultsStatus = styled.div`
  padding: 8px 14px;
  display: flex;
  grid-column-gap: 8px;
  align-items: center;

  > :nth-child(2) {
    font-size: 18px;
    transform: translateY(-3px);
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

  font-size: 28px;

  transition: top 150ms ease-in-out;

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

  transition: opacity 50ms;
  transition-delay: 50ms;

  &.hide {
    opacity: 0;
  }
`
