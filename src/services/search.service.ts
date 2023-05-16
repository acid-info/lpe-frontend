import { PostTypes } from '@/types/data.types'
import { Console } from 'inspector'

class SearchService {
  constructor() {}

  search = (query: string, tags: string[], postType: PostTypes) => {
    console.log(
      `/api/search/general/${postType}?q=${query}&tags=${tags.join(',')}`,
    )

    return fetch(
      `/api/search/general/${postType}?q=${query}&tags=${tags.join(',')}`,
    )
      .then((res) => res.json())
      .catch((e) => {
        console.error(e)
        return { data: null, errors: JSON.stringify(e) }
      })
  }

  searchArticle = (query: string, tags: string[], slug: string) => {
    return fetch(
      `/api/search/article/${slug}?q=${query}&tags=${tags.join(',')}`,
    )
      .then((res) => res.json())
      .catch((e) => {
        console.error(e)
        return { data: null, errors: JSON.stringify(e) }
      })
  }
}

const searchApi = new SearchService()
export default searchApi
