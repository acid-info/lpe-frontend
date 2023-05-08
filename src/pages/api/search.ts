import api from '@/services/unbody.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    query: { q = '', tags: tagsString = '' },
  } = req
  const tags =
    typeof tagsString === 'string'
      ? tagsString
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((t) => t.length > 0)
      : undefined
  const response = await api.searchArticles(q as string, tags)
  res.status(200).json(response)
}
