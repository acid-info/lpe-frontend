import { SEO } from '@/components/SEO'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { LPE } from '../../../types/lpe.types'
import PodcastsLayout from '@/layouts/PodcastsLayout/Podcasts.layout'

import TEMP_DATA from '../podcasts-temp-data.json'
import PodcastShowContainer from '@/containers/PodcastShowContainer'

interface PodcastShowProps {
  show: LPE.Podcast.Show
  latestEpisodes: LPE.Podcast.Document[]
  errors: string | null
}

const PodcastShowPage = ({
  show,
  latestEpisodes,
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
      <PodcastShowContainer show={show} latestEpisodes={latestEpisodes} />
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
  const { shows, latestEpisodes } = TEMP_DATA
  const { showSlug } = params!

  if (!showSlug) {
    return {
      notFound: true,
      props: { why: 'no slug' },
    }
  }

  return {
    props: {
      show: shows[0],
      latestEpisodes,
      error: null,
    },
  }
}

PodcastShowPage.getLayout = function getLayout(page: ReactNode) {
  return <PodcastsLayout>{page}</PodcastsLayout>
}

export default PodcastShowPage
