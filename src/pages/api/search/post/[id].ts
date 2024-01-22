import type { NextApiRequest, NextApiResponse } from 'next'
import postSearchService from '../../../../services/post-search.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    query: { id, q = '' },
  } = req

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid request' })
  }

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Invalid request' })
  }

  const result = postSearchService.search(id, q)

  res.status(200).json({
    data: {
      blocks: result,
    },
  })
}
