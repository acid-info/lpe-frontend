import styled from '@emotion/styled'
import { PauseIcon } from '@/components/Icons/PauseIcon'
import { PlayIcon } from '@/components/Icons/PlayIcon'
import { convertSecToMinAndSec } from '@/utils/string.utils'
import { Typography } from '@acid-info/lsd-react'
import { MuteIcon } from '@/components/Icons/MuteIcon'
import { VolumeIcon } from '@/components/Icons/VolumeIcon'
import styles from '@/components/GlobalAudioPlayer/GlobalAudioPlayer.module.css'
import React from 'react'
import {
  ControlsTimeTrackProps,
  TimeTrack,
} from '@/components/LpePlayer/Controls/Controls.TimeTrack'

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
  } = props

  return (
    <Container>
      <Buttons>
        <Row>
          <PlayPause onClick={playing ? onPause : onPlay}>
            {playing ? (
              <PauseIcon width={24} height={24} fill={color} />
            ) : (
              <PlayIcon width={24} height={24} fill={color} />
            )}
          </PlayPause>
          <TimeContainer color={color}>
            <Time variant="body3">{convertSecToMinAndSec(playedSeconds)}</Time>
            <Typography variant="body3">/</Typography>
            <Time variant="body3">{convertSecToMinAndSec(duration)}</Time>
          </TimeContainer>
        </Row>
        <Row>
          <VolumeContainer onClick={onVolumeToggle}>
            {muted ? (
              <MuteIcon width={24} height={24} fill={color} />
            ) : (
              <VolumeIcon width={24} height={24} fill={color} />
            )}
          </VolumeContainer>
        </Row>
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
  white-space: pre-wrap;
  gap: 8px;
`

const TimeContainer = styled(Row)<{ color: string }>`
  gap: 8px;

  span {
    color: ${({ color }) => color || 'black'};
  }
`

const Time = styled(Typography)`
  width: 32px;
`
