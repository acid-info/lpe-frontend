import { GetStaticPropsContext } from 'next'
import { ArticleLayout } from '@/layouts/ArticleLayout'
import { ReactNode } from 'react'
import ArticleContainer from '@/containers/ArticleContainer'
import api from '@/services/unbody.service'
import { ArticlePostData } from '@/types/data.types'
import { SEO } from '@/components/SEO'

type ArticleProps = {
  data: ArticlePostData
  errors: string | null
}

const ArticlePage = ({ data, errors }: ArticleProps) => {
  if (errors) return <div>{errors}</div>
  return (
    <>
      <SEO title={data.title} description={data.summary} />
      <ArticleContainer data={data} />
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
      error: JSON.stringify(errors),
    },
  }
}

ArticlePage.getLayout = function getLayout(page: ReactNode) {
  return <ArticleLayout>{page}</ArticleLayout>
}

export default ArticlePage
