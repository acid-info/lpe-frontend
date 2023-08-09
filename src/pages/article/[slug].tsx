import { SEO } from '@/components/SEO'
import ArticleContainer from '@/containers/ArticleContainer'
import { ArticleProvider } from '@/context/article.context'
import { ArticleLayout } from '@/layouts/ArticleLayout'

import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import unbodyApi from '../../services/unbody/unbody.service'
import { LPE } from '../../types/lpe.types'

type ArticleProps = {
  data: LPE.Article.Document
  errors: string | null
  why?: string
}

const ArticlePage = ({ data, errors, why }: ArticleProps) => {
  const {
    query: { slug },
  } = useRouter()

  if (!data) return null
  if (errors) return <div>{errors}</div>

  return (
    <>
      <SEO
        title={data.data.title}
        description={data.data.summary}
        image={data.data.coverImage}
        imageUrl={undefined}
        pagePath={`/article/${slug}`}
        tags={[
          ...data.data.tags,
          ...data.data.authors.map((author) => author.name),
        ]}
      />
      <ArticleContainer data={data} />
    </>
  )
}

export async function getStaticPaths() {
  const { data: posts, errors } = await unbodyApi.getAllArticlePostSlugs()

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

  const { data, errors } = await unbodyApi.getArticlePost(slug as string, true)

  if (!data) {
    return {
      notFound: true,
      props: { why: 'no article' },
    }
  }

  const { data: relatedArticles } = await unbodyApi.getRelatedArticles(data.id)
  const { data: articlesFromSameAuthors } =
    await unbodyApi.getArticlesFromSameAuthors(
      slug as string,
      data.authors.map((author) => author.name),
    )

  return {
    props: {
      data: {
        data,
        relatedArticles,
        articlesFromSameAuthors,
      },
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
