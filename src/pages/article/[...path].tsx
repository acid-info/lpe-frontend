import { SEO } from '@/components/SEO'
import ArticleContainer from '@/containers/ArticleContainer'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
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
        noIndex={data.data.isDraft}
        image={data.data.coverImage}
        pagePath={`/article/${slug}`}
        date={data.data.createdAt}
        tags={[
          ...data.data.tags,
          ...data.data.authors.map((author) => author.name),
        ]}
        contentType={LPE.PostTypes.Article}
      />
      <ArticleContainer data={data} />
    </>
  )
}

export async function getStaticPaths() {
  const { data: posts, errors } = await unbodyApi.getArticles({
    skip: 0,
    limit: 50,
    includeDrafts: false,
    highlighted: 'include',
  })

  return {
    paths: errors
      ? []
      : posts.map((post) => ({ params: { path: [post.slug] } })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { path } = params || {}
  const [slug, idProp, id] = (Array.isArray(path) && path) || []

  if (idProp && (idProp !== 'id' || !id)) {
    return {
      notFound: true,
      props: {},
    }
  }

  if (!slug) {
    return {
      notFound: true,
      props: { why: 'no slug' },
    }
  }

  const { data, errors } = await unbodyApi.getArticle({
    parseContent: true,
    slug: slug as string,
    ...(id ? { id, includeDrafts: true } : {}),
  })

  if (!data) {
    return {
      notFound: true,
      props: { why: 'no article' },
      revalidate: 10,
    }
  }

  const { data: relatedArticles } = await unbodyApi.getRelatedArticles({
    id: data.id,
  })

  const { data: articlesFromSameAuthors } =
    await unbodyApi.getArticlesFromSameAuthors({
      slug: slug as string,
      authors: data.authors.map((author) => author.name),
    })

  return {
    props: {
      data: {
        data,
        relatedArticles,
        articlesFromSameAuthors,
      },
      error: JSON.stringify(errors),
    },
    revalidate: 10,
  }
}

export default ArticlePage
