import { LPE } from '../types/lpe.types'

export const getPostLink = (
  postType: LPE.PostType,
  {
    block,
    showSlug,
    postSlug,
    blockType,
  }: {
    block?: string | number | null
    showSlug?: string | number | null
    postSlug?: string | number | null
    blockType?: LPE.Post.ContentBlockType | null
  } = {},
) => {
  const basePath =
    postType === 'article' ? `/article` : `/podcasts/${showSlug || ''}`

  if (!postSlug) return basePath

  const postPath = `${basePath}/${postSlug}`

  if (!blockType && !block) return postPath

  const blockPath = `${postPath}/#${blockType === 'text' ? 'p' : 'i'}-${block}`

  return blockPath
}
