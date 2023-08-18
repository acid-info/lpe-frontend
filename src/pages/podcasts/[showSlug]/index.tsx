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
  // TODO : dynamic paths
  return {
    paths: [{ params: { showSlug: `hashing-it-out` } }],
    fallback: true,
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

  const { data: showData, errors: podcastShowDataErrors } =
    await unbodyApi.getPodcastShow({
      showSlug: showSlug as string,
    })

  const { data: latestEpisodesData, errors: latestEpisodesErros } =
    await unbodyApi.getLatestEpisodes({
      showSlug: showSlug as string,
      page: 1,
      limit: 12,
    })

  const { data: highlightedEpisodesData, errors: highlightedEpisodesErrors } =
    await unbodyApi.getHighlightedEpisodes({
      showSlug: showSlug as string,
      page: 1,
      limit: 9,
    })

  // TODO : handle undefined values in JSON
  const show = JSON.parse(JSON.stringify(showData).replace(/null/g, '""'))

  // TODO : handle undefined values in JSON
  const latestEpisodes = JSON.parse(
    JSON.stringify(latestEpisodesData).replace(/null/g, '""'),
  )

  // TODO : handle undefined values in JSON
  const highlightedEpisodes = JSON.parse(
    JSON.stringify(highlightedEpisodesData).replace(/null/g, '""'),
  )

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
