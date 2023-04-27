import { Autocomplete } from '@acid-info/lsd-react'
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

  const performSearch = () => {
    console.log('performing search', query, filterTags)
    if (!validateSearch()) return
  }

  useEffect(() => {
    performSearch()
  }, [filterTags])

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

  const validateSearch = () => {
    return (query !== undefined && query.length > 0) || filterTags.length > 0
  }

  const isCollapsed = validateSearch() && !active

  const constructCollapseText = () => {
    let txt = ''
    if (query !== undefined && query.length > 0) {
      txt += query
    }
    if (filterTags.length > 0) {
      if (txt.length > 0) txt += ' . '
      txt += `${filterTags.map((t) => `[${t}]`).join(',')}`
    }
    return txt
  }

  return (
    <SearchbarContainer onUnfocus={() => setActive(false)}>
      <Autocomplete
        className={styles.searchBox}
        placeholder={
          searchScope === ESearchScope.GLOBAL
            ? copyConfigs.search.searchbarPlaceholders.global()
            : copyConfigs.search.searchbarPlaceholders.article()
        }
        withIcon
        value={query as string}
        onFocus={() => setActive(true)}
        inputProps={{
          onChange: (e) => setQuery(e.target.value),
          onKeyUp: (e) => handleEnter(e),
          className: isCollapsed ? styles.active : '',
        }}
      />
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
      >
        {constructCollapseText()}
      </Collapsed>
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
`
