class SearchService {
  constructor() {}

  searchArticles = (query: string, tags: string[]) => {
    return fetch(`/api/search?q=${query}&tags=${tags.join(',')}`)
      .then((res) => res.json())
      .catch((e) => {
        console.error(e)
        return { data: null, errors: JSON.stringify(e) }
      })
  }
}

const searchApi = new SearchService()
export default searchApi
