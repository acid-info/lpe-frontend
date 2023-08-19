import { hookstate } from '@hookstate/core'

export type EpisodeState = {
  episodeId: string
  title: string
  podcast: string
  url: string
  thumbnail: string
}

export const defaultEpisodeState: EpisodeState = {
  episodeId: '',
  title: '',
  podcast: '',
  url: '',
  thumbnail: '',
}

export const episodeState =
  typeof window === 'undefined'
    ? hookstate(defaultEpisodeState)
    : hookstate<EpisodeState>(defaultEpisodeState)
