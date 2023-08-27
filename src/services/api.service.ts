import { ApiResponse } from '../types/data.types'
import { LPE } from '../types/lpe.types'

export class ApiService {
  getRecentPosts = async ({
    skip = 0,
    limit = 10,
  }: {
    skip?: number
    limit?: number
  }): Promise<ApiResponse<LPE.Post.Document[]>> =>
    fetch(`/api/posts?skip=${skip}&limit=${limit}`)
      .then((res) => res.json())
      .catch((e) => {
        console.error(e)
        return { data: [], errors: JSON.stringify(e) }
      })

  getLatestEpisodes = async ({
    skip = 0,
    limit = 10,
    showSlug,
  }: {
    skip?: number
    limit?: number
    showSlug: string
  }): Promise<ApiResponse<LPE.Podcast.Document[]>> =>
    fetch(`/api/podcasts/${showSlug}/episodes?skip=${skip}&limit=${limit}`)
      .then((res) => res.json())
      .catch((e) => {
        console.error(e)
        return { data: [], errors: JSON.stringify(e) }
      })

  search = async ({
    query = '',
    tags = [],
    type = [],
    limit = 50,
    skip = 0,
  }: {
    query?: string
    tags?: string[]
    limit?: number
    skip?: number
    type?: LPE.ContentType[]
  }): Promise<ApiResponse<LPE.Search.Result>> =>
    fetch(
      `/api/search?skip=${skip}&limit=${limit}&q=${query}&tags=${tags.join(
        ',',
      )}&type=${type.join(',')}`,
    )
      .then((res) => res.json())
      .catch((e) => {
        console.error(e)
        return { data: { posts: [], blocks: [] }, errors: JSON.stringify(e) }
      })

  searchPostBlocks = async ({
    id,
    query = '',
    tags = [],
    limit = 50,
    skip = 0,
  }: {
    id: string
    query?: string
    tags?: string[]
    limit?: number
    skip?: number
  }): Promise<ApiResponse<LPE.Search.Result>> =>
    fetch(
      `/api/search/post/${id}?skip=${skip}&limit=${limit}&q=${query}&tags=${tags.join(
        ',',
      )}`,
    )
      .then((res) => res.json())
      .catch((e) => {
        console.error(e)
        return { data: { posts: [], blocks: [] }, errors: JSON.stringify(e) }
      })
}

export const api = new ApiService()
