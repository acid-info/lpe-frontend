import type { NextApiRequest, NextApiResponse } from 'next'
import { strapiApi } from '../../../services/strapi'
import { parseInt } from '../../../utils/data.utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    query: { skip = 0, limit = 10 },
  } = req

  const response = await strapiApi.getRecentPosts({
    skip: parseInt(skip as string, 0),
    limit: parseInt(limit as string, 10),
    highlighted: 'exclude',
  })

  res.status(200).json(response)
}
