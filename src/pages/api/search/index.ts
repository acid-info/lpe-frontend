import type { NextApiRequest, NextApiResponse } from 'next'
import { strapiApi } from '../../../services/strapi'
import { LPE } from '../../../types/lpe.types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    query: { q = '', tags: tagsString = '', type: typeString = '' },
  } = req

  const tags =
    typeof tagsString === 'string'
      ? tagsString
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((t) => t.length > 0)
      : undefined

  const validPostTypes: string[] = Object.values(LPE.PostTypes)

  const type =
    typeof typeString === 'string'
      ? typeString
          .split(',')
          .map((t: string) => t.trim())
          .filter((t) => t.length > 0)
      : undefined

  const postTypes = Array.isArray(type)
    ? type.filter((t) => validPostTypes.includes(t))
    : []

  const result: {
    posts: LPE.Search.ResultItem[]
    blocks: LPE.Search.ResultItem[]
  } = {
    posts: [],
    blocks: [],
  }

  if (postTypes.length > 0) {
    const response = await strapiApi.searchPosts({
      tags,
      query: Array.isArray(q) ? q.join(' ').trim() : q.trim(),
      types: postTypes as LPE.PostType[],
      limit: 15,
      skip: 0,
    })

    result.posts.push(...(response.data ?? []))
  }

  res.status(200).json({
    data: result,
  })
}
