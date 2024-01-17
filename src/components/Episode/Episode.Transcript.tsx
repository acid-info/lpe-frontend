import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import EpisodeBlocks from './Episode.Blocks'

const EpisodeTranscript = ({ episode }: { episode: LPE.Podcast.Document }) => {
  if (episode.content.length === 0) return <></>

  return (
    <Container>
      <Title variant={'h5'} genericFontFamily={'serif'}>
        Timestamps
      </Title>
      <EpisodeBlocks data={episode} />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 32px;
`
const Title = styled(Typography)`
  margin-bottom: 32px;
`

export default EpisodeTranscript
