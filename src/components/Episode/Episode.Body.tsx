import styled from '@emotion/styled'
import { useHookstate } from '@hookstate/core'
import { LPE } from '../../types/lpe.types'
import { lsdUtils } from '../../utils/lsd.utils'
import { playerState } from '../GlobalAudioPlayer/globalAudioPlayer.state'
import EpisodeTranscript from './Episode.Transcript'
import EpisodeFooter from './Footer/Episode.Footer'
import EpisodeHeader from './Header/Episode.Header'

interface Props {
  episode: LPE.Podcast.Document
  relatedEpisodes: LPE.Podcast.Document[]
}

export default function EpisodeBody({ episode, relatedEpisodes }: Props) {
  const youtube = episode?.channels.find(
    (channel) => channel?.name === LPE.Podcast.ChannelNames.Youtube,
  )
  const simplecast = episode?.channels.find(
    (channel) => channel?.name === LPE.Podcast.ChannelNames.Simplecast,
  )

  const channel = youtube ?? simplecast ?? null

  const state = useHookstate(playerState)
  const duration = Math.round(state.value.duration / 60)

  return (
    <EpisodeContainer>
      {!!channel && (
        <EpisodeHeader {...episode} channel={channel} duration={duration} />
      )}
      <EpisodeTranscript episode={episode} />
      <EpisodeFooter episode={episode} relatedEpisodes={relatedEpisodes} />
    </EpisodeContainer>
  )
}

const EpisodeContainer = styled.article`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: 696px;

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    margin-top: 32px;
  }
`
