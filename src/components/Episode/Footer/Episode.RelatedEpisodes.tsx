import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { LPE } from '@/types/lpe.types'
import { PostCard } from '@/components/PostCard'
import { Grid, GridItem } from '@/components/Grid/Grid'

type props = {
  podcastSlug: string
  relatedEpisodes: LPE.Podcast.Document[]
}

const DEFAULT_SHOW_INDEX = 4

const RelatedEpisodes = ({ podcastSlug, relatedEpisodes }: props) => {
  const [showMore, setShowMore] = useState(false)
  const [showIndex, setShowIndex] = useState(DEFAULT_SHOW_INDEX)

  const toggleShowMore = () => {
    setShowMore(!showMore)
    setShowIndex(!showMore ? relatedEpisodes.length - 1 : DEFAULT_SHOW_INDEX)
  }

  return (
    <Container>
      <Typography>More Episodes</Typography>
      <EpisodeCards>
        {relatedEpisodes.slice(0, showIndex).map((episode, idx: number) => (
          <PostCardContainer className="w-8" key={'related-episode' + idx}>
            <PostCard
              size="xsmall"
              displayPodcastShow={false}
              contentType={LPE.PostTypes.Podcast}
              data={{ ...PostCard.toData(episode), tags: [] }}
            />
          </PostCardContainer>
        ))}
      </EpisodeCards>
      {relatedEpisodes?.length > 4 && (
        <ShowButton onClick={toggleShowMore}>
          {showMore ? 'Show less' : 'Show more'}
        </ShowButton>
      )}
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

const EpisodeCards = styled(Grid)`
  gap: 0 16px;
`

const ShowButton = styled(Button)`
  height: 40px;
  margin-top: 24px;
`

const PostCardContainer = styled(GridItem)`
  padding-top: 24px;
`

export default RelatedEpisodes
