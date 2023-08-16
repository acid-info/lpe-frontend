import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import MoreEpisodesCard from './Episode.MoreEpisodesCard'

const EpisodeMoreEpisodes = ({ episodes }: any) => {
  return (
    <Container>
      <Typography>More Episodes</Typography>
      <EpisodeCards>
        {episodes &&
          episodes.map((episode: any, idx: number) => (
            <MoreEpisodesCard
              key={'more-episode' + idx}
              thumbnail={episode.thumbnail}
              title={episode.title}
              publishedAt={episode.publishedAt}
            />
          ))}
      </EpisodeCards>
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
  gap: 16px;
  flex-wrap: wrap;
`

export default EpisodeMoreEpisodes
