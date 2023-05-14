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

interface SearchPageProps {
  articles: SearchResultItem<UnbodyGoogleDoc>[]
  blocks: SearchResultItem<UnbodyTextBlock | UnbodyImageBlock>[]
}

export default function SearchPage({
  articles: initialArticles = [],
  blocks: initialBlocks = [],
}: SearchPageProps) {
  const router = useRouter()
  const hasUpdated = useRef(false)
  const [mounted, setMounted] = useState(false)

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
    if (mounted) {
      const serchArgs = [
        extractQueryFromQuery(router.query),
        extractTopicsFromQuery(router.query),
      ]
      articles.search(...(serchArgs as [string, string[]]))
      blocks.search(...(serchArgs as [string, string[]]))
    } else {
      articles.reset(initialArticles)
      blocks.reset(initialBlocks)
    }
  }, [mounted, router.query])

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

  return {
    props: {
      articles,
      blocks,
    },
  }
}
