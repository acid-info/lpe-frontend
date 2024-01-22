import lunr from 'lunr'
import { LPE } from '../types/lpe.types'

type Post = {
  index: lunr.Index
}

export class PostSearchService {
  posts: Record<string, Post> = {}

  constructor() {
    this.posts = {}
  }

  index = (post: Pick<LPE.Post.Document, 'id' | 'content'>) => {
    const id = post.id
    delete this.posts[id]

    const index = lunr(function () {
      this.ref('index')
      this.field('text')

      post.content.forEach((block, index) => {
        this.add({
          index,
          text: block.type === 'text' ? block.text : block.caption,
        })
      })
    })

    this.posts[id] = { index }

    return id
  }

  search = (id: string, query: string) => {
    const post = this.posts[id]
    if (!post) return []

    const idx = post.index
    const results = idx.search(query + '~1')

    return results.map((r) => ({
      score: r.score,
      index: parseInt(r.ref, 10),
    }))
  }
}

const postSearchService: PostSearchService = (() => {
  const _globalThis = globalThis as any
  if (!_globalThis.postSearchService)
    _globalThis.postSearchService = new PostSearchService()

  return _globalThis.postSearchService
})()

export default postSearchService as PostSearchService
