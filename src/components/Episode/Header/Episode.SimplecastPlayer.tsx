import { playerState } from '@/components/GlobalAudioPlayer/globalAudioPlayer.state'
import { LPE } from '@/types/lpe.types'
import styled from '@emotion/styled'
import { useHookstate } from '@hookstate/core'
import { useState } from 'react'
import {
  LpeAudioPlayerControls,
  PlayerType,
} from '@/components/LpePlayer/Controls/Controls'
import { ResponsiveImage } from '@/components/ResponsiveImage/ResponsiveImage'

export type SimplecastPlayerProps = {
  playing: boolean
  played: number
  playedSeconds: number
  playerRef: React.RefObject<any>
  coverImage: LPE.Podcast.Document['coverImage']
  handlePlay: () => void
  handlePause: () => void
}

const SimplecastPlayer = ({
  playing,
  played,
  playedSeconds,
  playerRef,
  coverImage,
  handlePlay,
  handlePause,
}: SimplecastPlayerProps) => {
  const [showVolume, setShowVolume] = useState(false)
  const state = useHookstate(playerState)

  const handleSeekChange = (v: number) => {
    state.set((prev) => ({
      ...prev,
      played: v,
    }))
    playerRef.current?.seekTo(v)
  }

  const handleSeekMouseUp = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    state.set((prev) => ({ ...prev, seeking: false }))
    const target = e.target as HTMLInputElement
    // disabling this line can cause the issue with 1second overlaps when swtiching between players
    // playerRef.current?.seekTo(parseFloat(target?.value))
  }

  const handleSeekMouseDown = () => {
    state.set((prev) => ({ ...prev, seeking: true }))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.set((prev) => ({ ...prev, volume: parseFloat(e.target.value) }))
  }

  return (
    <Container>
      <ImageContainer>
        {coverImage && <ResponsiveImage data={coverImage} />}
      </ImageContainer>
      <ControlsWrapper>
        <Shade />
        <Controls>
          <LpeAudioPlayerControls
            duration={state.value.duration}
            playedSeconds={playedSeconds}
            playing={playing}
            played={played}
            onPause={handlePause}
            onPlay={handlePlay}
            muted={state.value.muted}
            onVolumeToggle={() =>
              state.set((prev) => ({
                ...prev,
                muted: !prev.muted,
              }))
            }
            timeTrackProps={{
              onValueChange: handleSeekChange,
              onMouseUp: handleSeekMouseUp,
              onMouseDown: handleSeekMouseDown,
            }}
            allowFullScreen={true}
            color={'white'}
            playerType={PlayerType.SIMPLECAST}
          />
        </Controls>
      </ControlsWrapper>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56%;
  background: red;

  > * {
    position: absolute;
  }
`

const ImageContainer = styled.div`
  width: 100%;
  top: 0;
`

const ControlsWrapper = styled.div`
  bottom: 0;
  width: 100%;

  > * {
    position: absolute;
    bottom: -1px;
  }
`

const Controls = styled.div`
  padding: 16px;
  left: 0;
  width: calc(100% - 32px);
`

const Shade = styled.div`
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  bottom: 0;
  width: 100%;
  height: 75px;
`

export default SimplecastPlayer
