import { PostTypes } from '@/types/data.types'
import type { NextApiRequest, NextApiResponse } from 'next'
import unbodyApi from '../../../../services/unbody/unbody.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    query: { q = '', tags: tagsString = '', postType },
  } = req
  if (!Object.values(PostTypes).includes(postType as PostTypes)) {
    return res.status(400).json({ error: 'Invalid postType' })
  }

  const tags =
    typeof tagsString === 'string'
      ? tagsString
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((t) => t.length > 0)
      : undefined
  const response =
    postType === PostTypes.Article
      ? await unbodyApi.searchArticles(q as string, tags)
      : await unbodyApi.searchBlocks({ q: q as string, tags })

  res.status(200).json(response)
}
