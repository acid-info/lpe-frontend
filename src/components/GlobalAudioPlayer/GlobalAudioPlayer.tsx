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

type StateProps = {
  url: string | null
  pip: boolean
  playing: boolean
  playedSeconds: number
  controls: boolean
  light: boolean
  volume: number
  muted: boolean
  played: number
  loaded: number
  duration: number
  playbackRate: number
  loop: boolean
  seeking: boolean
}

// Hasing it out episodes: https://api.simplecast.com/podcasts/b54c0885-7c72-415d-b032-7d294b78d785/episodes?preview=true
const TEMP_EPISODE_ID = '30d4e2f5-4434-419c-8fc1-a76e4b367e20'

type Props = {
  episodeId: string
}

type EpisodeProps = {
  title: string
  podcast: string
  url: string
  thumbnail: string
}

export default function GlobalAudioPlayer({ episodeId }: Props) {
  const ref = useRef<ReactPlayer>(null)
  const [episode, setEpisode] = useState<EpisodeProps>({
    title: '',
    podcast: '',
    url: '',
    thumbnail: '',
  })

  useMemo(() => {
    const getAudioSource = async () => {
      const response = await getAudioSourceFromEpisode(
        episodeId || TEMP_EPISODE_ID,
      )

      setEpisode({
        title: response.title,
        podcast: response.podcast.title,
        url: response.ad_free_audio_file_url,
        thumbnail: response.image_url,
      })
    }

    getAudioSource()
  }, [episodeId])

  const [state, setState] = useState<StateProps>({
    url: episode.url,
    pip: false,
    playing: false,
    playedSeconds: 0,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    seeking: false,
  })

  const [showVolume, setShowVolume] = useState(false)

  // const handleLoad = (url: string) => {
  //   setState((prev) => ({ ...prev, url, played: 0, loaded: 0, pip: false }))
  // }

  const handlePlay = () => {
    setState((prev) => ({ ...prev, playing: true }))
  }

  const handlePlayPause = () => {
    setState((prev) => ({ ...prev, playing: !state.playing }))
  }

  // const handleStop = () => {
  //   setState((prev) => ({ ...prev, url: null, playing: false }))
  // }

  const handleEnded = () => {
    setState((prev) => ({ ...prev, playing: prev.loop }))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, volume: parseFloat(e.target.value) }))
  }

  // const handleToggleMuted = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setState((prev) => ({ ...prev, muted: !state.muted }))
  // }

  // const handleSetPlaybackRate = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setState((prev) => ({ ...prev, playbackRate: parseFloat(e.target.value) }))
  // }

  const handlePause = () => {
    setState((prev) => ({ ...prev, playing: false }))
  }

  const handleSeekMouseDown = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    setState((prev) => ({ ...prev, seeking: true }))
  }

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, played: parseFloat(e.target.value) }))
  }

  const handleSeekMouseUp = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    setState((prev) => ({ ...prev, seeking: false }))
    const target = e.target as HTMLInputElement
    ref.current?.seekTo(parseFloat(target?.value))
  }

  const handleDuration = (duration: number) => {
    setState((prev) => ({ ...prev, duration }))
  }

  const handleOnPlaybackRateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setState((prev) => ({ ...prev, playbackRate: parseFloat(e.target.value) }))
  }

  const handleProgress = (newState: { playedSeconds: number }) => {
    setState((prev) => ({ ...prev, playedSeconds: newState.playedSeconds }))
  }

  return (
    <Container>
      <AudioPlayer>
        <Buttons>
          <Row>
            <PlayPause onClick={handlePlayPause}>
              {state.playing ? <PauseIcon /> : <PlayIcon />}
            </PlayPause>
            <TimeContainer>
              <Time variant="body3">
                {convertSecToMinAndSec(state.playedSeconds)}
              </Time>
              <Typography variant="body3">/</Typography>
              <Time variant="body3">
                {convertSecToMinAndSec(state.duration)}
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
                  value={state.volume}
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
            value={state.played}
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
        pip={state.pip}
        playing={state.playing}
        controls={state.controls}
        light={state.light}
        loop={state.loop}
        playbackRate={state.playbackRate}
        volume={state.volume}
        muted={state.muted}
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
          width={86}
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

const Container = styled.div`
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
