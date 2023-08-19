import { Tags } from '@/components/Tags'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'
import { LogosCircleIcon } from '@/components/Icons/LogosCircleIcon'
import EpisodeChannels from './Episode.Channels'
import EpisodeStats from '../Episode.Stats'
import EpisodePlayer from './Episode.Player'

export type EpisodeHeaderProps = LPE.Podcast.Document & {
  url: string
  duration: number
}

const EpisodeHeader = ({
  url,
  title,
  description,
  publishedAt,
  tags,
  channels,
  duration,
}: EpisodeHeaderProps) => {
  const date = new Date(publishedAt)

  return (
    <EpisodeHeaderContainer>
      <EpisodePlayer url={url} />
      <EpisodeStats date={date} duration={duration} />
      <EpisodeTitle variant="h1" genericFontFamily="serif" component="h1">
        {title}
      </EpisodeTitle>
      <PodcastName>
        <LogosCircleIcon width={24} height={24} />
        Network State Podcast
      </PodcastName>
      {tags && <Tags tags={tags} />}
      {channels && <EpisodeChannels channels={channels} />}
      {description && (
        <EpisodeSubtitle
          variant="h6"
          genericFontFamily="sans-serif"
          component="div"
        >
          {description}
        </EpisodeSubtitle>
      )}
    </EpisodeHeaderContainer>
  )
}

const EpisodeHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding-top: 32px;
  }
`

const CustomTypography = styled(Typography)`
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: pre-wrap;
`

const EpisodeTitle = styled(Typography)`
  margin-bottom: 16px;
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`

const EpisodeSubtitle = styled(CustomTypography)`
  margin-top: 32px;

  @media (max-width: 768px) {
    font-size: var(--lsd-subtitle1-fontSize);
  }
`

const PodcastName = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`

// 16:9 responsive aspect ratio
const PlayerContainer = styled.div`
  margin-bottom: 32px;
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;

  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export default EpisodeHeader
