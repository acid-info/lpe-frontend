import {
  UnbodyGoogleDoc,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'
import searchApi from '@/services/search.service'
import {
  SearchHook,
  SearchHookDataPayload,
  SearchResultItem,
  SearchResults,
} from '@/types/data.types'
import { useState } from 'react'

export const useSearchGeneric = <T>(
  initialData: SearchResultItem<T>[],
): SearchHook<T> => {
  const [data, setData] = useState<SearchResultItem<T>[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string, tags: string[]) => {
    if (loading) return null
    setLoading(true)
    const result = await searchApi.searchArticles(query, tags)
    setData(result.data)
    setLoading(false)
    return result.data
  }

  const reset = (_initialData: SearchResultItem<T>[]) => {
    setData(_initialData)
    setLoading(false)
    setError(null)
  }
  return { data, loading, error, search, reset }
}

export const useSearch = (
  initialData: SearchHookDataPayload,
): SearchResults => {
  const articles = useSearchGeneric<UnbodyGoogleDoc>(
    initialData?.articles ?? null,
  )
  const blocks = useSearchGeneric<UnbodyImageBlock | UnbodyTextBlock>(
    initialData?.blocks ?? null,
  )

  const search = async (query: string, tags: string[]) => {
    const [articlesResult, blocksResult] = await Promise.all([
      articles.loading ? () => {} : articles.search(query, tags),
      blocks.loading ? () => {} : blocks.search(query, tags),
    ])
  }

  const reset = (initialData: SearchHookDataPayload) => {
    articles.reset(initialData?.articles)
    blocks.reset(initialData?.blocks)
  }

  return { search, reset, blocks, articles }
}
