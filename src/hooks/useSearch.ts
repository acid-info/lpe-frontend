import {
  UnbodyGoogleDoc,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'
import searchApi from '@/services/search.service'
import {
  PostTypes,
  SearchHook,
  SearchHookDataPayload,
  SearchResultItem,
} from '@/types/data.types'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

import { useState } from 'react'

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
    const result = await searchApi.serach(query, tags, postType)
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
  initialData: SearchResultItem<UnbodyImageBlock | UnbodyTextBlock>[],
): SearchHook<UnbodyImageBlock | UnbodyTextBlock> => {
  const [data, setData] =
    useState<SearchResultItem<UnbodyImageBlock | UnbodyTextBlock>[]>(
      initialData,
    )
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
    _initialData: SearchResultItem<UnbodyImageBlock | UnbodyTextBlock>[],
  ) => {
    setData(_initialData)
    setLoading(false)
    setError(null)
  }
  return { data, loading, error, search, reset }
}
