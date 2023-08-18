import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { PostCard } from '@/components/PostCard/PostCard'

interface Props {
  header?: React.ReactNode
  episodes: LPE.Podcast.Document[]
  show?: LPE.Podcast.Show
}

export default function EpisodesList({ header, episodes, show }: Props) {
  return (
    <EpisodeListContainer>
      {header}
      <EpisodesContainer>
        {episodes.slice(0, 2).map((episode) => (
          <PostCard
            key={episode.id}
            contentType={LPE.PostTypes.Podcast}
            data={{
              authors: episode.authors,
              date: episode.publishedAt ? new Date(episode.publishedAt) : null,
              slug: episode.show?.slug
                ? `${episode.show?.slug}/${episode.slug}`
                : `${show?.slug}/${episode.slug}`,
              title: episode.title,
              coverImage: episode.coverImage,
              tags: episode.tags,
              podcastShowDetails: {
                title: episode.title,
                slug: `${episode.show?.slug}`,
                episodeNumber: episode.episodeNumber,
                podcast: episode.show as LPE.Podcast.Show,
              },
            }}
          />
        ))}
      </EpisodesContainer>
    </EpisodeListContainer>
  )
}

const EpisodeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgb(var(--lsd-border-primary));
  padding-top: 16px;
`

const EpisodesContainer = styled.div`
  display: flex;
  gap: 16px;
  padding-top: 24px;
`
