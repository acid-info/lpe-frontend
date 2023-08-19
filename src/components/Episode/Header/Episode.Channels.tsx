import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'
import { ApplePodcastsIcon } from '@/components/Icons/ApplePodcastsIcon'
import { GooglePodcastsIcon } from '@/components/Icons/GooglePodcastsIcon'
import { SpotifyIcon } from '@/components/Icons/SpotifyIcon'
import Link from 'next/link'

export type EpisodeChannelProps = {
  channels: LPE.Podcast.Channel[]
}

const renderChannel = (channel: LPE.Podcast.Channel) => {
  switch (channel.name) {
    case LPE.Podcast.ChannelNames.Spotify:
      return (
        <Channel href={channel.url} target="_blank">
          <SpotifyIcon width={16} height={16} />
          <Typography variant="body2">Spotify</Typography>
        </Channel>
      )
    case LPE.Podcast.ChannelNames.ApplePodcasts:
      return (
        <Channel href={channel.url} target="_blank">
          <ApplePodcastsIcon width={16} height={16} />
          <Typography variant="body2">Apple Podcasts</Typography>
        </Channel>
      )
    case LPE.Podcast.ChannelNames.GooglePodcasts:
      return (
        <Channel href={channel.url} target="_blank">
          <GooglePodcastsIcon width={16} height={16} />
          <Typography variant="body2">Google Podcasts</Typography>
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

const EpisodeChannelContainer = styled.header`
  display: flex;
  gap: 24px;
  align-items: center;
  margin-top: 32px;

  @media (max-width: 768px) {
    padding-top: 32px;
  }
`

const Channel = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
`

export default EpisodeChannels
