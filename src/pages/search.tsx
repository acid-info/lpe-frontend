import { SearchBox } from '@/components/SearchBox'
import {
  extractQueryFromQuery,
  extractTopicsFromQuery,
} from '@/utils/search.utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SEO from '../components/SEO/SEO'
import unbodyApi from '../services/unbody/unbody.service'

interface SearchPageProps {
  topics: string[]
  // articles: SearchResultItem<LPE.Article.Data>[]
  // blocks: SearchResultItem<LPE.Article.ContentBlock>[]
}

export default function SearchPage({}: SearchPageProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const {
    query: { query = '', topics = [] },
  } = router

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  useEffect(() => {
    const serchArgs = [
      extractQueryFromQuery(router.query),
      extractTopicsFromQuery(router.query),
    ]

    const hasQuery = router.query.query && router.query.query.length > 0
    const hasTopics = router.query.topics && router.query.topics.length > 0

    if (mounted && (hasQuery || hasTopics)) {
    } else {
    }
    // if we follow the eslint, we will have an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, router.query])

  const handleSearch = (query: string, tags: string[], types: string[]) => {
    console.log('searching for', query, tags, types)
  }

  return (
    <div style={{ minHeight: '80vh' }}>
      <SEO
        description={
          'Logos online publishing and blogging platform for writers and readers.'
        }
        title={'Logos Press Engine'}
      />
      <SearchBox tags={[]} onSearch={handleSearch} resultsNumber={7} />
    </div>
  )
}

export async function getStaticProps() {
  // const { data: articles = [] } = await unbodyApi.searchArticles()
  // const { data: blocks = [] } = await unbodyApi.searchBlocks()
  const { data: topics, errors: topicErrors } = await unbodyApi.getTopics()

  return {
    props: {
      // articles,
      // blocks: shuffle(blocks),
      topics,
    },
  }
}
