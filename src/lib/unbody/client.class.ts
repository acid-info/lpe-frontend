import axios, { Axios } from 'axios'
import { UnbodyExploreArgs } from './unbody.types'

export class UnbodyClient {
  public client: Axios
  static UNBODY_GRAPHQL_ENDPOINT = 'https://graphql.unbody.io'

  constructor(apiKey: string | undefined, projectId: string | undefined) {
    if (!apiKey) throw new Error('Unbody client: apiKey is required')
    if (!projectId) throw new Error('Unbody client: projectId is required')

    this.client = axios.create({
      baseURL: UnbodyClient.UNBODY_GRAPHQL_ENDPOINT,
      headers: {
        Authorization: apiKey,
        'X-Project-id': projectId,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }
  async request<T>(query: string): Promise<T> {
    const { data } = await this.client.post<T>('', { query })
    return data
  }
}
