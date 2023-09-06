import { copyConfigs } from '@/configs/copy.configs'
import { uiConfigs } from '@/configs/ui.configs'
import { LPE } from '@/types/lpe.types'
import { nope } from '@/utils/general.utils'
import { lsdUtils } from '@/utils/lsd.utils'
import { formatTagText } from '@/utils/string.utils'
import { useHydrated } from '@/utils/useHydrated.util'
import { Dropdown, TabItem, Tabs, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { useDeepCompareEffect } from 'react-use'
import {
  ArrayParam,
  StringParam,
  useQueryParam,
  withDefault,
} from 'use-query-params'
import PostTypes = LPE.PostTypes
import ContentBlockTypes = LPE.Post.ContentBlockTypes
interface SearchBoxProps {
  onSearch?: (query: string, tags: string[], types: LPE.ContentType[]) => void
  tags?: string[]
  onViewChange?: (view: string) => void
  resultsNumber: number | null
  busy?: boolean
  showModeSwitch?: boolean
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

const SearchBox = (props: SearchBoxProps) => {
  const {
    onSearch = nope,
    onViewChange = nope,
    tags = [],
    resultsNumber,
    busy = false,
    showModeSwitch = true,
  } = props

  const hydrated = useHydrated()

  const [filterTags, setFilterTags] = useQueryParam(
    'topic',
    withDefault(ArrayParam, []),
    {
      skipUpdateWhenNoChange: false,
    },
  )
  const [filterContentTypes, setFilterContentTypes] = useQueryParam(
    'type',
    withDefault(ArrayParam, allContentTypes),
    {
      skipUpdateWhenNoChange: true,
    },
  )
  const [query, setQuery] = useQueryParam('q', withDefault(StringParam, ''), {
    skipUpdateWhenNoChange: true,
  })

  const [queryInput, setQueryInput] = useState<string>(query)

  const [view, setView] = useState<string>('list')
  const [enlargeQuery, setEnlargeQuery] = useState(false)
  const [placeholder, setPlaceholder] = useState<string>(
    copyConfigs.search.searchbarPlaceholders.global(),
  )

  const filtersRef = useRef<HTMLDivElement>(null)
  const [whereResultsStick, setWhereResultsStick] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [detailsTop, setDetailsTop] = useState(0)
  const [focused, setFocused] = useState(false)
  const [showClear, setShowClear] = useState(false)

  const handleViewChange = async (n: string) => {
    setView(n)
    onViewChange(n)
    onSearch(
      query,
      filterTags as string[],
      filterContentTypes as LPE.ContentType[],
    )
  }

  useEffect(() => {
    setEnlargeQuery(!(queryInput.length === 0 && !focused))
    if (focused) {
      setPlaceholder('')
    } else {
      setTimeout(() => {
        setPlaceholder(copyConfigs.search.searchbarPlaceholders.global())
      }, 200)
    }
  }, [focused, queryInput])

  useEffect(() => {
    if (filtersRef.current && hydrated) {
      const filtersB = filtersRef.current.getBoundingClientRect().bottom

      const parentT =
        filtersRef.current.parentElement?.getBoundingClientRect().top || 0

      const whereResultsStick =
        -1 * (filtersB - parentT - uiConfigs.navbarRenderedHeight + 2)

      setWhereResultsStick(whereResultsStick)
      setDetailsTop(filtersB + whereResultsStick)
    }
  }, [filtersRef, hydrated, queryInput])

  useEffect(() => {
    const onScroll = () => {
      setShowDetails(window.scrollY >= detailsTop)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [detailsTop])

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

  const clear = async () => {
    setQuery('')
    setFilterTags([])
    setFilterContentTypes(allContentTypes)
  }

  const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setQuery(queryInput)
    }
  }

  useEffect(() => {
    if (query?.length > 0) setQueryInput(query)
  }, [query])

  useDeepCompareEffect(() => {
    onSearch(
      query,
      filterTags as string[],
      filterContentTypes as LPE.ContentType[],
    )
  }, [query, filterTags, filterContentTypes])

  // useEffect(() => {
  //   if (focused) return
  //   if (query !== queryInput) setQuery(queryInput)
  // }, [focused, query, queryInput])

  return (
    <Container
      className={enlargeQuery ? 'active' : ''}
      style={{ top: `${whereResultsStick}px` }}
    >
      <FirstRow>
        <input
          className={`search-input`}
          placeholder={placeholder}
          value={queryInput as string}
          onFocus={() => {
            setFocused(true)
          }}
          onKeyUp={handleKeyUp}
          onChange={(e) => setQueryInput(e.target.value)}
          onBlurCapture={() => {
            setFocused(false)
          }}
        />
        {showModeSwitch && (
          <ViewButtons>
            <Tabs size={'small'} activeTab={view} onChange={handleViewChange}>
              <TabItem name={'list'}>
                {copyConfigs.search.views.default}
              </TabItem>
              <TabItem name={'explore'}>
                {copyConfigs.search.views.explore}
              </TabItem>
            </Tabs>
          </ViewButtons>
        )}
      </FirstRow>
      <Filters ref={filtersRef}>
        <Dropdown
          size={'small'}
          placeholder={'Content Type'}
          options={contentTypes.map((c) => ({ name: c.label, value: c.value }))}
          value={hydrated ? (filterContentTypes as string[]) : []}
          onChange={(n) => setFilterContentTypes(n as string[])}
          multi={true}
        />
        <Dropdown
          size={'small'}
          placeholder={'Topics'}
          options={tags.map((t) => ({ name: formatTagText(t), value: t }))}
          value={hydrated ? (filterTags as string[]) : []}
          onChange={(n) => setFilterTags(n as string[])}
          multi={true}
          triggerLabel={'Topics'}
        />
        <Clear
          variant={'label2'}
          className={`${showClear ? 'show' : ''}`}
          onClick={clear}
        >
          <span>clear</span>
          <span> </span>
          <span>filters</span>
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
  padding: 8px 14px;
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
    background: transparent;
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

  ${({ theme }) => lsdUtils.breakpoint(theme, 'xs', 'exact')} {
    padding: 8px 0;
  }
`

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

  ${({ theme }) => lsdUtils.breakpoint(theme, 'xs', 'exact')} {
    .lsd-dropdown--small {
      width: 135px;
    }
  }
`
const Results = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  overflow: hidden;

  > span {
    white-space: nowrap;
  }

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

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
    span:not(:first-child) {
      display: none;
    }
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
