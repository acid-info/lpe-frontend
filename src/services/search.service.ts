class SearchService {
  constructor() {}
  searchArticles = (query: string, tags: string[]) => {
    return fetch(`/api/search?q=${query}&tags=${tags.join(',')}`).then((res) =>
      res.json(),
    )
  }
}

const searchApi = new SearchService()
export default searchApi
