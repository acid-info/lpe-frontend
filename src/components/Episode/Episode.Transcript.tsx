import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import EpisodeBlocks from './Episode.Blocks'

const EpisodeTranscript = ({ episode }: { episode: LPE.Podcast.Document }) => {
  return (
    <Container>
      <EpisodeBlocks data={episode} />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 32px;
`
const Title = styled(Typography)`
  margin-bottom: 8px;
`

export default EpisodeTranscript
