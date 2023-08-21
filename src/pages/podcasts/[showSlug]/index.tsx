import { SEO } from '@/components/SEO'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { LPE } from '../../../types/lpe.types'
import PodcastsLayout from '@/layouts/PodcastsLayout/Podcasts.layout'

import PodcastShowContainer from '@/containers/PodcastShowContainer'
import unbodyApi from '@/services/unbody/unbody.service'

interface PodcastShowProps {
  show: LPE.Podcast.Show
  latestEpisodes: LPE.Podcast.Document[]
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
        pagePath={`/podcasts/${showSlug}`}
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
      page: 1,
      limit: 9,
    })

  // TODO : error handling
  const { data: highlightedEpisodes, errors: highlightedEpisodesErrors } =
    await unbodyApi.getHighlightedEpisodes({
      showSlug: showSlug as string,
      page: 1,
      limit: 2,
    })

  return {
    props: {
      show,
      latestEpisodes,
      highlightedEpisodes,
    },
  }
}

PodcastShowPage.getLayout = function getLayout(page: ReactNode) {
  return <PodcastsLayout>{page}</PodcastsLayout>
}

export default PodcastShowPage
