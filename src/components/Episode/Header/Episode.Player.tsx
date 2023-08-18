import styled from '@emotion/styled'
import ReactPlayer from 'react-player'
import { useHookstate } from '@hookstate/core'
import { playerState } from '@/components/GlobalAudioPlayer/globalAudioPlayer.state'
import { useEffect, useRef } from 'react'
import { extractUUIDFromEpisode } from '@/utils/string.utils'
import { getAudioSourceFromEpisode } from '@/utils/data.utils'
import { episodeState } from '@/components/GlobalAudioPlayer/episode.state'
import SimplecastPlayer from './Episode.SimplecastPlayer'

export type EpisodePlayerProps = {
  url: string
}

const EpisodePlayer = ({ url }: EpisodePlayerProps) => {
  const state = useHookstate(playerState)
  const epState = useHookstate(episodeState)

  const playerContainerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<ReactPlayer>(null)

  const isSimplecastRegex =
    /^https?:\/\/([a-zA-Z0-9-]+\.)*simplecast\.com\/[^?\s]+(\?[\s\S]*)?$/

  const isSimplecast = isSimplecastRegex.test(url)
  const simplecastLink = url.match(isSimplecastRegex) ?? []

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
    const episodeId = extractUUIDFromEpisode(simplecastLink[0] ?? '')

    if (isSimplecast) {
      const getAudioSource = async () => {
        const response = await getAudioSourceFromEpisode(episodeId as string)

        epState.set({
          episodeId: episodeId as string,
          title: response.title,
          podcast: response.podcast.title,
          url: response.ad_free_audio_file_url,
          thumbnail: response.image_url,
        })

        state.set((prev) => ({
          ...prev,
          url: response.ad_free_audio_file_url,
        }))
      }
      getAudioSource()
    } else {
      state.set((prev) => ({
        ...prev,
        url,
      }))
    }
  }, [])

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
          title={epState.value.title as string}
          thumbnail={epState.value.thumbnail as string}
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
