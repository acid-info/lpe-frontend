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
      return <Error statusCode={400} />
    }

    return <Error statusCode={500} />
  }

  return (
    <>
      <SEO
        description={
          data.page.subtitle ||
          'Logos online publishing and blogging platform for writers and readers.'
        }
        title={`${data.page.title} - Logos Press Engine`}
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
        slug: page.slug,
      },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const { data, errors } = await unbodyApi.getStaticPage({
    slug: ctx.params!.slug as string,
  })

  if (!data) {
    if (errors && typeof errors === 'string' && errors.includes('not found')) {
      return {
        notFound: true,
        props: {
          notFound: true,
        },
      }
    }

    console.error(errors)
    return {
      props: {
        error: 'Something went wrong!',
      },
      notFound: false,
    }
  }

  return {
    props: {
      data: {
        page: data,
      },
    },
    notFound: false,
  }
}

export default Page
