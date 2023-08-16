import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import EpisodeBlocks from './Episode.Blocks'
import { Typography } from '@acid-info/lsd-react'
import EpisodeDivider from './Episode.Divider'

const EpisodeTranscript = ({ data }: { data: LPE.Podcast.Document }) => {
  return (
    <>
      <EpisodeDivider />
      <Title component="h6" variant="h6">
        Transcript
      </Title>
      <EpisodeBlocks data={data} />
    </>
  )
}

const Title = styled(Typography)`
  margin-bottom: 8px;
`

export default EpisodeTranscript
