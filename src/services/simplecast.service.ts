import axios, { AxiosInstance } from 'axios'

export namespace Simplecast {
  export type DistributionChannel = {
    href: string
    url: string
    id: string
    distribution_channel: {
      href: string
      name: string
      id: string
    }
  }

  export type PodcastDistributionChannels = {
    href: string
    collection: DistributionChannel[]
  }

  export type Podcast = {
    href: string
    title: string
    status: string
    id: string
    episodes: { count: number }
  }

  export type Episode = {
    id: string
    title: string
    duration: number
    slug: string
    href: string
    podcast: Podcast
    audio: {
      href: string
    }
  }
}

export class SimpleCastService {
  client: AxiosInstance

  constructor(private apiKey: string) {
    this.client = axios.create({
      baseURL: 'https://api.simplecast.com',
    })

    this.client.interceptors.request.use(async (config) => {
      config.headers.set('Authorization', this.apiKey)

      return config
    })
  }

  isValidPlayerUrl = (str: string) =>
    /^https?:\/\/player\.simplecast\.com\/[^?\s]+(\?[\s\S]*)?$/.test(str)

  extractEpisodeIdFromUrl = (url: string) =>
    url.match(/^https:\/\/player\.simplecast\.com\/([^\/\?]+)(\?|$)/i)?.[1]

  getEpisode = async ({ id }: { id: string }): Promise<Simplecast.Episode> => {
    const res = await this.client.get(`/episodes/${id}`)
    return res.data
  }

  getDistributionChannels = async ({
    podcastId,
    episodeId,
  }: {
    podcastId?: string
    episodeId?: string
  }): Promise<Simplecast.DistributionChannel[]> => {
    if (!podcastId && !episodeId) throw 'Podcast id or episode id is required'

    const podcast =
      podcastId || (await this.getEpisode({ id: episodeId! }))?.podcast?.id

    if (!podcast) return []

    const res = await this.client.get<Simplecast.PodcastDistributionChannels>(
      `/podcasts/${podcast}/distribution_channels`,
    )

    return res.data.collection
  }
}

export const simplecastApi = new SimpleCastService(
  process.env.SIMPLECAST_ACCESS_TOKEN || '',
)
