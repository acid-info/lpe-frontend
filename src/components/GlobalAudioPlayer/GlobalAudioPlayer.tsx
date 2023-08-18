import ReactPlayer from 'react-player'
import styled from '@emotion/styled'
import { useMemo, useRef, useState } from 'react'
import { PlayIcon } from '../Icons/PlayIcon'
import { PauseIcon } from '../Icons/PauseIcon'
import { VolumeIcon } from '../Icons/VolumeIcon'
import styles from './GlobalAudioPlayer.module.css'
import { convertSecToMinAndSec } from '@/utils/string.utils'
import { Typography } from '@acid-info/lsd-react'
import { getAudioSourceFromEpisode } from '@/utils/data.utils'
import Image from 'next/image'
import { playerState } from './globalAudioPlayer.state'
import { useHookstate } from '@hookstate/core'
import { episodeState } from './episode.state'

type EpisodeProps = {
  title: string
  podcast: string
  url: string
  thumbnail: string
}

export default function GlobalAudioPlayer() {
  const state = useHookstate(playerState)
  const epState = useHookstate(episodeState)

  const ref = useRef<ReactPlayer>(null)

  const [episode, setEpisode] = useState<EpisodeProps>({
    title: '',
    podcast: '',
    url: '',
    thumbnail: '',
  })

  useMemo(() => {
    const getAudioSource = async () => {
      const response = await getAudioSourceFromEpisode(epState.value.episodeId)

      setEpisode({
        title: response.title,
        podcast: response.podcast.title,
        url: response.ad_free_audio_file_url,
        thumbnail: response.image_url,
      })
    }

    getAudioSource()
  }, [epState])

  const [showVolume, setShowVolume] = useState(false)

  // const handleLoad = (url: string) => {
  //   setState((prev) => ({ ...prev, url, played: 0, loaded: 0, pip: false }))
  // }

  const handlePlay = () => {
    ref.current?.seekTo(state.value.playedSeconds, 'seconds')
    state.set((prev) => ({
      ...prev,
      playing: true,
      playedSeconds: state.value.playedSeconds,
    }))
  }

  const handlePlayPause = () => {
    state.set((prev) => ({ ...prev, playing: !state.value.playing }))
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

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.set((prev) => ({ ...prev, played: parseFloat(e.target.value) }))
  }

  const handleSeekMouseUp = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    state.set((prev) => ({ ...prev, seeking: false }))
    const target = e.target as HTMLInputElement
    ref.current?.seekTo(parseFloat(target?.value))
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
    state.set((prev) => ({
      ...prev,
      playedSeconds: newState.playedSeconds,
      played: newState.played,
      loaded: newState.loaded,
    }))
  }

  return (
    <Container visible={state.value.isEnabled}>
      <AudioPlayer>
        <Buttons>
          <Row>
            <PlayPause onClick={handlePlayPause}>
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

        {/* <button onClick={handleStop}>Stop</button> */}

        <Seek className={styles.audioPlayer}>
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={state.value.played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
        </Seek>
      </AudioPlayer>

      <ReactPlayer
        ref={ref}
        style={{ display: 'none' }}
        url={episode.url}
        width="100%"
        height="100%"
        pip={state.value.pip}
        playing={state.value.playing}
        controls={state.value.controls}
        light={state.value.light}
        loop={state.value.loop}
        playbackRate={state.value.playbackRate}
        volume={state.value.volume}
        muted={state.value.isEnabled ? false : true}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPlay={handlePlay}
        onPause={handlePause}
        onBuffer={() => console.log('onBuffer')}
        onPlaybackRateChange={handleOnPlaybackRateChange}
        onSeek={(e) => console.log('onSeek', e)}
        onEnded={handleEnded}
        onError={(e) => console.log('onError', e)}
        onDuration={handleDuration}
        onProgress={handleProgress}
      />
      <RightMenu>
        <Image
          src={episode.thumbnail}
          alt={episode.thumbnail}
          width={48}
          height={48}
        />
        <EpisodeData>
          <Typography variant="body2">{episode.title}</Typography>
          <Typography variant="body3">{episode.podcast}</Typography>
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
`

const Seek = styled.div`
  display: flex;
  width: 100%;
`

const VolumeGauge = styled.div`
  position: absolute;
  top: -30px;
`

const AudioPlayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 60%;
`

const RightMenu = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: flex-end;
  margin-left: 32px;
  gap: 16px;
`

const PlayPause = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  margin-right: 8px;
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

const EpisodeData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
