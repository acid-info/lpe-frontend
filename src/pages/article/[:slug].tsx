import { NextPage } from 'next'
import { ArticleLayout } from '@/layouts/ArticleLayout'

type Props = NextPage<{}>

const ArticlePage = (props: Props) => {
  return <article>article</article>
}

ArticlePage.getLayout = function getLayout(page) {
  return <ArticleLayout>{page}</ArticleLayout>
}

export default ArticlePage
