import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api.service'
import { LPE } from '../types/lpe.types'
import { searchBlocksBasicFilter } from '../utils/search.utils'

export const usePostSearchQuery = ({
  id,
  query,
  limit = 50,
  active = false,
  blocks = [],
}: {
  id: string
  query: string
  limit?: number
  active?: boolean
  blocks: LPE.Post.ContentBlock[]
}) =>
  useQuery(
    ['post-search-query', active, id, query, limit],
    async () =>
      !active
        ? []
        : api.searchPostBlocks({ limit, id, query, skip: 0 }).then((res) =>
            res.data.blocks
              .map(
                (r) =>
                  ({
                    data: blocks[r.index],
                    score: r.score,
                    type: blocks[r.index].type,
                  } as LPE.Search.ResultBlockItem),
              )
              .filter(searchBlocksBasicFilter),
          ),
    { keepPreviousData: true },
  )
