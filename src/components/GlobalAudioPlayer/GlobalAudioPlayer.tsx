import { LpeAudioPlayer } from '@/components/LpePlayer/LpeAudioPlayer'
import { CloseIcon, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useHookstate } from '@hookstate/core'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import { PlayerType } from '../LpePlayer/Controls/Controls'
import { episodeState } from './episode.state'
import { playerState } from './globalAudioPlayer.state'

export default function GlobalAudioPlayer() {
  const state = useHookstate(playerState)
  const epState = useHookstate(episodeState)

  const globalPlayerRef = useRef<ReactPlayer>(null)

  // const [showVolume, setShowVolume] = useState(false)

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

  const handleSeekMouseUp = () => {
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
      const offset = 1 / state.value.duration // 1 second in %
      globalPlayerRef.current?.seekTo(state.value.played + offset)
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
          metadata: {
            title: epState.value.title,
            podcast: epState.value.podcast,
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
        playerType={PlayerType.GLOBAL}
      />
      <RightMenu>
        {!!epState.value.coverImage && (
          <Thumbnail
            src={epState.value.coverImage.url}
            alt={epState.value.coverImage.alt}
            height={48}
            width={
              48 *
              (epState.value.coverImage.width / epState.value.coverImage.height)
            }
          />
        )}
        <EpisodeData href={epState.value.path} title={epState.value.title}>
          <Typography variant="body2" genericFontFamily={'serif'}>
            {epState.value.title}
          </Typography>
          <Typography variant="body3">{epState.value.podcast}</Typography>
        </EpisodeData>
        <CloseIconContainer>
          <CloseIcon
            width={16}
            height={16}
            onClick={() =>
              state.set((prev) => ({
                ...prev,
                isEnabled: false,
                playing: false,
              }))
            }
          />
        </CloseIconContainer>
      </RightMenu>
    </Container>
  )
}

const Container = styled.div<{ visible: boolean }>`
  width: 100%;
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

    @media (max-width: 768px) {
      overflow: hidden;
      white-space: nowrap;
    }
  }

  @media (max-width: 768px) {
    padding: 10px 16px;

    > :first-child {
      width: 100%;
    }
  }
`

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 32px;

  @media (max-width: 768px) {
    width: fit-content;
    margin-left: auto;
  }
`

const EpisodeData = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;

  > :first-child {
    width: 85%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    display: none !important;
  }
`

const Thumbnail = styled(Image)`
  margin-right: 16px;

  @media (max-width: 768px) {
    display: none !important;
  }
`

const CloseIconContainer = styled.div`
  margin-left: 43px;

  @media (max-width: 768px) {
    margin-left: 16px;
  }
`
