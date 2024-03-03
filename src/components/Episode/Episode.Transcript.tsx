import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import EpisodeBlocks from './Episode.Blocks'

const EpisodeTranscript = ({ episode }: { episode: LPE.Podcast.Document }) => {
  if (episode.content.length === 0) return <></>

  return (
    <Container>
      <EpisodeBlocks data={episode} />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 64px;
`

export default EpisodeTranscript
