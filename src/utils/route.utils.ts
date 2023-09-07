import { LPE } from '../types/lpe.types'

export const getPostLink = (
  postType: LPE.PostType | LPE.StaticPage.Metadata['type'],
  {
    id,
    block,
    showSlug,
    postSlug,
    blockType,
  }: {
    id?: string
    block?: string | number | null
    showSlug?: string | number | null
    postSlug?: string | number | null
    blockType?: LPE.Post.ContentBlockType | null
  } = {},
) => {
  let path =
    postType === 'article'
      ? `/article`
      : postType === 'podcast'
      ? `/podcasts/${showSlug || ''}`
      : ''

  if (postSlug) path += `/${postSlug}`
  if (id) path += `/id/${id}`

  if (blockType && block)
    path += `#${blockType === 'text' ? 'p' : 'i'}-${block}`

  return path
}
