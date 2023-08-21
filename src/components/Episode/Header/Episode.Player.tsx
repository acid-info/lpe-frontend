import styled from '@emotion/styled'
import ReactPlayer from 'react-player'
import { useHookstate } from '@hookstate/core'
import { playerState } from '@/components/GlobalAudioPlayer/globalAudioPlayer.state'
import { useEffect, useRef } from 'react'
import { episodeState } from '@/components/GlobalAudioPlayer/episode.state'
import SimplecastPlayer from './Episode.SimplecastPlayer'
import { LPE } from '@/types/lpe.types'

export type EpisodePlayerProps = {
  channel: LPE.Podcast.Channel
  coverImage: LPE.Podcast.Document['coverImage']
  title: string
  showTitle: string
}

const EpisodePlayer = ({
  channel,
  coverImage,
  title,
  showTitle,
}: EpisodePlayerProps) => {
  const state = useHookstate(playerState)
  const epState = useHookstate(episodeState)

  const isSimplecast = channel?.name === LPE.Podcast.ChannelNames.Simplecast

  const url =
    channel?.name === LPE.Podcast.ChannelNames.Youtube
      ? channel.url
      : (
          channel as Extract<
            LPE.Podcast.Channel,
            { name: typeof LPE.Podcast.ChannelNames.Simplecast }
          >
        ).data.audioFileUrl

  const playerContainerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<ReactPlayer>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        state.set((prev) => ({
          ...prev,
          isEnabled: false,
        }))
      } else {
        state.set((prev) => ({
          ...prev,
          isEnabled: true,
        }))
      }
    })
    observer.observe(playerContainerRef.current as any)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    epState.set({
      episodeId: 'aaa',
      title: title,
      podcast: showTitle,
      url: url,
      coverImage: coverImage ?? null,
    })

    state.set((prev) => ({
      ...prev,
      url: url,
    }))
  }, [url, title, showTitle, coverImage])

  useEffect(() => {
    if (!state.value.isEnabled) {
      playerRef.current?.seekTo(state.value.played)
    }
  }, [state.value.isEnabled])

  const handleProgress = (newState: {
    playedSeconds: number
    played: number
    loaded: number
  }) => {
    if (!state.value.isEnabled) {
      state.set((prev) => ({
        ...prev,
        playedSeconds: newState.playedSeconds,
        played: newState.played,
        loaded: newState.loaded,
      }))
    }
  }

  const handlePlay = () => {
    state.set((prev) => ({ ...prev, playing: true }))
  }

  const handlePause = () => state.set((prev) => ({ ...prev, playing: false }))

  const handleDuration = (duration: number) =>
    state.set((prev) => ({ ...prev, duration }))

  return (
    <>
      {isSimplecast && (
        <SimplecastPlayer
          playerRef={playerRef}
          coverImage={
            epState.value.coverImage as LPE.Podcast.Document['coverImage']
          }
          handlePlay={handlePlay}
          handlePause={handlePause}
        />
      )}
      <PlayerContainer ref={playerContainerRef} isAudio={isSimplecast}>
        <ReactPlayer
          forceAudio={isSimplecast ? true : false}
          ref={playerRef}
          url={state.value.url as string}
          playing={state.value.playing}
          controls={isSimplecast ? false : true}
          volume={state.value.volume}
          muted={state.value.isEnabled ? true : false}
          onProgress={handleProgress}
          onPlay={handlePlay}
          onPause={handlePause}
          onDuration={handleDuration}
        />
      </PlayerContainer>
    </>
  )
}

const PlayerContainer = styled.div<{ isAudio: boolean }>`
  margin-bottom: ${(props) => (props.isAudio ? '0' : '32px')};
  position: relative;
  padding-bottom: ${(props) => (props.isAudio ? '0' : '56.25%')};
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

export default EpisodePlayer
