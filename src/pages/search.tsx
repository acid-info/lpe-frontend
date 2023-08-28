import { SearchBox } from '@/components/SearchBox'
import { SearchResultsExploreView } from '@/containers/Search/ExploreView'
import { SearchResultsListView } from '@/containers/Search/ListView'
import { LPE } from '@/types/lpe.types'
import { ReactNode, useEffect, useState } from 'react'
import SEO from '../components/SEO/SEO'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { api } from '../services/api.service'
import unbodyApi from '../services/unbody/unbody.service'
import { QueryParamProvider } from 'use-query-params'
import NextAdapterPages from 'next-query-params'
import { useQuery } from '@tanstack/react-query'
import { seq } from 'yaml/dist/schema/common/seq'
import { ApiResponse } from '@/types/data.types'
import useWindowSize from '@/utils/ui.utils'
import { uiConfigs } from '@/configs/ui.configs'
import themeState, { useThemeState } from '@/states/themeState/theme.state'

interface SearchPageProps {
  topics: string[]
  shows: LPE.Podcast.Show[]
  // articles: SearchResultItem<LPE.Article.Data>[]
  // blocks: SearchResultItem<LPE.Article.ContentBlock>[]
}

export default function SearchPage({ topics, shows }: SearchPageProps) {
  const [mounted, setMounted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [view, setView] = useState<string>('list')
  const isMobile = useWindowSize().width < 768

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  const [query, setQuery] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])

  const { data, isLoading } = useQuery(['search', query, tags, types], () => {
    return api.search({
      query: query.length > 0 ? query : ' ',
      tags,
      type: types as LPE.ContentType[],
    })
  })

  const blocks = (data?.data.blocks ||
    []) as LPE.Search.ResultItemBase<LPE.Post.ContentBlock>[]
  const posts = (data?.data.posts ||
    []) as LPE.Search.ResultItemBase<LPE.Post.Document>[]
  const handleSearch = async (
    query: string,
    filteredTags: string[],
    filteredTypes: LPE.ContentType[],
  ) => {
    setQuery(query)
    setTags(filteredTags)
    setTypes(filteredTypes)
  }

  let resultsNumber =
    types.includes(LPE.ContentTypes.Article) ||
    types.includes(LPE.ContentTypes.Podcast)
      ? posts.length
      : blocks.length

  return (
    <div style={{ minHeight: '80vh' }}>
      <SEO
        description={
          'Logos online publishing and blogging platform for writers and readers.'
        }
        title={'Logos Press Engine'}
      />
      <SearchBox
        tags={topics}
        onSearch={handleSearch}
        resultsNumber={resultsNumber}
        busy={isLoading}
        onViewChange={setView}
        showModeSwitch={!isMobile}
      />
      {view === 'list' && (
        <SearchResultsListView
          blocks={blocks}
          posts={posts}
          shows={shows}
          busy={isLoading}
        />
      )}
      {view === 'explore' && (
        <SearchResultsExploreView blocks={blocks} posts={posts} shows={shows} />
      )}
    </div>
  )
}

SearchPage.getLayout = (page: ReactNode) => (
  <QueryParamProvider adapter={NextAdapterPages}>
    <DefaultLayout>{page}</DefaultLayout>
  </QueryParamProvider>
)

export async function getStaticProps() {
  const { data: topics, errors: topicErrors } = await unbodyApi.getTopics()
  const { data: shows = [] } = await unbodyApi.getPodcastShows({
    populateEpisodes: true,
    episodesLimit: 10,
  })

  return {
    props: {
      topics,
      shows,
    },
  }
}
