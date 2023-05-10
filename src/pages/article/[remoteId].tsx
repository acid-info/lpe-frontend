import { GetStaticPropsContext } from 'next'
import { ArticleLayout } from '@/layouts/ArticleLayout'
import { ReactNode } from 'react'
import ArticleContainer from '@/containers/ArticleContainer'
import api from '@/services/unbody.service'
import { ArticlePostData } from '@/types/data.types'
import { SEO } from '@/components/SEO'

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

  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data: article,
      error: errors,
    },
  }
}

// @jinho lets handle the error directly in thew page component
const ArticlePage = (props: ArticleProps) => {
  if (!props.data) return <div style={{ height: '100vh' }} />

  return (
    <>
      <SEO title={props.data.title} description={props.data.summary} />
      <ArticleContainer data={props.data} error={props.error} />
    </>
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
