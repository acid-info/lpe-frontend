import type { NextApiRequest, NextApiResponse } from 'next'
import unbodyApi from '../../../services/unbody/unbody.service'
import { LPE } from '../../../types/lpe.types'
import { parseInt } from '../../../utils/data.utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    query: {
      q = '',
      tags: tagsString = '',
      type: typeString = '',

      skip = 0,
      limit = 50,
    },
  } = req

  const tags =
    typeof tagsString === 'string'
      ? tagsString
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((t) => t.length > 0)
      : undefined

  const validPostTypes: string[] = Object.values(LPE.PostTypes)
  const validBlockTypes: string[] = Object.values(LPE.Post.ContentBlockTypes)
  const validTypes = [...validPostTypes, ...validBlockTypes]

  const type =
    typeof typeString === 'string'
      ? typeString
          .split(',')
          .map((t: string) => t.trim())
          .filter((t) => t.length > 0)
      : undefined

  const queryTypes = Array.isArray(type)
    ? type.filter((t) => validTypes.includes(t))
    : []

  const postTypes =
    queryTypes.length > 0
      ? queryTypes.filter((type) => validPostTypes.includes(type))
      : validPostTypes

  const blockTypes =
    queryTypes.length > 0
      ? queryTypes.filter((type) => validBlockTypes.includes(type))
      : validBlockTypes

  const result: {
    posts: LPE.Search.ResultItem[]
    blocks: LPE.Search.ResultItem[]
  } = {
    posts: [],
    blocks: [],
  }

  if (postTypes.length > 0) {
    const response = await unbodyApi.searchPosts({
      tags,
      query: Array.isArray(q) ? q.join(' ') : q,

      type: postTypes as LPE.PostType[],

      limit: parseInt(limit, 50),
      skip: parseInt(skip, 0),
    })

    result.posts.push(...response.data)
  }

  if (blockTypes.length > 0) {
    const response = await unbodyApi.searchPostBlocks({
      tags,
      query: Array.isArray(q) ? q.join(' ') : q,

      postType: postTypes as LPE.PostType[],
      type: blockTypes as LPE.Post.ContentBlockType[],

      limit: parseInt(limit, 50),
      skip: parseInt(skip, 0),
    })

    result.blocks.push(...response.data)
  }

  res.status(200).json(result)
}
