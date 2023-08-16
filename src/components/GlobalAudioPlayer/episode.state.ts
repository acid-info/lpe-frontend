import { hookstate } from '@hookstate/core'

// Hasing it out episodes: https://api.simplecast.com/podcasts/b54c0885-7c72-415d-b032-7d294b78d785/episodes?preview=true
const TEMP_EPISODE_ID = '30d4e2f5-4434-419c-8fc1-a76e4b367e20'

export type EpisodeState = {
  episodeId: string
}

export const defaultEpisodeState: EpisodeState = {
  episodeId: TEMP_EPISODE_ID,
}

export const episodeState =
  typeof window === 'undefined'
    ? hookstate(defaultEpisodeState)
    : hookstate<EpisodeState>(defaultEpisodeState)
