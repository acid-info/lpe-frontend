import type { NextApiRequest, NextApiResponse } from 'next'
import unbodyApi from '../../../services/unbody/unbody.service'
import { parseInt } from '../../../utils/data.utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    query: { page = 1, limit = 10 },
  } = req

  const response = await unbodyApi.getRecentPosts({
    page: parseInt(page, 1),
    limit: parseInt(limit, 10),
  })

  res.status(200).json(response)
}
