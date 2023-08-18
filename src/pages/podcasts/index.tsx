import { SEO } from '@/components/SEO'
import { GetStaticPropsContext } from 'next'
import { ReactNode } from 'react'
import { LPE } from '../../types/lpe.types'
import PodcastsLayout from '@/layouts/PodcastsLayout/Podcasts.layout'
import PodcastsContainer from '@/containers/PodcastsContainer'

import TEMP_DATA from './podcasts-temp-data.json'
import unbodyApi from '@/services/unbody/unbody.service'

type PodcastsProps = {
  shows: LPE.Podcast.Show[]
  highlightedEpisodes: LPE.Podcast.Document[]
  errors: string | null
}

const PodcastShowPage = ({
  shows,
  highlightedEpisodes,
  errors,
}: PodcastsProps) => {
  if (!shows) return null
  if (errors) return <div>{errors}</div>

  return (
    <>
      <SEO
        title={'Logos Podcasts'}
        description={'Description'}
        imageUrl={undefined}
        pagePath={`/podcasts`}
        tags={[]}
      />
      <PodcastsContainer
        shows={shows}
        highlightedEpisodes={highlightedEpisodes}
      />
    </>
  )
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  // TODO : error handling
  const { data: podcastShowsData, errors: podcastShowsErrors } =
    await unbodyApi.getPodcastShows({ populateEpisodes: true })

  // TODO : error handling
  const { data: highlightedEpisodesData, errors: highlightedEpisodesErrors } =
    await unbodyApi.getHighlightedEpisodes({})

  if (!podcastShowsData) {
    return {
      notFound: true,
      props: { why: 'no podcasts' },
    }
  }

  // TODO : handle undefined values in JSON
  const podcastShows = JSON.parse(
    JSON.stringify(podcastShowsData).replace(/null/g, '""'),
  )

  // TODO : handle undefined values in JSON
  const highlightedEpisodes = JSON.parse(
    JSON.stringify(highlightedEpisodesData).replace(/null/g, '""'),
  )

  return {
    props: {
      shows: podcastShows,
      highlightedEpisodes,
      // errors,
    },
  }
}

PodcastShowPage.getLayout = function getLayout(page: ReactNode) {
  return <PodcastsLayout>{page}</PodcastsLayout>
}

export default PodcastShowPage
