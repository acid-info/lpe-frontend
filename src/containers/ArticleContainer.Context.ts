import React from 'react'

export type ArticleContainerContextType = {
  tocIndex: number
  setTocIndex: React.Dispatch<React.SetStateAction<number>>
}

export const ArticleContainerContext =
  React.createContext<ArticleContainerContextType>(null as any)

export const useArticleContainerContext = () =>
  React.useContext(ArticleContainerContext)
