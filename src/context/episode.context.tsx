import { useArticleSearch } from '@/hooks/useSearch'
import { SearchHook } from '@/types/data.types'
import { useRouter } from 'next/router'
import { createContext, useContext } from 'react'
import { LPE } from '../types/lpe.types'
import { useSearchBarContext } from './searchbar.context'

type EpisodeContext = SearchHook<LPE.Article.ContentBlock> & {
  onSearch: (query: string, filters: string[]) => void
  onReset: () => void
}

const EpisodeContext = createContext<EpisodeContext>({
  onSearch: () => {},
  data: [],
  loading: false,
  error: null,
  search: () => Promise.resolve([]),
  reset: () => {},
  onReset: () => {},
})

// TODO: useArticleSearch => useEpisodeSearch
export const EpisodeProvider = ({ children }: any) => {
  const {
    query: { slug },
  } = useRouter()

  const blocks = useArticleSearch([])
  const { setResultsNumber, setResultsHelperText } = useSearchBarContext()

  const onSearch = async (query: string = '', filters: string[] = []) => {
    if (query.trim().length == 0) return
    setResultsHelperText('Searching...')
    const res = await blocks.search(query, filters, slug)
    setResultsHelperText(null)
    setResultsNumber(res.length)
  }

  const onReset = async () => {
    setResultsNumber(null)
    setResultsHelperText(null)
    blocks.reset([])
  }

  return (
    <EpisodeContext.Provider
      value={{
        ...blocks,
        onSearch,
        onReset,
      }}
    >
      {children}
    </EpisodeContext.Provider>
  )
}

// Export context
export default EpisodeContext

export const useEpisodeContext = () => useContext(EpisodeContext)
