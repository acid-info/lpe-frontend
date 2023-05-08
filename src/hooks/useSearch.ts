import { UnbodyGoogleDoc } from '@/lib/unbody/unbody.types'
import searchApi from '@/services/search.service'
import { SearchResultItem } from '@/types/data.types'
import { useState } from 'react'

export const useArticlesSearch = () => {
  const [data, setData] = useState<SearchResultItem<UnbodyGoogleDoc>[] | null>(
    null,
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string, tags: string[]) => {
    setLoading(true)
    const result = await searchApi.searchArticles(query, tags)
    setData(result)
    setLoading(false)
  }

  return { data, loading, error, search }
}
