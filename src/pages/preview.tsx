import { CustomNextPage, GetServerSideProps } from 'next'
import SEO from '../components/SEO/SEO'
import { strapiApi } from '../services/strapi'
import { LPE } from '../types/lpe.types'
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
  const type = Array.isArray(ctx.query.type)
    ? ctx.query.type[0]
    : ctx.query.type

  if (!type || !['page', 'post'].includes(type))
    return {
      notFound: true,
    }

  const id = Array.isArray(ctx.query.id) ? ctx.query.id[0] : ctx.query.id
  if (!id)
    return {
      notFound: true,
    }

  if (type === 'post') {
    const { data: shows } = await strapiApi.getPodcastShows({
      populateEpisodes: false,
    })

    const {
      data: { data = [] },
    } = await strapiApi.getPosts({
      id: id,
      published: false,
      parseContent: false,
    })

    const post = data?.[0]
    if (post) {
      return {
        props: {},
        redirect: {
          destination: getPostLink(post.type, {
            id,
            postSlug: post.slug,
            showSlug:
              (post.type === 'podcast' &&
                shows.find(
                  (show) => show.id === (post as LPE.Podcast.Document).showId,
                )?.slug) ||
              '',
          }),
          permanent: false,
        },
        notFound: false,
      }
    }
  } else if (type === 'page') {
    const { data: pages } = await strapiApi.getStaticPages({
      id: id,
      published: false,
      parseContent: false,
    })

    const page = pages?.[0]

    if (page) {
      return {
        props: {},
        redirect: {
          destination: getPostLink(page.type, {
            id,
            postSlug: page.slug,
          }),
          permanent: false,
        },
        notFound: false,
      }
    }
  }

  return {
    notFound: true,
  }
}

export default Page
