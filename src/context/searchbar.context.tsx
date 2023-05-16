// context for searchbar
import { SearchbarProps } from '@/components/Searchbar/Searchbar'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type SearchBarContext = SearchbarProps & {
  resultsNumber: number | null
  setResultsNumber: (resultsNumber: number | null) => void
  resultsHelperText: string | null
  setResultsHelperText: (resultsHelperText: string | null) => void
  tags: string[]
  setTags: (tags: string[]) => void
}

const SearchBarContext = createContext<SearchBarContext>({
  resultsNumber: null,
  setResultsNumber: () => {},
  resultsHelperText: null,
  setResultsHelperText: () => {},
  tags: [],
  setTags: () => {},
})

export const SearchBarProvider = ({ children }: any) => {
  const router = useRouter()
  const [resultsNumber, setResultsNumber] = useState<number | null>(null)
  const [resultsHelperText, setResultsHelperText] = useState<string | null>(
    null,
  )
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    router.events.on('routeChangeStart', resetResults)
    return () => {
      router.events.off('routeChangeStart', resetResults)
    }
  }, [router])

  const resetResults = () => {
    setResultsNumber(null)
    setResultsHelperText(null)
  }

  return (
    <SearchBarContext.Provider
      value={{
        resultsNumber,
        setResultsNumber,
        resultsHelperText,
        setResultsHelperText,
        tags,
        setTags,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  )
}

// Export context
export default SearchBarContext

export const useSearchBarContext = () =>
  useContext<SearchBarContext>(SearchBarContext)
