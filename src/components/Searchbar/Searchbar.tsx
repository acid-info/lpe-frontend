import {
  TextField,
  Autocomplete,
  IconButton,
  SearchIcon,
  CloseIcon,
} from '@acid-info/lsd-react'
import styles from './Search.module.css'
import { SearchbarContainer } from '@/components/Searchbar/SearchbarContainer'
import { copyConfigs } from '@/configs/copy.configs'
import { ESearchScope } from '@/types/ui.types'
import React, { useCallback, useEffect, useState } from 'react'
import FilterTags from '@/components/FilterTags/FilterTags'
import styled from '@emotion/styled'

export type SearchbarProps = {
  searchScope?: ESearchScope
}

export default function Searchbar(props: SearchbarProps) {
  const { searchScope = ESearchScope.GLOBAL } = props

  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [query, setQuery] = useState<string | undefined>(undefined)
  const [filterTags, setFilterTags] = useState<string[]>([])

  const validateSearch = useCallback(() => {
    return (query !== undefined && query.length > 0) || filterTags.length > 0
  }, [query, filterTags])

  const performSearch = useCallback(() => {
    if (!validateSearch()) return
  }, [validateSearch])

  const performClear = useCallback(() => {
    // TODO: clear input.value seems to be not working. When set to undefined, the input value is still there.
    setQuery(undefined)
    setFilterTags([])
  }, [setQuery, setFilterTags])

  useEffect(() => {
    performSearch()
  }, [filterTags, performSearch])

  const handleTagClick = (tag: string) => {
    let newSelectedTags = [...filterTags]
    if (newSelectedTags.includes(tag)) {
      newSelectedTags = newSelectedTags.filter((t) => t !== tag)
    } else {
      newSelectedTags.push(tag)
    }
    setFilterTags(newSelectedTags)
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch()
    }
  }

  const constructCollapseText = () => {
    let txt = ''
    if (query !== undefined && query.length > 0) {
      txt += `<span>${query}</span>`
    }
    if (filterTags.length > 0) {
      if (txt.length > 0) txt += '<b> . </b>'
      txt += `${filterTags.map((t) => `<small>[${t}]</small>`).join(' ')}`
    }
    return txt
  }

  const isCollapsed = validateSearch() && !active

  return (
    <SearchbarContainer onUnfocus={() => setActive(false)}>
      <SearchBox>
        <Autocomplete
          className={styles.searchBox}
          placeholder={
            searchScope === ESearchScope.GLOBAL
              ? copyConfigs.search.searchbarPlaceholders.global()
              : copyConfigs.search.searchbarPlaceholders.article()
          }
          value={query as string}
          onFocus={() => setActive(true)}
          clearButton={false}
          inputProps={{
            onChange: (e) => {
              setQuery(e.target.value)
              console.log(e.target.value)
            },
            onKeyUp: (e) => handleEnter(e),
          }}
        />
        <div>
          <IconButton
            className={styles.searchButton}
            onClick={() =>
              validateSearch() ? performClear() : performSearch()
            }
          >
            {validateSearch() ? <CloseIcon /> : <SearchIcon />}
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
        dangerouslySetInnerHTML={{ __html: constructCollapseText() }}
      ></Collapsed>
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
