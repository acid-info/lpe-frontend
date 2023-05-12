import { GetStaticPropsContext } from 'next'
import { ArticleLayout } from '@/layouts/ArticleLayout'
import { ReactNode } from 'react'
import ArticleContainer from '@/containers/ArticleContainer'
import api from '@/services/unbody.service'
import { ArticlePostData } from '@/types/data.types'
import { SEO } from '@/components/SEO'
import { ArticleProvider } from '@/context/article.context'
import { useRouter } from 'next/router'

type ArticleProps = {
  data: ArticlePostData
  errors: string | null
  why?: string
}

const ArticlePage = ({ data, errors, why }: ArticleProps) => {
  const {
    query: { slug },
  } = useRouter()
  console.log(typeof data, slug, why)
  if (!data) return null
  if (errors) return <div>{errors}</div>

  return (
    <>
      <SEO title={data.article.title} description={data.article.summary} />
      <ArticleContainer data={data} />
    </>
  )
}

export async function getStaticPaths() {
  const { data: posts, errors } = await api.getAllArticlePostSlugs()
  return {
    paths: errors
      ? []
      : posts.map((post) => ({ params: { slug: `${post.slug}` } })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { slug } = params!

  if (!slug) {
    return {
      notFound: true,
      props: { why: 'no slug' },
    }
  }

  const { data: article, errors } = await api.getArticlePost(slug as string)
  if (!article) {
    return {
      notFound: true,
      props: { why: 'no article' },
    }
  }

  article.blocks.sort((a, b) => a.order - b.order)
  const { data: relatedArticles } = await api.getRelatedArticles(
    article._additional.id,
  )
  const { data: articlesFromSameAuthors } =
    await api.getArticlesFromSameAuthors(
      slug as string,
      article.mentions.map((mention) => mention.name),
    )

  return {
    props: {
      data: { article, relatedArticles, articlesFromSameAuthors },
      error: JSON.stringify(errors),
    },
  }
}

ArticlePage.getLayout = function getLayout(page: ReactNode) {
  return (
    <ArticleProvider>
      <ArticleLayout>{page}</ArticleLayout>
    </ArticleProvider>
  )
}

export default ArticlePage
