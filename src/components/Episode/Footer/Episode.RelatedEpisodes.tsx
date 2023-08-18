import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { LPE } from '@/types/lpe.types'
import { PostCard } from '@/components/PostCard'

type props = {
  podcastSlug: string
  relatedEpisodes: LPE.Podcast.Document[]
}

const RelatedEpisodes = ({ podcastSlug, relatedEpisodes }: props) => {
  const [showMore, setShowMore] = useState(false)

  return (
    <Container>
      <Typography>More Episodes</Typography>
      <EpisodeCards>
        {relatedEpisodes && showMore
          ? relatedEpisodes.map((episode: any, idx: number) => (
              <PostCard
                key={'related-episode' + idx}
                contentType={LPE.PostTypes.Podcast}
                data={{
                  authors: episode.authors,
                  date: episode.publishedAt
                    ? new Date(episode.publishedAt)
                    : null,
                  slug: episode.show?.slug
                    ? `${episode.show?.slug}/${episode.slug}`
                    : `${podcastSlug}/${episode.slug}`,
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
            ))
          : relatedEpisodes && !showMore
          ? relatedEpisodes.slice(0, 4).map((episode: any, idx: number) => (
              <PostCard
                key={'related-episode' + idx}
                contentType={LPE.PostTypes.Podcast}
                data={{
                  authors: episode.authors,
                  date: episode.publishedAt
                    ? new Date(episode.publishedAt)
                    : null,
                  slug: episode.show?.slug
                    ? `${episode.show?.slug}/${episode.slug}`
                    : `${podcastSlug}/${episode.slug}`,
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
            ))
          : null}
      </EpisodeCards>
      <ShowButton onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Show less' : 'Show more'}
      </ShowButton>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 72px;
  border-top: 1px solid rgb(var(--lsd-border-primary));
  padding-block: 16px;
  display: flex;
  flex-direction: column;
`

const EpisodeCards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0 16px;
  flex-wrap: wrap;
`

const ShowButton = styled(Button)`
  height: 40px;
  margin-top: 24px;
`

export default RelatedEpisodes
