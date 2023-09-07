import { CustomNextPage, GetServerSideProps } from 'next'
import SEO from '../components/SEO/SEO'
import unbodyApi from '../services/unbody/unbody.service'
import { getPostLink } from '../utils/route.utils'

type PageProps = {}

const Page: CustomNextPage<PageProps> = (props) => {
  return (
    <>
      <SEO />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Array.isArray(ctx.query.id) ? ctx.query.id[0] : ctx.query.id
  if (!id)
    return {
      notFound: true,
    }

  const { data, errors } = await unbodyApi.getDocById({
    id,
    includeDrafts: true,
  })

  if (!data || errors) {
    return {
      notFound: typeof errors === 'string' && errors.includes('Not found'),
      props: {},
    }
  }

  return {
    props: {},
    redirect: {
      destination: getPostLink(data.type, {
        id,
        postSlug: data.slug,
        showSlug: (data.type === 'podcast' && data.show?.slug) || null,
      }),
      permanent: false,
    },
  }
}

export default Page
