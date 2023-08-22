import { playerState } from '@/components/GlobalAudioPlayer/globalAudioPlayer.state'
import { PauseIcon } from '@/components/Icons/PauseIcon'
import { PlayIcon } from '@/components/Icons/PlayIcon'
import { VolumeIcon } from '@/components/Icons/VolumeIcon'
import { LPE } from '@/types/lpe.types'
import { convertSecToMinAndSec } from '@/utils/string.utils'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useHookstate } from '@hookstate/core'
import Image from 'next/image'
import { useState } from 'react'

export type SimplecastPlayerProps = {
  playerRef: React.RefObject<any>
  coverImage: LPE.Podcast.Document['coverImage']
  handlePlay: (state: any) => void
  handlePause: (state: any) => void
}

const SimplecastPlayer = ({
  playerRef,
  coverImage,
  handlePlay,
  handlePause,
}: SimplecastPlayerProps) => {
  const [showVolume, setShowVolume] = useState(false)
  const state = useHookstate(playerState)

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.set((prev) => ({
      ...prev,
      played: parseFloat(e.target.value),
    }))
  }

  const handleSeekMouseUp = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    state.set((prev) => ({ ...prev, seeking: false }))
    const target = e.target as HTMLInputElement
    playerRef.current?.seekTo(parseFloat(target?.value))
  }

  const handleSeekMouseDown = () => {
    state.set((prev) => ({ ...prev, seeking: true }))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.set((prev) => ({ ...prev, volume: parseFloat(e.target.value) }))
  }

  return (
    <Container>
      {coverImage && (
        <ImageContainer>
          <Thumbnail src={coverImage.url} alt={coverImage.alt} fill priority />
        </ImageContainer>
      )}
      <Controls>
        <Buttons>
          <Row>
            <PlayPause onClick={state.value.playing ? handlePause : handlePlay}>
              {state.value.playing ? <PauseIcon /> : <PlayIcon />}
            </PlayPause>
            <TimeContainer>
              <Time variant="body3">
                {convertSecToMinAndSec(state.value.playedSeconds)}
              </Time>
              <Typography variant="body3">/</Typography>
              <Time variant="body3">
                {convertSecToMinAndSec(state.value.duration)}
              </Time>
            </TimeContainer>
          </Row>

          <VolumeContainer onClick={() => setShowVolume((prev) => !prev)}>
            {showVolume && (
              <VolumeGauge>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={state.value.volume}
                  onChange={handleVolumeChange}
                />
              </VolumeGauge>
            )}
            <VolumeIcon />
          </VolumeContainer>
        </Buttons>

        <Seek>
          <SeekInput
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={state.value.played}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            onMouseDown={handleSeekMouseDown}
          />
        </Seek>
      </Controls>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 390px;
`

const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 390px;
`

const Thumbnail = styled(Image)`
  filter: grayscale(100%);
`

const Controls = styled.div`
  display: flex;
  width: calc(100% - 16px);
  flex-direction: column;
  padding: 8px;
  position: absolute;
  bottom: 0;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PlayPause = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  margin-right: 8px;
`

const Seek = styled.div`
  display: flex;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  white-space: pre-wrap;
`

const TimeContainer = styled(Row)`
  gap: 8px;
`

const Time = styled(Typography)`
  width: 32px;
`

const SeekInput = styled.input`
  width: 100%;
`

const VolumeGauge = styled.div`
  position: absolute;
  top: -30px;
`

const VolumeContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
`

export default SimplecastPlayer
