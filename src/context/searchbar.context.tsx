// context for searchbar
import { SearchbarProps } from '@/components/Searchbar/Searchbar'
import { createContext, useContext, useState } from 'react'

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
  const [resultsNumber, setResultsNumber] = useState<number | null>(null)
  const [resultsHelperText, setResultsHelperText] = useState<string | null>(
    null,
  )
  const [tags, setTags] = useState<string[]>([])
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
