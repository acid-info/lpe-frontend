import { SEO } from '@/components/SEO'
import PodcastsContainer from '@/containers/PodcastsContainer'
import unbodyApi from '@/services/unbody/unbody.service'
import { GetStaticPropsContext } from 'next'
import { ReactNode } from 'react'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { LPE } from '../../types/lpe.types'

type PodcastsProps = {
  shows: LPE.Podcast.Show[]
  latestEpisodes: LPE.Podcast.Document[]
  highlightedEpisodes: LPE.Podcast.Document[]
  errors: string | null
}

const PodcastShowPage = ({
  shows,
  latestEpisodes,
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
        latestEpisodes={latestEpisodes}
        highlightedEpisodes={highlightedEpisodes}
      />
    </>
  )
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  // TODO : error handling
  const { data: podcastShows, errors: podcastShowsErrors } =
    await unbodyApi.getPodcastShows({ populateEpisodes: false })

  // TODO : error handling
  const { data: highlightedEpisodes, errors: highlightedEpisodesErrors } =
    await unbodyApi.getHighlightedEpisodes({})

  const { data: latestEpisodes } = await unbodyApi.getPodcastEpisodes({
    limit: 10,
    populateShow: true,
    highlighted: 'exclude',
  })

  if (!podcastShows) {
    return {
      notFound: true,
      props: { why: 'no podcasts' },
    }
  }

  return {
    props: {
      shows: podcastShows,
      highlightedEpisodes,
      latestEpisodes: latestEpisodes.map((ep) => ({ ...ep, show: null })),
      // errors,
    },
  }
}

PodcastShowPage.getLayout = function getLayout(page: ReactNode) {
  return <DefaultLayout mainProps={{ spacing: false }}>{page}</DefaultLayout>
}

export default PodcastShowPage
