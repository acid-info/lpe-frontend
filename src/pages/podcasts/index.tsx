import { SEO } from '@/components/SEO'
import { GetStaticPropsContext } from 'next'
import { ReactNode } from 'react'
import { LPE } from '../../types/lpe.types'
import PodcastsLayout from '@/layouts/PodcastsLayout/Podcasts.layout'
import PodcastsContainer from '@/containers/PodcastsContainer'

import TEMP_DATA from './podcasts-temp-data.json'

type PodcastsProps = {
  shows: LPE.Podcast.Show[]
  latestEpisodes: LPE.Podcast.Document[]
  errors: string | null
}

const PodcastShowPage = ({ shows, latestEpisodes, errors }: PodcastsProps) => {
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
      <PodcastsContainer shows={shows} latestEpisodes={latestEpisodes} />
    </>
  )
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { shows, latestEpisodes } = TEMP_DATA

  if (!shows) {
    return {
      notFound: true,
      props: { why: 'no article' },
    }
  }

  return {
    props: {
      shows,
      latestEpisodes,
    },
  }
}

PodcastShowPage.getLayout = function getLayout(page: ReactNode) {
  return <PodcastsLayout>{page}</PodcastsLayout>
}

export default PodcastShowPage
