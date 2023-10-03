import React, { useContext } from 'react'
import { LPE } from '../../types/lpe.types'

type Block =
  | LPE.Search.ResultItemBase<LPE.Post.TextBlock>
  | LPE.Search.ResultItemBase<LPE.Post.ImageBlock>

export type PostSearchContextType = {
  active?: boolean
  query?: string
  fetching?: boolean
  isInitialLoading?: boolean
  results: Block[]
}

export const PostSearchContext = React.createContext<PostSearchContextType>({
  active: false,
  query: '',
  fetching: false,
  isInitialLoading: true,
  results: [],
})

export const usePostSearch = () =>
  useContext(PostSearchContext) || {
    query: '',
    results: [],
    active: false,
    fetching: false,
  }
