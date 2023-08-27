import styled from '@emotion/styled'
import styles from '@/components/Searchbar/Search.module.css'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  TabItem,
  Tabs,
  TextField,
  Typography,
} from '@acid-info/lsd-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  addContentTypesToQuery,
  addQueryToQuery,
  addTopicsToQuery,
  extractContentTypesFromQuery,
  extractQueryFromQuery,
  extractTopicsFromQuery,
} from '@/utils/search.utils'
import { NextRouter, useRouter } from 'next/router'
import { nope } from '@/utils/general.utils'
import { LPE } from '@/types/lpe.types'
import PostTypes = LPE.PostTypes
import ContentBlockTypes = LPE.Post.ContentBlockTypes
import { ESearchScope } from '@/types/ui.types'
import { copyConfigs } from '@/configs/copy.configs'
import { useOutsideClick, useSticky } from '@/utils/ui.utils'
import { uiConfigs } from '@/configs/ui.configs'

interface SearchBoxProps {
  onSearch?: (query: string, tags: string[], types: LPE.ContentType[]) => void
  tags?: string[]
  onViewChange?: (view: string) => void
  resultsNumber: number | null
  busy?: boolean
}

const ContentTypesCategories = {
  Post: 'post',
  Block: 'block',
} as const

const contentTypes = [
  {
    label: 'Articles',
    value: PostTypes.Article,
    category: ContentTypesCategories.Post,
  },
  {
    label: 'Podcasts',
    value: PostTypes.Podcast,
    category: ContentTypesCategories.Post,
  },
  {
    label: 'Paragraphs',
    value: ContentBlockTypes.Text,
    category: ContentTypesCategories.Block,
  },
  {
    label: 'Images',
    value: ContentBlockTypes.Image,
    category: ContentTypesCategories.Block,
  },
]

const allContentTypes = contentTypes.map((c) => c.value)

const useSearchBox = (
  router: NextRouter,
  callback: (query: string, tags: string[], types: LPE.ContentType[]) => void,
) => {
  const [query, setQuery] = useState<string>(
    extractQueryFromQuery(router.query),
  )
  const [filterTags, setFilterTags] = useState<string[]>(
    extractTopicsFromQuery(router.query),
  )
  const [filterContentTypes, setFilterContentTypes] =
    useState<string[]>(allContentTypes)

  useEffect(() => {
    setQuery(extractQueryFromQuery(router.query))
    setFilterTags(extractTopicsFromQuery(router.query))
    const contentTypes = extractContentTypesFromQuery(router.query)
    setFilterContentTypes(contentTypes.length ? contentTypes : allContentTypes)
  }, [router.query, router.query.topics, router.pathname])

  const performSearch = useCallback(
    async (
      q: string = query,
      _filterTags: string[] = filterTags,
      _contentTypes: string[] = [],
    ) => {
      const queries = [
        addQueryToQuery(q),
        addTopicsToQuery(_filterTags),
        addContentTypesToQuery(
          _contentTypes.length === allContentTypes.length ? [] : _contentTypes,
        ),
      ].filter((n) => n && n)

      callback(q, _filterTags, _contentTypes as LPE.ContentType[])

      await router.push(
        {
          pathname: '/search',
          query: queries.length ? queries.join('&') : undefined,
        },
        undefined,
        {
          shallow: true,
        },
      )
    },
    [router, filterTags, filterContentTypes, query],
  )

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await performSearch()
    }
  }

  const handleTypesChange = async (n: string | string[]) => {
    await performSearch(undefined, undefined, n as string[])
  }
  const handleTagsChange = async (n: string | string[]) => {
    await performSearch(undefined, n as string[])
  }

  return {
    query,
    filterTags,
    filterContentTypes,
    setQuery,
    setFilterTags,
    setFilterContentTypes,
    handleEnter,
    handleTypesChange,
    handleTagsChange,
    performSearch,
  }
}

const SearchBox = (props: SearchBoxProps) => {
  const {
    onSearch = nope,
    onViewChange = nope,
    tags = [],
    resultsNumber,
    busy = false,
  } = props
  const router = useRouter()
  const {
    query,
    filterTags,
    filterContentTypes,
    setQuery,
    handleEnter,
    handleTypesChange,
    handleTagsChange,
    performSearch,
  } = useSearchBox(router, onSearch)
  const [view, setView] = useState<string>('list')

  const [enlargeQuery, setEnlargeQuery] = useState(false)
  const [placeholder, setPlaceholder] = useState<string>(
    copyConfigs.search.searchbarPlaceholders.global(),
  )

  const filtersRef = useRef<HTMLDivElement>(null)
  const [whereResultsStick, setWhereResultsStick] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [detailsTop, setDetailsTop] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [focused, setFocused] = useState(false)
  const [showClear, setShowClear] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  const handleViewChange = async (n: string) => {
    setView(n)
    onViewChange(n)
    performSearch()
  }

  useEffect(() => {
    if (enlargeQuery) {
      setPlaceholder('')
    } else {
      setTimeout(() => {
        setPlaceholder(copyConfigs.search.searchbarPlaceholders.global())
      }, 200)
    }
  }, [enlargeQuery])

  useEffect(() => {
    if (filtersRef.current) {
      const filtersB = filtersRef.current.getBoundingClientRect().bottom
      const parentT =
        filtersRef.current.parentElement?.getBoundingClientRect().top || 0
      const whereResultsStick =
        -1 * (filtersB - parentT - uiConfigs.navbarRenderedHeight)
      setWhereResultsStick(whereResultsStick)
      setDetailsTop(filtersB + whereResultsStick)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setShowDetails(window.scrollY >= detailsTop)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [detailsTop])

  useEffect(() => {
    if (query.length === 0 && mounted && !focused) {
      setTimeout(() => {
        setEnlargeQuery(false)
      }, 200)
    } else {
      setEnlargeQuery(true)
      setPlaceholder('')
    }
  }, [query])

  useEffect(() => {
    if (
      filterContentTypes.length < allContentTypes.length ||
      filterTags.length > 0
    ) {
      setShowClear(true)
    } else {
      setShowClear(false)
    }
  }, [filterTags, filterContentTypes])

  const handleClear = async () => {
    await performSearch(undefined, [], [])
  }

  return (
    <Container
      className={enlargeQuery ? 'active' : ''}
      style={{ top: `${whereResultsStick}px` }}
    >
      <FirstRow>
        <input
          className={`search-input`}
          placeholder={placeholder}
          value={query as string}
          onFocus={() => {
            if (query.length === 0) {
              setEnlargeQuery(true)
            }
            setFocused(true)
          }}
          onKeyDown={handleEnter}
          onChange={(e) => setQuery(e.target.value)}
          onBlurCapture={() => {
            if (query.length === 0) {
              setEnlargeQuery(false)
              performSearch()
            }
            setFocused(false)
          }}
        />
        <ViewButtons>
          <Tabs size={'small'} activeTab={view} onChange={handleViewChange}>
            <TabItem name={'list'}>{copyConfigs.search.views.default}</TabItem>
            <TabItem name={'explore'}>
              {copyConfigs.search.views.explore}
            </TabItem>
          </Tabs>
        </ViewButtons>
      </FirstRow>
      <Filters ref={filtersRef}>
        <Dropdown
          size={'small'}
          placeholder={'Content Type'}
          options={contentTypes.map((c) => ({ name: c.label, value: c.value }))}
          value={filterContentTypes}
          onChange={handleTypesChange}
          multi={true}
        />
        <Dropdown
          size={'small'}
          placeholder={'Topics'}
          options={tags.map((t) => ({ name: t, value: t }))}
          value={filterTags}
          onChange={handleTagsChange}
          multi={true}
          triggerLabel={'Topics'}
        />
        <Clear
          variant={'label2'}
          className={`${showClear ? 'show' : ''}`}
          onClick={handleClear}
        >
          Clear Filters
        </Clear>
      </Filters>
      {busy ? (
        <Typography variant={'subtitle2'}>Searching...</Typography>
      ) : resultsNumber ? (
        <Results>
          <Typography variant={'subtitle2'}>
            {resultsNumber === 0
              ? copyConfigs.search.results.noResults
              : `${resultsNumber} ${copyConfigs.search.results.results}`}
          </Typography>
          <>
            <Details
              variant={'subtitle2'}
              className={`search-details ${showDetails ? 'show' : ''}`}
              dangerouslySetInnerHTML={{
                __html: [
                  ...(query && query.length
                    ? [`<span class="dot">.</span><span>${query}</span>`]
                    : []),
                  ...(filterTags && filterTags.length
                    ? [
                        `<span>${filterTags
                          .map((t) => `<span>[${t}]</span>`)
                          .join('')}</span>`,
                      ]
                    : []),
                  ...(filterContentTypes && filterContentTypes.length
                    ? [
                        `<span>${filterContentTypes
                          .map((t) => `<span>[${t}]</span>`)
                          .join('')}</span>`,
                      ]
                    : []),
                ].join('<span class="dot">.</span>'),
              }}
            />
          </>
        </Results>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid rgba(var(--lsd-text-primary), 1);
  padding: 8px 0 14px 14px;
  position: sticky;

  z-index: 1;
  background: rgba(var(--lsd-surface-primary), 1);

  &.active {
    .search-input {
      font-size: var(--lsd-h4-lineHeight);
      line-height: var(--lsd-h4-lineHeight);
    }
  }

  .search-input {
    font-size: var(--lsd-label1-fontSize);
    line-height: var(--lsd-label1-lineHeight);
    outline: none;
    border: none;

    width: 100%;
    height: 44px;

    transition: all 0.2s ease-in-out;

    ::placeholder {
      color: rgba(var(--lsd-text-primary), 0.3);
    }

    :-ms-input-placeholder {
      color: rgba(var(--lsd-text-primary), 0.3);
    }

    ::-ms-input-placeholder {
      color: rgba(var(--lsd-text-primary), 0.3);
    }
  }
`

// align last item to the right and first item takes the rest of the space
const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const ViewButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
`

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`
const Results = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  overflow: hidden;

  .dot {
    width: 3px;
    height: 3px;
    display: inline-block;
    border-radius: 50%;
    background-color: rgba(var(--lsd-text-primary), 1);
    transform: translateY(1px);
  }

  .search-details {
  }
`

const Clear = styled(Typography)`
  opacity: 0;
  transition: all 0.2s ease-in-out;
  text-decoration: underline;

  &.show {
    opacity: 1;
  }
`

const Details = styled(Typography)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;

  opacity: 0;
  transform: translateY(-40px);
  transition: all 0.2s ease-in-out;

  &.show {
    opacity: 1;
    transform: translateY(0);
  }

  > span {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
  }
`
export default SearchBox
