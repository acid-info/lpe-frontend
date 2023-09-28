import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api.service'
import { LPE } from '../types/lpe.types'
import { searchBlocksBasicFilter } from '../utils/search.utils'

export const usePostSearchQuery = ({
  id,
  query,
  limit = 50,
  active = false,
}: {
  id: string
  query: string
  limit?: number
  active?: boolean
}) =>
  useQuery<{
    result: LPE.Search.ResultBlockItem[]
    mapped: Record<string, LPE.Search.ResultBlockItem>
  }>(['post-search-query', active, id, query, limit], async () =>
    !active
      ? { result: [], mapped: {} }
      : api.searchPostBlocks({ limit, id, query, skip: 0 }).then((res) => {
          let items = res.data.blocks as LPE.Search.ResultBlockItem[]
          items = items.filter(searchBlocksBasicFilter)

          return {
            result: items,
            mapped: Object.fromEntries(
              items.map((item) => [item.data.id, item]),
            ),
          }
        }),
  )
