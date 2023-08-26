import type { NextApiRequest, NextApiResponse } from 'next'
import unbodyApi from '../../../services/unbody/unbody.service'
import { LPE } from '../../../types/lpe.types'
import { parseInt } from '../../../utils/data.utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    query: {
      q = '',
      tags: tagsString = '',
      type: typeString = '',

      skip = 0,
      limit = 50,
    },
  } = req

  const tags =
    typeof tagsString === 'string'
      ? tagsString
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((t) => t.length > 0)
      : undefined

  const validPostTypes: string[] = Object.values(LPE.PostTypes)
  const validBlockTypes: string[] = Object.values(LPE.Post.ContentBlockTypes)
  const validTypes = [...validPostTypes, ...validBlockTypes]

  const type =
    typeof typeString === 'string'
      ? typeString
          .split(',')
          .map((t: string) => t.trim())
          .filter((t) => t.length > 0)
      : undefined

  const queryTypes = Array.isArray(type)
    ? type.filter((t) => validTypes.includes(t))
    : []

  const postTypes =
    queryTypes.length > 0
      ? queryTypes.filter((type) => validPostTypes.includes(type))
      : validPostTypes

  const blockTypes =
    queryTypes.length > 0
      ? queryTypes.filter((type) => validBlockTypes.includes(type))
      : validBlockTypes

  const result: {
    posts: LPE.Search.ResultItem[]
    blocks: LPE.Search.ResultItem[]
  } = {
    posts: [],
    blocks: [],
  }

  if (postTypes.length > 0) {
    const response = await unbodyApi.searchPosts({
      tags,
      query: Array.isArray(q) ? q.join(' ') : q,

      type: postTypes as LPE.PostType[],

      limit: parseInt(limit, 50),
      skip: parseInt(skip, 0),
    })

    result.posts.push(...response.data)
  }

  if (blockTypes.length > 0) {
    const response = await unbodyApi.searchPostBlocks({
      tags,
      query: Array.isArray(q) ? q.join(' ') : q,

      postType: postTypes as LPE.PostType[],
      type: blockTypes as LPE.Post.ContentBlockType[],

      limit: parseInt(limit, 50),
      skip: parseInt(skip, 0),
    })

    result.blocks.push(...response.data)
  }

  const calcPostScore = (postScore: number, blockScores: number[]): number => {
    const topScoreWeight = 0.5
    const postScoreWeight = 1
    const blocksCountWeight = 0.1

    const topScore = blockScores[0] ?? 0

    return (
      (postScore * postScoreWeight +
        (blockScores.length / result.blocks.length) * blocksCountWeight +
        topScore * topScoreWeight) /
      (topScoreWeight + postScoreWeight + blocksCountWeight)
    )
  }

  if (skip === 0)
    result.posts = [...result.posts].sort((a, b) => {
      const [blocks1, blocks2] = [a, b].map((p) =>
        result.blocks
          .filter(
            (block) =>
              'document' in block.data && block.data.document.id === p.data.id,
          )
          .map((block) => block.score),
      )

      return calcPostScore(a.score, blocks1) > calcPostScore(b.score, blocks2)
        ? -1
        : 1
    })

  res.status(200).json(result)
}
