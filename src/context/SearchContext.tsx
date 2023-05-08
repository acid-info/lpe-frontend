import { useArticlesSearch } from '@/hooks/useSearch'
import { UnbodyGoogleDoc } from '@/lib/unbody/unbody.types'
import { SearchResultItem } from '@/types/data.types'
import { ESearchStatus } from '@/types/ui.types'
import { createContext, useContext, useState } from 'react'

type SearchContextType = {
  status: ESearchStatus
  exec: (
    q?: string,
    tags?: string[],
  ) => Promise<SearchResultItem<UnbodyGoogleDoc>[] | null>
}

const SearchContext = createContext<SearchContextType>({
  status: ESearchStatus.NOT_ACTIVE,
  exec: () => {},
} as SearchContextType)

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [status, setStatus] = useState<ESearchStatus>(ESearchStatus.NOT_ACTIVE)
  const { data, loading, search } = useArticlesSearch()

  const exec = async (q: string = '', tags: string[] = []) => {
    setStatus(ESearchStatus.SEARCHING)
    await search(q, tags)
    setStatus(ESearchStatus.IDLE)
    return data
  }

  return (
    <SearchContext.Provider
      value={{
        status,
        exec,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext)
