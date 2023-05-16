import { useSearchGeneric } from '@/hooks/useSearch'
import {
  UnbodyGoogleDoc,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'

import unbodyApi from '@/services/unbody.service'
import { PostTypes, SearchResultItem } from '@/types/data.types'
import {
  extractQueryFromQuery,
  extractTopicsFromQuery,
} from '@/utils/search.utils'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { SearchLayout } from '@/layouts/SearchLayout'
import { RelatedArticles } from '@/components/RelatedArticles'
import { RelatedContent } from '@/components/RelatedContent'
import { Section } from '@/components/Section/Section'
import api from '@/services/unbody.service'
import { useSearchBarContext } from '@/context/searchbar.context'
import { shuffle } from '@/utils/data.utils'

interface SearchPageProps {
  articles: SearchResultItem<UnbodyGoogleDoc>[]
  blocks: SearchResultItem<UnbodyTextBlock | UnbodyImageBlock>[]
  topics: string[]
}

export default function SearchPage({
  articles: initialArticles = [],
  blocks: initialBlocks = [],
  topics: allTopics = [],
}: SearchPageProps) {
  const { setResultsNumber, setResultsHelperText } = useSearchBarContext()

  const { setTags } = useSearchBarContext()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTags(allTopics)
  }, [setTags, allTopics])

  const {
    query: { query = '', topics = [] },
  } = router

  const articles = useSearchGeneric<UnbodyGoogleDoc>(
    initialArticles,
    PostTypes.Article,
  )

  const blocks = useSearchGeneric<UnbodyTextBlock | UnbodyImageBlock>(
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

  useEffect(() => {
    if (
      articles.data.length + blocks.data.length <
      initialArticles.length + initialBlocks.length
    ) {
      setResultsNumber(articles.data.length + blocks.data.length)
    }
    const tags = extractTopicsFromQuery(router.query)
    setResultsHelperText(
      [
        ...(query.length > 0 ? [query] : []),
        topics.length > 0
          ? `<span class="tags">${tags
              .map((t) => `<span>[${t}]</span>`)
              .join('<span class="slash">/</span>')}</span>`
          : '',
      ].join(tags.length > 0 ? '<span class="dot">.</span>' : ''),
    )

    return () => {
      setResultsNumber(null)
      setResultsHelperText(null)
    }
  }, [
    query,
    router.query,
    articles,
    blocks,
    setResultsHelperText,
    setResultsNumber,
    topics.length,
  ])

  return (
    <div style={{ minHeight: '80vh' }}>
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
  const { data: blocks = [] } = await unbodyApi.serachBlocks()
  const { data: topics, errors: topicErrors } = await api.getTopics()

  return {
    props: {
      articles,
      blocks: shuffle(blocks),
      topics,
    },
  }
}
