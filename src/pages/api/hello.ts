import unbody, { getHomepagePosts } from '@/services/unbody.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const data = await getHomepagePosts()
    res.status(200).json(data)
  } catch (e: any) {
    console.log(e)
    res.status(e.response.statusCode || 500).send(e.message)
  }
}
