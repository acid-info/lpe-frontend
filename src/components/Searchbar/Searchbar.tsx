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
import { ESearchScope } from '@/types/ui.types'
import React, { useCallback, useEffect, useState } from 'react'
import FilterTags from '@/components/FilterTags/FilterTags'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import {
  addQueryToQuery,
  addTopicsToQuery,
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
  withFilterTags?: boolean
  beSticky?: boolean
}

export default function Searchbar(props: SearchbarProps) {
  const {
    onSearch,
    beSticky,
    onReset,
    className,
    withFilterTags = true,
  } = props
  const { resultsNumber, resultsHelperText, tags } = useSearchBarContext()

  const [placeholder, setPlaceholder] = useState<string>()

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

  const performSearch = useCallback(
    async (q: string = query, _filterTags: string[] = filterTags) => {
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
    },
    [isArticlePage, router, filterTags, onSearch, query],
  )

  useEffect(() => {
    setQuery(extractQueryFromQuery(router.query))
    setFilterTags(extractTopicsFromQuery(router.query))
    if (router.pathname === '/article/[slug]') {
      setSearchScope(ESearchScope.ARTICLE)
    } else {
      setSearchScope(ESearchScope.GLOBAL)
    }
  }, [router.query, router.query.topics, router.pathname])

  const performClear = useCallback(() => {
    if (!isArticlePage) {
      performSearch('', [])
      return
    }

    setQuery('')
    setFilterTags([])
    setActive(false)
    onReset && onReset()
  }, [isArticlePage, onReset, performSearch, setQuery, setFilterTags])

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

  const isCollapsed = isValidSearchInput(filterTags) && !active

  useEffect(() => {
    if (active && query.length > 0) {
      setPlaceholder('')
    } else {
      setTimeout(() => {
        setPlaceholder(
          searchScope === ESearchScope.GLOBAL
            ? copyConfigs.search.searchbarPlaceholders.global()
            : copyConfigs.search.searchbarPlaceholders.article(),
        )
      }, 130)
    }
  }, [active, searchScope, query.length])

  const showResultsNumber = resultsNumber !== null && active
  const showTagFilters = withFilterTags && active

  let height = 45
  if (active) {
    height +=
      typeof window !== 'undefined' ? (window.innerWidth > 768 ? 10 : 0) : 0
  }
  if (showResultsNumber) {
    height += isArticlePage ? 22 : 26
  }
  if (showTagFilters) {
    height += 36
  }

  return (
    <SearchbarContainer
      className={className}
      onUnfocus={() => {
        setActive(false)
        if (router.query.query && router.query.query.length > 0) {
          setQuery(router.query.query as string)
        }
      }}
      style={{
        transition: 'height 150ms ease-in-out',
        height: active ? `${height}px` : 'auto',
      }}
      beSticky={beSticky}
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
            // height: active ? '56px' : 'auto',
          }}
          inputProps={{
            className: `${styles.searchInput} ${active ? styles.active : ''}`,
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
      {withFilterTags && (
        <TagsWrapper className={showTagFilters ? 'active' : ''}>
          <FilterTags
            tags={tags}
            onTagClick={handleTagClick}
            selectedTags={filterTags}
          />
        </TagsWrapper>
      )}
      {showResultsNumber && (
        <ResultsStatus>
          <Typography variant={'subtitle2'}>{resultsNumber} matches</Typography>
        </ResultsStatus>
      )}
      <Collapsed
        className={isCollapsed ? 'enabled' : ''}
        onClick={() => setActive(true)}
        variant={'subtitle2'}
        dangerouslySetInnerHTML={{
          __html: [
            `${resultsNumber} matches`,
            `<span class="helper">${resultsHelperText}<span>`,
          ].join('<span class="dot">.</span>'),
        }}
      />
    </SearchbarContainer>
  )
}

const TagsWrapper = styled.div`
  transition: height, margin-top 150ms ease-in-out;
  overflow: hidden;
  height: 0;

  &.active {
    margin-top: 19px;
    height: 24px;
  }
  @media (max-width: 768px) {
    &.active {
      margin-top: 10px;
    }
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

const Collapsed = styled(Typography)`
  display: flex;
  align-items: center;
  background: rgb(var(--lsd-surface-primary));
  padding: 8px 14px;
  width: calc(90% - 28px);
  position: absolute;
  z-index: auto;

  gap: 8px;

  top: -100%;
  left: 0;

  transition: top 150ms ease-in-out;

  .tags {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .dot {
    display: inline-block;
    font-size: 18px;
    transform: translateY(-4px);
  }

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

  .helper,
  .tags {
    display: flex;
    gap: 4px;
  }

  @media (max-width: 768px) {
    .helper {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 200px;
      white-space: nowrap;
    }
  }
`
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 38px;
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
