import { useSearchGeneric } from '@/hooks/useSearch'
import { SearchLayout } from '@/layouts/SearchLayout'
import { PostTypes, SearchResultItem } from '@/types/data.types'
import { shuffle } from '@/utils/data.utils'
import {
  extractQueryFromQuery,
  extractTopicsFromQuery,
} from '@/utils/search.utils'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { RelatedArticles } from '../components/RelatedArticles'
import { RelatedContent } from '../components/RelatedContent'
import SEO from '../components/SEO/SEO'
import unbodyApi from '../services/unbody/unbody.service'
import { LPE } from '../types/lpe.types'

interface SearchPageProps {
  topics: string[]
  articles: SearchResultItem<LPE.Article.Data>[]
  blocks: SearchResultItem<LPE.Article.ContentBlock>[]
}

export default function SearchPage({
  articles: initialArticles = [],
  blocks: initialBlocks = [],
}: SearchPageProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const {
    query: { query = '', topics = [] },
  } = router

  const articles = useSearchGeneric<LPE.Article.Data>(
    initialArticles,
    PostTypes.Article,
  )

  const blocks = useSearchGeneric<LPE.Article.ContentBlock>(
    initialBlocks,
    PostTypes.Block,
  )

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
      articles.search(...(serchArgs as [string, string[]]))
      blocks.search(...(serchArgs as [string, string[]]))
    } else {
      articles.reset(initialArticles)
      blocks.reset(initialBlocks)
    }
    // if we follow the eslint, we will have an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, router.query])

  return (
    <div style={{ minHeight: '80vh' }}>
      <SEO
        description={
          'Logos online publishing and blogging platform for writers and readers.'
        }
        title={'Logos Press Engine'}
      />
      <RelatedArticles data={articles} />
      <RelatedContent data={blocks} />
    </div>
  )
}

SearchPage.getLayout = function getLayout(page: ReactNode) {
  return <SearchLayout>{page}</SearchLayout>
}

export async function getStaticProps() {
  const { data: articles = [] } = await unbodyApi.searchArticles()
  const { data: blocks = [] } = await unbodyApi.searchBlocks()
  const { data: topics, errors: topicErrors } = await unbodyApi.getTopics()

  return {
    props: {
      articles,
      blocks: shuffle(blocks),
      topics,
    },
  }
}
