import React from 'react'

export type ArticleContainerContextType = {
  tocId: string | null
  setTocId: React.Dispatch<React.SetStateAction<string | null>>
}

export const ArticleContainerContext =
  React.createContext<ArticleContainerContextType>(null as any)

export const useArticleContainerContext = () =>
  React.useContext(ArticleContainerContext)
