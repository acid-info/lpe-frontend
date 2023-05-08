import { GetStaticPropsContext } from 'next'
import { ArticleLayout } from '@/layouts/ArticleLayout'
import { ReactNode } from 'react'
import ArticleContainer from '@/containers/ArticleContainer'
import { UnbodyGoogleDoc, UnbodyImageBlock } from '@/lib/unbody/unbody.types'
import api from '@/services/unbody.service'
import { ArticlePostData } from '@/types/data.types'

type ArticleProps = {
  data: ArticlePostData | null
  error: string | null
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { remoteId } = params!
  if (!remoteId) {
    return {
      notFound: true,
    }
  }
  const { data: article, errors } = await api.getArticlePost(remoteId as string)
  return {
    props: {
      data: article,
      error: errors,
    },
  }
}

// @jinho lets handle the error directly in thew page component
const ArticlePage = (props: ArticleProps) => {
  if (!props.data) return <div>Opps...</div>

  return (
    <div>{props.data.title}</div>
    // <ArticleContainer post={props.data}
    //                   error={props.error}
    // />
  )
}

export async function getStaticPaths() {
  const { data: posts, errors } = await api.getAllArticlePostSlugs()
  return {
    paths: errors
      ? []
      : posts.map((post) => ({ params: { remoteId: `${post.remoteId}` } })),
    fallback: true,
  }
}

ArticlePage.getLayout = function getLayout(page: ReactNode) {
  return <ArticleLayout>{page}</ArticleLayout>
}

export default ArticlePage
