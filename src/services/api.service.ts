import { ApiResponse } from '../types/data.types'
import { LPE } from '../types/lpe.types'

export class ApiService {
  getRecentPosts = async ({
    page = 1,
    limit = 10,
  }: {
    page?: number
    limit?: number
  }): Promise<ApiResponse<LPE.Post.Document[]>> =>
    fetch(`/api/posts?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .catch((e) => {
        console.error(e)
        return { data: [], errors: JSON.stringify(e) }
      })

  getLatestEpisodes = async ({
    page = 1,
    limit = 10,
    showSlug,
  }: {
    page?: number
    limit?: number
    showSlug: string
  }): Promise<ApiResponse<LPE.Podcast.Document[]>> =>
    fetch(`/api/podcasts/${showSlug}/episodes?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .catch((e) => {
        console.error(e)
        return { data: [], errors: JSON.stringify(e) }
      })
}

export const api = new ApiService()
