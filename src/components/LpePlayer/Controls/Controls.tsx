import styles from '@/components/GlobalAudioPlayer/GlobalAudioPlayer.module.css'
import { MuteIcon } from '@/components/Icons/MuteIcon'
import { PauseIcon } from '@/components/Icons/PauseIcon'
import { PlayIcon } from '@/components/Icons/PlayIcon'
import { VolumeIcon } from '@/components/Icons/VolumeIcon'
import {
  ControlsTimeTrackProps,
  TimeTrack,
} from '@/components/LpePlayer/Controls/Controls.TimeTrack'
import { convertSecToMinAndSec } from '@/utils/string.utils'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { lsdUtils } from '../../../utils/lsd.utils'

export enum PlayerType {
  GLOBAL = 'global',
  SIMPLECAST = 'simplecast',
}

export interface LpeAudioPlayerControlsProps {
  duration: number
  playedSeconds: number
  playing: boolean
  muted: boolean
  played: number
  onPause: () => void
  onPlay: () => void
  onVolumeToggle: () => void
  allowFullScreen?: boolean
  color?: string

  timeTrackProps: ControlsTimeTrackProps
  playerType?: PlayerType
  metadata?: { title: string; podcast: string }
}

export const LpeAudioPlayerControls = (props: LpeAudioPlayerControlsProps) => {
  const {
    duration,
    playedSeconds,
    playing,
    muted,
    played,
    onPause,
    onPlay,
    color = 'rgba(var(--lsd-surface-secondary), 1)',
    onVolumeToggle,
    allowFullScreen = false,
    timeTrackProps: { onValueChange, onMouseDown, onMouseUp },
    playerType = PlayerType.GLOBAL,
    metadata,
  } = props

  const iconSize = playerType === PlayerType.GLOBAL ? 16 : 24
  const isLightMode =
    playerType === PlayerType.GLOBAL && !!metadata?.title.length

  return (
    <Container>
      <Buttons>
        <Row>
          <PlayPause onClick={playing ? onPause : onPlay}>
            {playing ? (
              <PauseIcon width={iconSize} height={iconSize} fill={color} />
            ) : (
              <PlayIcon width={iconSize} height={iconSize} fill={color} />
            )}
          </PlayPause>
          <Metadata>
            <Title variant="body3">{props.metadata?.title}</Title>
            <Podcast variant="body3">{props.metadata?.podcast}</Podcast>
          </Metadata>
          <TimeContainer isHidden={isLightMode} color={color}>
            <Time variant="body3">{convertSecToMinAndSec(playedSeconds)}</Time>
            <Typography variant="body3">/</Typography>
            <Time variant="body3">{convertSecToMinAndSec(duration)}</Time>
          </TimeContainer>
        </Row>
        <Volume isHidden={isLightMode}>
          <VolumeContainer onClick={onVolumeToggle}>
            {muted ? (
              <MuteIcon width={iconSize} height={iconSize} fill={color} />
            ) : (
              <VolumeIcon width={iconSize} height={iconSize} fill={color} />
            )}
          </VolumeContainer>
        </Volume>
      </Buttons>
      <Seek className={styles.audioPlayer}>
        <TimeTrack
          min={0}
          max={1}
          value={played}
          progressColor={color}
          trackColor={color}
          {...props.timeTrackProps}
        />
      </Seek>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const VolumeContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  cursor: pointer;
`

const Seek = styled.div`
  display: flex;
  width: 100%;
`

const PlayPause = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 0;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
`

const TimeContainer = styled(Row)<{ color: string; isHidden: boolean }>`
  gap: 8px;

  span {
    color: ${({ color }) => color || 'black'};
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  }
`

const Time = styled(Typography)`
  width: 32px;
`

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;

  overflow: hidden;
  text-overflow: ellipsis;

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'up')} {
    display: none;
  }
`

const Title = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Podcast = styled(Typography)`
  font-size: 10px;
`

const Volume = styled(Row)<{ isHidden: boolean }>`
  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  }
`
