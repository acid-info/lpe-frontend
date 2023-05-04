import { NextPage } from 'next'
import { ArticleLayout } from '@/layouts/ArticleLayout'
import { ReactNode } from 'react'

type Props = NextPage<{}>

const ArticlePage = (props: Props) => {
  return <article>article</article>
}

ArticlePage.getLayout = function getLayout(page: ReactNode) {
  return <ArticleLayout>{page}</ArticleLayout>
}

export default ArticlePage
