import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { PodcastType, PostCard } from '@/components/PostCard/PostCard'

interface Props {
  header?: React.ReactNode
  episodes: LPE.Podcast.Document[]
  podcast: PodcastType
}

export default function EpisodesList({ header, episodes, podcast }: Props) {
  return (
    <EpisodeListContainer>
      {header}
      <EpisodesContainer>
        {/* Featured */}
        {episodes.slice(0, 2).map((episode) => (
          <PostCard
            key={episode.id}
            contentType={LPE.PostTypes.Podcast}
            data={{
              authors: episode.authors,
              date: episode.publishedAt ? new Date(episode.publishedAt) : null,
              slug: `${podcast}/${episode.slug}`,
              title: episode.title,
              coverImage: episode.coverImage,
              tags: episode.tags,
              podcastShowDetails: {
                title: episode.title,
                slug: `${podcast}/${episode.slug}`,
                episodeNumber: episode.episodeNumber,
                podcast: podcast,
              },
            }}
          />
        ))}
      </EpisodesContainer>
      {episodes.length > 2 && (
        <EpisodesContainer>
          {episodes.slice(2, 6).map((episode) => (
            <PostContainer key={episode.id}>
              <PostCard
                key={episode.id}
                contentType={LPE.PostTypes.Podcast}
                data={{
                  authors: episode.authors,
                  date: episode.publishedAt
                    ? new Date(episode.publishedAt)
                    : null,
                  slug: `${podcast}/${episode.slug}`,
                  title: episode.title,
                  coverImage: episode.coverImage,
                  tags: episode.tags,
                  podcastShowDetails: {
                    title: episode.title,
                    slug: `${podcast}/${episode.slug}`,
                    episodeNumber: episode.episodeNumber,
                    podcast: podcast,
                  },
                }}
              />
            </PostContainer>
          ))}
        </EpisodesContainer>
      )}
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

const PostContainer = styled.div`
  border-top: 1px solid rgb(var(--lsd-border-primary));
  padding-top: 24px;
`
