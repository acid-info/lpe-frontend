import { uiConfigs } from '@/configs/ui.configs'
import { SearchResultsExploreView } from '@/containers/Search/ExploreView'
import { SearchResultsListView } from '@/containers/Search/ListView'
import { LPE } from '@/types/lpe.types'
import { searchBlocksBasicFilter } from '@/utils/search.utils'
import { useQuery } from '@tanstack/react-query'
import NextAdapterPages from 'next-query-params'
import { ReactNode, useState } from 'react'
import { QueryParamProvider } from 'use-query-params'
import SEO from '../components/SEO/SEO'
import { copyConfigs } from '../configs/copy.configs'
import { GlobalSearchBox } from '../containers/GlobalSearchBox/GlobalSearchBox'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { api } from '../services/api.service'
import unbodyApi from '../services/unbody/unbody.service'

interface SearchPageProps {
  topics: string[]
  shows: LPE.Podcast.Show[]
  // articles: SearchResultItem<LPE.Article.Data>[]
  // blocks: SearchResultItem<LPE.Article.ContentBlock>[]
}

export default function SearchPage({ topics, shows }: SearchPageProps) {
  const [view, setView] = useState<string>('list')

  const [query, setQuery] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])

  const { data, isLoading } = useQuery(['search', query, tags, types], () => {
    return api
      .search({
        query: query.length > 0 ? query : ' ',
        tags,
        type: types as LPE.ContentType[],
      })
      .then((res) => {
        if (!res) return
        if (res.errors) return
        if (!res.data) return
        return {
          ...res.data,
          blocks: res.data.blocks.filter((b) =>
            searchBlocksBasicFilter(
              b as LPE.Search.ResultItemBase<LPE.Post.ContentBlock>,
            ),
          ),
        }
      })
  })

  const blocks = (data?.blocks ||
    []) as LPE.Search.ResultItemBase<LPE.Post.ContentBlock>[]
  const posts = (data?.posts ||
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
      <SEO title="Search" pagePath={`/search`} />
      <GlobalSearchBox
        view={view}
        views={[
          { key: 'list', label: copyConfigs.search.views.default },
          { key: 'explore', label: copyConfigs.search.views.explore },
        ]}
        tags={topics}
        onSearch={handleSearch}
        resultsNumber={resultsNumber}
        fetching={isLoading}
        onViewChange={setView}
      />
      {view === 'list' && (
        <SearchResultsListView
          blocks={blocks.slice(
            0,
            uiConfigs.searchResult.numberOfTotalBlocksInListView,
          )}
          posts={posts}
          shows={shows}
          busy={isLoading}
          showTopPost={query.length > 0}
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
    <DefaultLayout
      mainProps={{
        spacing: false,
      }}
    >
      {page}
    </DefaultLayout>
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
      topics: topics.map((topic) => topic.value),
      shows,
    },
    revalidate: 10,
  }
}
