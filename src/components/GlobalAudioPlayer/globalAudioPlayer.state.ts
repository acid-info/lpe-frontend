import { hookstate, State, useHookstate } from '@hookstate/core'

export type PlayerState = {
  isEnabled: boolean
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

export const defaultPlayerState: PlayerState = {
  isEnabled: false,
  url: '',
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
}

export const playerState =
  typeof window === 'undefined'
    ? hookstate(defaultPlayerState)
    : hookstate<PlayerState>(defaultPlayerState)

const wrapPlayerState = (state: State<PlayerState>) => ({
  get: () => state.value,
})

const usePlayerState = () => wrapPlayerState(useHookstate(playerState))

export default usePlayerState
