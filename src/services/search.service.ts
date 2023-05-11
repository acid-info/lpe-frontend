import { PostTypes } from '@/types/data.types'

class SearchService {
  constructor() {}
  serach = (query: string, tags: string[], postType: PostTypes) => {
    return fetch(`/api/search/${postType}?q=${query}&tags=${tags.join(',')}`)
      .then((res) => res.json())
      .catch((e) => {
        console.error(e)
        return { data: null, errors: JSON.stringify(e) }
      })
  }
}

const searchApi = new SearchService()
export default searchApi
