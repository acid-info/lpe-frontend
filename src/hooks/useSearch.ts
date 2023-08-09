import searchApi from '@/services/search.service'
import { PostTypes, SearchHook, SearchResultItem } from '@/types/data.types'

import { useState } from 'react'
import { LPE } from '../types/lpe.types'

export const useSearchGeneric = <T>(
  initialData: SearchResultItem<T>[],
  postType: PostTypes,
): SearchHook<T> => {
  const [data, setData] = useState<SearchResultItem<T>[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string, tags: string[]) => {
    if (loading) return Promise.resolve([])
    setLoading(true)
    const result = await searchApi.search(query, tags, postType)
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

export const useArticleSearch = (
  initialData: SearchResultItem<LPE.Article.ContentBlock>[],
): SearchHook<LPE.Article.ContentBlock> => {
  const [data, setData] =
    useState<SearchResultItem<LPE.Article.ContentBlock>[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string, tags: string[], slug: string) => {
    if (loading) return Promise.resolve([])
    setLoading(true)
    const result = await searchApi.searchArticle(query, tags, slug)
    setData(result.data)
    setLoading(false)
    return result.data
  }

  const reset = (
    _initialData: SearchResultItem<LPE.Article.ContentBlock>[],
  ) => {
    setData(_initialData)
    setLoading(false)
    setError(null)
  }
  return { data, loading, error, search, reset }
}
