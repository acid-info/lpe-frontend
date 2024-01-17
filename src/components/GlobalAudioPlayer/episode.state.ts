import { LPE } from '@/types/lpe.types'
import { hookstate } from '@hookstate/core'

export type EpisodeState = {
  title: string
  podcast: string
  url: string
  coverImage: LPE.Image.Document | null
  path: string
}

export const defaultEpisodeState: EpisodeState = {
  title: '',
  podcast: '',
  url: '',
  coverImage: null,
  path: '',
}

export const episodeState =
  typeof window === 'undefined'
    ? hookstate(defaultEpisodeState)
    : hookstate<EpisodeState>(defaultEpisodeState)
