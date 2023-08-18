import { SEO } from '@/components/SEO'
import EpisodeContainer from '@/containers/EpisodeContainer'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { LPE } from '../../../types/lpe.types'
import EpisodeLayout from '@/layouts/EpisodeLayout/Episode.layout'
import { EpisodeProvider } from '@/context/episode.context'

import unbodyApi from '@/services/unbody/unbody.service'

type EpisodeProps = {
  episode: LPE.Podcast.Document
  relatedEpisodes: LPE.Podcast.Document[]
  errors: string | null
}

const EpisodePage = ({ episode, relatedEpisodes, errors }: EpisodeProps) => {
  const {
    query: { showSlug, epSlug },
  } = useRouter()

  if (!episode) return null
  if (errors) return <div>{errors}</div>

  return (
    <>
      <SEO
        title={episode.title}
        description={episode.description}
        image={episode.coverImage}
        imageUrl={undefined}
        pagePath={`/podcasts/${showSlug}/${epSlug}`}
        tags={[
          ...episode.tags,
          ...episode.authors.map((author) => author.name),
        ]}
      />
      <EpisodeContainer episode={episode} relatedEpisodes={relatedEpisodes} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          showSlug: `hasing-it-out`,
          epSlug: `test-podcast-highlighted`,
        },
      },
    ],
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { showSlug, epSlug } = params!

  if (!epSlug || !showSlug) {
    return {
      notFound: true,
      props: { why: 'no slug' },
    }
  }

  // TODO : error handling
  const { data: episodeData, errors: episodeErros } =
    await unbodyApi.getPodcastEpisode({
      showSlug: showSlug as string,
      slug: epSlug as string,
      textBlocks: true,
    })

  // TODO : error handlings
  const { data: relatedEpisodesData, errors: relatedEpisodesErros } =
    await unbodyApi.getRelatedEpisodes({
      showSlug: showSlug as string,
      id: episodeData?.id as string,
    })

  if (!episodeData) {
    return {
      notFound: true,
      props: { why: 'no article' },
    }
  }

  // TODO : handle undefined values in JSON
  const episode = JSON.parse(JSON.stringify(episodeData).replace(/null/g, '""'))

  // TODO : handle undefined values in JSON
  const relatedEpisodes = JSON.parse(
    JSON.stringify(relatedEpisodesData).replace(/null/g, '""'),
  )

  return {
    props: {
      episode,
      relatedEpisodes,
    },
  }
}

EpisodePage.getLayout = function getLayout(page: ReactNode) {
  return (
    <EpisodeProvider>
      <EpisodeLayout>{page}</EpisodeLayout>
    </EpisodeProvider>
  )
}

export default EpisodePage
