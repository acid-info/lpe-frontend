import type { NextApiRequest, NextApiResponse } from 'next'
import unbodyApi from '../../../../services/unbody/unbody.service'
import { LPE } from '../../../../types/lpe.types'
import { parseInt } from '../../../../utils/data.utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    query: { id, q = '', tags: tagsString = '', limit = 50, skip = 0 },
  } = req
  if (!id) {
    return res.status(400).json({ error: 'Invalid request' })
  }

  const tags =
    typeof tagsString === 'string'
      ? tagsString
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((t) => t.length > 0)
      : undefined

  const result: LPE.Search.Result = {
    posts: [],
    blocks: [],
  }

  result.blocks = await unbodyApi
    .searchPostBlocks({
      tags,
      type: ['text', 'image'],
      postId: Array.isArray(id) ? id[0] : id,
      query: Array.isArray(q) ? q.join(' ') : q,

      limit: parseInt(limit, 50),
      skip: parseInt(skip, 0),
    })
    .then((res) => res.data)

  res.status(200).json(result)
}
