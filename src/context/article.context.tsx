import { useArticleSearch } from '@/hooks/useSearch'
import { SearchHook } from '@/types/data.types'
import { useRouter } from 'next/router'
import { createContext, useContext } from 'react'
import { LPE } from '../types/lpe.types'
import { useSearchBarContext } from './searchbar.context'

type ArticleContext = SearchHook<LPE.Article.ContentBlock> & {
  onSearch: (query: string, filters: string[]) => void
  onReset: () => void
}

const ArticleContext = createContext<ArticleContext>({
  onSearch: () => {},
  data: [],
  loading: false,
  error: null,
  search: () => Promise.resolve([]),
  reset: () => {},
  onReset: () => {},
})

export const ArticleProvider = ({ children }: any) => {
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
    <ArticleContext.Provider
      value={{
        ...blocks,
        onSearch,
        onReset,
      }}
    >
      {children}
    </ArticleContext.Provider>
  )
}

// Export context
export default ArticleContext

export const useArticleContext = () => useContext(ArticleContext)
