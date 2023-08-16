import { Tags } from '@/components/Tags'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'
import ReactPlayer from 'react-player'
import { default as Stats } from '@/components/Article/Article.Stats'
import { LogosCircleIcon } from '@/components/Icons/LogosCircleIcon'
import { useHookstate } from '@hookstate/core'
import { playerState } from '@/components/GlobalAudioPlayer/globalAudioPlayer.state'

export type EpisodeHeaderProps = LPE.Podcast.Document & {
  url: string
  readingTime: number
}

const EpisodeHeader = ({
  title,
  description,
  publishedAt,
  tags,
  url,
  readingTime,
}: EpisodeHeaderProps) => {
  const date = new Date(publishedAt)
  const state = useHookstate(playerState)

  return (
    <EpisodeHeaderContainer>
      <PlayerContainer>
        <ReactPlayer
          url={url}
          muted={state.value.isEnabled ? true : false}
          onProgress={(newState: { playedSeconds: number }) => {
            state.set((prev) => ({
              ...prev,
              playedSeconds: newState.playedSeconds,
            }))
          }}
          onPlay={() =>
            state.set((prev) => ({
              ...prev,
              playing: true,
              isEnabled: true,
            }))
          }
          onPause={() => state.set((prev) => ({ ...prev, playing: false }))}
        />
      </PlayerContainer>
      <Stats date={date} readingLength={readingTime} />
      <EpisodeTitle variant="h1" genericFontFamily="serif" component="h1">
        {title}
      </EpisodeTitle>
      <PodcastName>
        <LogosCircleIcon width={24} height={24} />
        Network State Podcast
      </PodcastName>
      {tags && <Tags tags={tags} />}
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
