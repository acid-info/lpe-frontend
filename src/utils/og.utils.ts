import { LPE } from '../types/lpe.types'
import { getWebsiteUrl } from './route.utils'

export const getOpenGraphImageUrl = ({
  title,
  imageUrl,
  contentType,
  date,
  pagePath,
}: {
  title?: string | null
  imageUrl?: string | null
  contentType?: LPE.PostType | null
  date?: string | null
  pagePath?: string | null
}) => {
  const url = new URL('/api/og', getWebsiteUrl())
  const searchParams = new URLSearchParams()

  title && searchParams.set('title', title)
  imageUrl && searchParams.set('image', imageUrl || '')
  contentType && searchParams.set('contentType', contentType)
  date && searchParams.set('date', date || '')
  pagePath && searchParams.set('pagePath', pagePath || '')

  url.searchParams.set('q', encodeURIComponent(searchParams.toString()))

  return url.toString()
}
