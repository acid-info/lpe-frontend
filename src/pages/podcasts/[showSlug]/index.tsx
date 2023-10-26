import { SEO } from '@/components/SEO'
import PodcastShowContainer from '@/containers/PodcastShowContainer'
import unbodyApi from '@/services/unbody/unbody.service'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { ApiPaginatedPayload } from '../../../types/data.types'
import { LPE } from '../../../types/lpe.types'
import { getPostLink } from '../../../utils/route.utils'

interface PodcastShowProps {
  show: LPE.Podcast.Show
  latestEpisodes: ApiPaginatedPayload<LPE.Podcast.Document[]>
  highlightedEpisodes: LPE.Podcast.Document[]
  errors: string | null
}

const PodcastShowPage = ({
  show,
  latestEpisodes,
  highlightedEpisodes,
  errors,
}: PodcastShowProps) => {
  const {
    query: { showSlug },
  } = useRouter()

  if (!show) return null
  if (errors) return <div>{errors}</div>

  return (
    <>
      <SEO
        title={show.title}
        description={show.description}
        imageUrl={undefined}
        pagePath={getPostLink('podcast', { showSlug: showSlug as string })}
        tags={[]}
      />
      <PodcastShowContainer
        show={show}
        latestEpisodes={latestEpisodes}
        highlightedEpisodes={highlightedEpisodes}
      />
    </>
  )
}

export async function getStaticPaths() {
  const { data } = await unbodyApi.getPodcastShows({ populateEpisodes: false })

  const paths = data.map((show) => {
    return {
      params: {
        showSlug: show.slug,
      },
    }
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { showSlug } = params!

  if (!showSlug) {
    return {
      notFound: true,
      props: { why: 'no slug' },
      revalidate: 10,
    }
  }

  // TODO : error handling
  const { data: show, errors: podcastShowDataErrors } =
    await unbodyApi.getPodcastShow({
      showSlug: showSlug as string,
    })

  // TODO : error handling
  const { data: latestEpisodes, errors: latestEpisodesErros } =
    await unbodyApi.getLatestEpisodes({
      showSlug: showSlug as string,
      limit: 8,
    })

  // TODO : error handling
  const { data: highlightedEpisodes, errors: highlightedEpisodesErrors } =
    await unbodyApi.getHighlightedEpisodes({
      showSlug: showSlug as string,
      limit: 2,
    })

  return {
    props: {
      show,
      latestEpisodes,
      highlightedEpisodes,
    },
    revalidate: 10,
  }
}

PodcastShowPage.getLayout = function getLayout(page: ReactNode) {
  return <DefaultLayout mainProps={{ spacing: false }}>{page}</DefaultLayout>
}

export default PodcastShowPage
