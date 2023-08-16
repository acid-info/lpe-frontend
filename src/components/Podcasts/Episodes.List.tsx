import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { Post } from '../Post'
import { PodcastType, PostClassType, PostSize } from '../Post/Post'

interface Props {
  header?: React.ReactNode
  episodes: LPE.Podcast.Document[]
  podcastType: PodcastType
}

export default function EpisodesList({ header, episodes, podcastType }: Props) {
  const firstRow = podcastType === PodcastType.LATEST ? 2 : 4
  const size =
    podcastType === PodcastType.LATEST ? PostSize.LARGE : PostSize.SMALL

  return (
    <EpisodeListContainer>
      {header}
      <EpisodesContainer>
        {episodes.slice(0, firstRow).map((episode) => (
          <Post
            key={episode.id}
            appearance={{
              size: size,
              classType: PostClassType.PODCAST,
            }}
            data={{
              authors: episode.authors,
              date: episode.publishedAt ? new Date(episode.publishedAt) : null,
              slug: episode.slug,
              title: episode.title,
              description: episode.description,
              coverImage: episode.coverImage,
              tags: episode.tags,
              podcast: podcastType, // TODO - get this from the episode
            }}
          />
        ))}
      </EpisodesContainer>
      {podcastType === PodcastType.LATEST && episodes.length > 2 && (
        <EpisodesContainer>
          {episodes.slice(2, 6).map((episode) => (
            <PostContainer key={episode.id}>
              <Post
                appearance={{
                  classType: PostClassType.PODCAST,
                  size: PostSize.SMALL,
                }}
                data={{
                  authors: episode.authors,
                  date: episode.publishedAt
                    ? new Date(episode.publishedAt)
                    : null,
                  slug: episode.slug,
                  title: episode.title,
                  description: episode.description,
                  coverImage: episode.coverImage,
                  tags: episode.tags,
                  podcast: podcastType, // TODO - get this from the episode
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
  margin-top: 140px;
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
