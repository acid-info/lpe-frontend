import { readFile, writeFile } from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

const WEBHOOK_DATA_PATH = path.join(__dirname, '../../webhook_data.json')
const TOKEN = process.env.REVALIDATE_WEBHOOK_TOKEN || ''

export type WebhookData = {
  lastUpdate: number
}

const writeWebhookData = async (data: WebhookData) =>
  await writeFile(WEBHOOK_DATA_PATH, Buffer.from(JSON.stringify(data)))

export const getWebhookData = async (): Promise<WebhookData> =>
  JSON.parse((await readFile(WEBHOOK_DATA_PATH, 'utf-8')) || '{}')

let initialized = false
if (!initialized) writeWebhookData({ lastUpdate: +new Date() })

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    query: { token = '' },
  } = req

  if (token !== TOKEN) return res.status(401).json({ message: 'Invalid token' })

  writeWebhookData({
    lastUpdate: +new Date(),
  })

  res.status(200).json({})
}
