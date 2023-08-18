import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import EpisodeFooter from './Footer/Episode.Footer'
import EpisodeHeader from './Header/Episode.Header'
import EpisodeTranscript from './Episode.Transcript'
import { playerState } from '../GlobalAudioPlayer/globalAudioPlayer.state'
import { useHookstate } from '@hookstate/core'

interface Props {
  episode: LPE.Podcast.Document
  relatedEpisodes: LPE.Podcast.Document[]
}

export default function EpisodeBody({ episode, relatedEpisodes }: Props) {
  const youtube = episode?.channels.find(
    (channel) => channel?.name === LPE.Podcast.ChannelNames.Youtube,
  )

  const state = useHookstate(playerState)
  const duration = Math.round(state.value.duration / 60)

  return (
    <EpisodeContainer>
      <EpisodeHeader
        {...episode}
        url={youtube?.url as string}
        duration={duration}
      />
      <EpisodeTranscript episode={episode} />
      <EpisodeFooter episode={episode} relatedEpisodes={relatedEpisodes} />
    </EpisodeContainer>
  )
}

const EpisodeContainer = styled.article`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 16px;
  max-width: 700px;

  @media (min-width: 768px) and (max-width: 1200px) {
  }
`
