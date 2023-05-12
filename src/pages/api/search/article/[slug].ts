import api from '@/services/unbody.service'
import { PostTypes } from '@/types/data.types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    query: { q = '', tags: tagsString = '', slug },
  } = req
  if (!slug) {
    return res.status(400).json({ error: 'Invalid request' })
  }

  const tags =
    typeof tagsString === 'string'
      ? tagsString
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((t) => t.length > 0)
      : undefined

  const response = await api.searchBlockInArticle(
    q as string,
    tags,
    true,
    slug as string,
  )
  res.status(200).json(response)
}
