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
  const url = new URL(getWebsiteUrl())
  const searchParams = url.searchParams

  title && searchParams.set('title', title)
  imageUrl && searchParams.set('image', imageUrl || '')
  contentType && searchParams.set('contentType', contentType)
  date && searchParams.set('date', date || '')
  pagePath && searchParams.set('pagePath', pagePath || '')

  return url.toString()
}
