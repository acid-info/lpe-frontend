import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import EpisodeBlocks from './Episode.Blocks'
import { Typography } from '@acid-info/lsd-react'
import EpisodeDivider from './Episode.Divider'

const EpisodeTranscript = ({ episode }: { episode: LPE.Podcast.Document }) => {
  return (
    <>
      <EpisodeDivider />
      <Title component="h6" variant="h6">
        Transcript
      </Title>
      <EpisodeBlocks data={episode} />
    </>
  )
}

const Title = styled(Typography)`
  margin-bottom: 8px;
`

export default EpisodeTranscript
