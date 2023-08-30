import { SEO } from '@/components/SEO'
import EpisodeContainer from '@/containers/EpisodeContainer'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { LPE } from '../../../types/lpe.types'

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
  const { data } = await unbodyApi.getPodcastShows({ populateEpisodes: true })

  const paths = data.flatMap((show) => {
    return (
      show?.episodes &&
      show.episodes.map((episode) => {
        return {
          params: {
            showSlug: show.slug,
            epSlug: episode.slug,
          },
        }
      })
    )
  })

  return {
    paths: paths,
    fallback: false,
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
  const { data: episode, errors: episodeErros } =
    await unbodyApi.getPodcastEpisode({
      showSlug: showSlug as string,
      slug: epSlug as string,
      textBlocks: true,
    })

  // TODO : error handlings
  const { data: relatedEpisodes, errors: relatedEpisodesErros } =
    await unbodyApi.getRelatedEpisodes({
      showSlug: showSlug as string,
      id: episode?.id as string,
    })

  if (!episode) {
    return {
      notFound: true,
      props: { why: 'no article' },
    }
  }

  return {
    props: {
      episode,
      relatedEpisodes,
    },
  }
}

export default EpisodePage
