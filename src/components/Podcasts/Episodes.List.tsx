import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { PostCard } from '@/components/PostCard/PostCard'
import { Grid, GridItem } from '../Grid/Grid'

interface Props {
  header?: React.ReactNode
  episodes: LPE.Podcast.Document[]
  show?: LPE.Podcast.Show
  divider?: boolean
  isFeatured?: boolean
}

export default function EpisodesList({
  header,
  episodes,
  show,
  divider = false,
  isFeatured = false,
}: Props) {
  return (
    <EpisodeListContainer>
      {header}
      <EpisodesContainer>
        {episodes.map((episode) => (
          <PostCardContainer
            key={episode.id}
            divider={divider}
            className={isFeatured ? 'w-8' : 'w-4'}
          >
            <PostCard
              contentType={LPE.PostTypes.Podcast}
              data={{
                authors: episode.authors,
                date: episode.publishedAt
                  ? new Date(episode.publishedAt)
                  : null,
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
          </PostCardContainer>
        ))}
      </EpisodesContainer>
    </EpisodeListContainer>
  )
}

const EpisodeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`

const EpisodesContainer = styled(Grid)`
  gap: 36px 16px;
`

const PostCardContainer = styled(GridItem)<{ divider: boolean }>`
  padding-block: 24px;
  border-top: ${({ divider }) =>
    divider ? '1px solid rgb(var(--lsd-border-primary))' : 'none'};
`
