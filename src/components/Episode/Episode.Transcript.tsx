import { LPE } from '../../types/lpe.types'
import EpisodeBlocks from './Episode.Blocks'
import { Typography } from '@acid-info/lsd-react'

const EpisodeTranscript = ({ data }: { data: LPE.Podcast.Document }) => {
  return (
    <>
      <Typography component="h2" variant="h2">
        Transcript
      </Typography>
      <EpisodeBlocks data={data} />
    </>
  )
}

export default EpisodeTranscript
