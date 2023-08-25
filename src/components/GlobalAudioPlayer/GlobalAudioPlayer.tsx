import ReactPlayer from 'react-player'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { Typography } from '@acid-info/lsd-react'
import Image from 'next/image'
import { playerState } from './globalAudioPlayer.state'
import { useHookstate } from '@hookstate/core'
import { episodeState } from './episode.state'
import { LpeAudioPlayer } from '@/components/LpePlayer/LpeAudioPlayer'

export default function GlobalAudioPlayer() {
  const state = useHookstate(playerState)
  const epState = useHookstate(episodeState)

  const globalPlayerRef = useRef<ReactPlayer>(null)

  const [showVolume, setShowVolume] = useState(false)

  // const handleLoad = (url: string) => {
  //   setState((prev) => ({ ...prev, url, played: 0, loaded: 0, pip: false }))
  // }

  const handlePlay = () => {
    state.set((prev) => ({
      ...prev,
      playing: true,
    }))
  }

  // const handleStop = () => {
  //   setState((prev) => ({ ...prev, url: null, playing: false }))
  // }

  const handleEnded = () => {
    state.set((prev) => ({ ...prev, playing: prev.loop }))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.set((prev) => ({ ...prev, volume: parseFloat(e.target.value) }))
  }

  // const handleToggleMuted = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setState((prev) => ({ ...prev, muted: !state.muted }))
  // }

  // const handleSetPlaybackRate = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setState((prev) => ({ ...prev, playbackRate: parseFloat(e.target.value) }))
  // }

  const handlePause = () => {
    state.set((prev) => ({ ...prev, playing: false }))
  }

  const handleSeekMouseDown = () => {
    state.set((prev) => ({ ...prev, seeking: true }))
  }

  const handleSeekChange = (v: number) => {
    state.set((prev) => ({ ...prev, played: v }))
    globalPlayerRef.current?.seekTo(v)
  }

  const handleSeekMouseUp = () =>
    // e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    {
      state.set((prev) => ({ ...prev, seeking: false }))
    }

  const handleDuration = (duration: number) => {
    state.set((prev) => ({ ...prev, duration }))
  }

  const handleOnPlaybackRateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    state.set((prev) => ({ ...prev, playbackRate: parseFloat(e.target.value) }))
  }

  const handleProgress = (newState: {
    playedSeconds: number
    played: number
    loaded: number
  }) => {
    if (state.value.isEnabled) {
      state.set((prev) => ({
        ...prev,
        playedSeconds: newState.playedSeconds,
        played: newState.played,
        loaded: newState.loaded,
      }))
    }
  }

  useEffect(() => {
    if (state.value.isEnabled) {
      globalPlayerRef.current?.seekTo(state.value.played)
    }
  }, [state.value.isEnabled])

  return (
    <Container visible={state.value.isEnabled}>
      <LpeAudioPlayer
        controlProps={{
          onVolumeToggle: () =>
            state.set((prev) => ({
              ...prev,
              muted: !prev.muted,
            })),
          duration: state.value.duration,
          played: state.value.played,
          muted: state.value.muted,
          playedSeconds: state.value.playedSeconds,
          onPause: handlePause,
          onPlay: handlePlay,
          playing: state.value.playing,
          timeTrackProps: {
            onValueChange: handleSeekChange,
            onMouseDown: handleSeekMouseDown,
            onMouseUp: handleSeekMouseUp,
            alignTop: true,
            showThumb: false,
          },
        }}
      />
      <ReactPlayer
        forceAudio
        ref={globalPlayerRef}
        style={{ display: 'none' }}
        url={state.value.url as string}
        width="100%"
        height="100%"
        playing={state.value.playing}
        controls={state.value.controls}
        light={state.value.light}
        loop={state.value.loop}
        playbackRate={state.value.playbackRate}
        volume={state.value.volume}
        muted={state.value.muted ? true : state.value.isEnabled ? false : true}
        onPlay={handlePlay}
        onPause={handlePause}
        onPlaybackRateChange={handleOnPlaybackRateChange}
        onEnded={handleEnded}
        onDuration={handleDuration}
        onProgress={handleProgress}
        // onReady={() => console.log('onReady')}
        // onStart={() => console.log('onStart')}
        // onBuffer={() => console.log('onBuffer')}
        // onSeek={(e) => console.log('onSeek', e)}
        // onError={(e) => console.log('onError', e)}
      />
      <RightMenu>
        {!!epState.value.coverImage && (
          <Image
            src={epState.value.coverImage.url}
            alt={epState.value.coverImage.alt}
            width={48}
            height={48}
          />
        )}
        <EpisodeData>
          <Typography variant="body2">{epState.value.title}</Typography>
          <Typography variant="body3">{epState.value.podcast}</Typography>
        </EpisodeData>
      </RightMenu>
    </Container>
  )
}

const Container = styled.div<{ visible: boolean }>`
  width: 100vw;
  height: 80px;
  padding: 22px 16px;
  background: rgb(var(--lsd-surface-primary));
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgb(var(--lsd-border-primary));
  box-sizing: border-box;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};

  > :first-child {
    width: 60%;
  }
`

const RightMenu = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: flex-end;
  margin-left: 32px;
  gap: 16px;
`

const EpisodeData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
