import { ApplePodcastsIcon } from '@/components/Icons/ApplePodcastsIcon'
import { GooglePodcastsIcon } from '@/components/Icons/GooglePodcastsIcon'
import { SpotifyIcon } from '@/components/Icons/SpotifyIcon'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { LPE } from '../../../types/lpe.types'
import { lsdUtils } from '../../../utils/lsd.utils'

export type EpisodeChannelProps = {
  channels: LPE.Podcast.Channel[]
}

const renderChannel = (channel: LPE.Podcast.Channel) => {
  switch (channel.name) {
    case LPE.Podcast.ChannelNames.Spotify:
      return (
        <Channel href={channel.url} target="_blank">
          <SpotifyIcon width={16} height={16} />
          <ChannelName variant="body2">Spotify</ChannelName>
        </Channel>
      )
    case LPE.Podcast.ChannelNames.ApplePodcasts:
      return (
        <Channel href={channel.url} target="_blank">
          <ApplePodcastsIcon width={16} height={16} />
          <ChannelName variant="body2">Apple Podcasts</ChannelName>
        </Channel>
      )
    case LPE.Podcast.ChannelNames.GooglePodcasts:
      return (
        <Channel href={channel.url} target="_blank">
          <GooglePodcastsIcon width={16} height={16} />
          <ChannelName variant="body2">Google Podcasts</ChannelName>
        </Channel>
      )
    default:
      return null
  }
}

const EpisodeChannels = ({ channels }: EpisodeChannelProps) => {
  return (
    <EpisodeChannelContainer>
      {channels.map((channel, idx) => renderChannel(channel))}
    </EpisodeChannelContainer>
  )
}

const EpisodeChannelContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 32px;

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    margin-top: 24px;
  }
`

const Channel = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
`

const ChannelName = styled(Typography)`
  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    font-size: var(--lsd-body3-fontSize) !important;
    line-height: var(--lsd-body3-lineHeight) !important;
  }
`

export default EpisodeChannels
