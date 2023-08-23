import { LPE } from '@/types/lpe.types'
import { hookstate } from '@hookstate/core'

export type EpisodeState = {
  title: string
  podcast: string
  url: string
  coverImage: LPE.Post.ImageBlock | null
}

export const defaultEpisodeState: EpisodeState = {
  title: '',
  podcast: '',
  url: '',
  coverImage: null,
}

export const episodeState =
  typeof window === 'undefined'
    ? hookstate(defaultEpisodeState)
    : hookstate<EpisodeState>(defaultEpisodeState)
