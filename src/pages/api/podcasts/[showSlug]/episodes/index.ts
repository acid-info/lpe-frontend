import type { NextApiRequest, NextApiResponse } from 'next'
import unbodyApi from '../../../../../services/unbody/unbody.service'
import { parseInt } from '../../../../../utils/data.utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    query: { page = 1, limit = 10, showSlug },
  } = req

  const response = await unbodyApi.getLatestEpisodes({
    page: parseInt(page, 1),
    limit: parseInt(limit, 10),
    showSlug: Array.isArray(showSlug) ? showSlug[0] : showSlug,
  })

  res.status(200).json(response)
}
