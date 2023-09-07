import { CustomNextPage, GetStaticPaths, GetStaticProps } from 'next'
import Error from 'next/error'
import SEO from '../components/SEO/SEO'
import { StaticPage, StaticPageProps } from '../containers/StaticPage'
import unbodyApi from '../services/unbody/unbody.service'

type PageProps = Partial<Pick<StaticPageProps, 'data'>> & {
  error?: string
  notFound?: boolean
}

const Page: CustomNextPage<PageProps> = ({
  data,
  error,
  notFound,
  ...props
}) => {
  if (!data) {
    if (notFound) {
      return <Error statusCode={404} />
    }

    return <Error statusCode={500} />
  }

  return (
    <>
      <SEO
        title={data.page.title}
        description={data.page.subtitle}
        noIndex={data.page.isDraft}
        pagePath={`/${data.page.slug}`}
      />
      <StaticPage data={data} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await unbodyApi.getStaticPages()
  return {
    paths: data.map((page) => ({
      params: {
        path: [page.slug],
      },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const { path } = ctx.params || {}
  const [slug, idProp, id] = (Array.isArray(path) && path) || []

  if (idProp && (idProp !== 'id' || !id)) {
    return {
      notFound: true,
      props: {},
    }
  }

  const { data, errors } = await unbodyApi.getStaticPage({
    slug: slug as string,
    ...(id
      ? {
          id,
          includeDrafts: true,
        }
      : {}),
  })

  if (!data) {
    if (errors && typeof errors === 'string' && errors.includes('not found')) {
      return {
        notFound: true,
        props: {
          notFound: true,
        },
        revalidate: 10,
      }
    }

    console.error(errors)
    return {
      props: {
        error: 'Something went wrong!',
      },
      notFound: false,
      revalidate: 10,
    }
  }

  return {
    props: {
      data: {
        page: data,
      },
    },
    notFound: false,
    revalidate: 10,
  }
}

export default Page
