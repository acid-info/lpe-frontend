import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import MoreEpisodesCard from './Episode.MoreEpisodesCard'
import { useState } from 'react'

const RelatedEpisodes = ({ relatedEpisodes }: any) => {
  const [showMore, setShowMore] = useState(false)

  return (
    <Container>
      <Typography>More Episodes</Typography>
      <EpisodeCards>
        {relatedEpisodes && showMore
          ? relatedEpisodes.map((episode: any, idx: number) => (
              <MoreEpisodesCard
                key={'related-episode' + idx}
                thumbnail={episode.thumbnail}
                title={episode.title}
                publishedAt={episode.publishedAt}
              />
            ))
          : relatedEpisodes && !showMore
          ? relatedEpisodes
              .slice(0, 4)
              .map((episode: any, idx: number) => (
                <MoreEpisodesCard
                  key={'related-episode' + idx}
                  thumbnail={episode.thumbnail}
                  title={episode.title}
                  publishedAt={episode.publishedAt}
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
