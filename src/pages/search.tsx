import { SearchBox } from '@/components/SearchBox'
import { SearchResultsExploreView } from '@/containers/Search/ExploreView'
import { SearchResultsListView } from '@/containers/Search/ListView'
import { LPE } from '@/types/lpe.types'
import { useEffect, useState } from 'react'
import SEO from '../components/SEO/SEO'
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
  const [mounted, setMounted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [resultNumber, setResultNumber] = useState<number | null>(null)
  const [view, setView] = useState<string>('list')

  const [blocks, setBlocks] = useState<
    LPE.Search.ResultItemBase<LPE.Post.ContentBlock>[]
  >([])
  const [posts, setPosts] = useState<
    LPE.Search.ResultItemBase<LPE.Post.Document>[]
  >([])

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  const handleSearch = async (
    query: string,
    filteredTags: string[],
    filteredTypes: LPE.ContentType[],
  ) => {
    setBusy(true)
    const { data, errors } = await api.search({
      query,
      tags: filteredTags,
      type: filteredTypes,
    })
    setBusy(false)
    setResultNumber(data.posts.length || null)
    setPosts(data.posts as LPE.Search.ResultItemBase<LPE.Post.Document>[])
    setBlocks(data.blocks as LPE.Search.ResultItemBase<LPE.Post.ContentBlock>[])
    console.log(data)
  }

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
        resultsNumber={resultNumber}
        busy={busy}
        onViewChange={setView}
      />
      {view === 'list' && (
        <SearchResultsListView blocks={blocks} posts={posts} shows={shows} />
      )}
      {view === 'explore' && (
        <SearchResultsExploreView blocks={blocks} posts={posts} shows={shows} />
      )}
    </div>
  )
}

export async function getStaticProps() {
  // const { data: articles = [] } = await unbodyApi.searchArticles()
  // const { data: blocks = [] } = await unbodyApi.searchBlocks()
  const { data: topics, errors: topicErrors } = await unbodyApi.getTopics()
  const { data: shows = [] } = await unbodyApi.getPodcastShows({
    populateEpisodes: true,
    episodesLimit: 10,
  })

  return {
    props: {
      // articles,
      // blocks: shuffle(blocks),
      topics,
      shows,
    },
  }
}
