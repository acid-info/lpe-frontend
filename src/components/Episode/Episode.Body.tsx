import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import EpisodeFooter from './Footer/Episode.Footer'
import EpisodeHeader from './Header/Episode.Header'
import EpisodeTranscript from './Episode.Transcript'

interface Props {
  data: LPE.Podcast.Document
}

export default function EpisodeBody({ data }: Props) {
  const youtube = data?.channels.find(
    (channel) => channel?.name === LPE.Podcast.ChannelNames.Youtube,
  )

  return (
    <EpisodeContainer>
      <EpisodeHeader {...data} url={youtube?.url as string} />
      <EpisodeTranscript data={data} />
      <EpisodeFooter data={data} />
    </EpisodeContainer>
  )
}

const EpisodeContainer = styled.article`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 16px;
  max-width: 700px;
  padding-bottom: 80px;

  @media (min-width: 768px) and (max-width: 1200px) {
  }
`
