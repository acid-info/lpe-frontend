import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { api } from '../services/api.service'
import { ApiPaginatedPayload } from '../types/data.types'
import { LPE } from '../types/lpe.types'

export const useRecentPosts = ({
  initialData,
  limit = 10,
}: {
  initialData?: ApiPaginatedPayload<LPE.Post.Document[]>
  limit?: number
}) => {
  const query = useInfiniteQuery(
    ['latest-posts', initialData, limit],
    async ({ pageParam }) => {
      const firstPageLimit = initialData?.data.length || 0
      const _limit = pageParam === 1 ? firstPageLimit : limit
      const skip =
        pageParam === 1 ? 0 : (pageParam - 2) * limit + firstPageLimit

      return api.getRecentPosts({ skip, limit: _limit }).then((res) => ({
        page: pageParam,
        posts: res.data.data,
        hasMore: res.data.hasMore,
      }))
    },
    {
      initialData: {
        pageParams: [1],
        pages: [
          {
            page: 1,
            hasMore: initialData?.hasMore,
            posts: initialData?.data || [],
          },
        ],
      },
      getNextPageParam: (lastPage, all) =>
        lastPage.hasMore ? lastPage.page + 1 : undefined,
      getPreviousPageParam: (firstPage) =>
        firstPage ? firstPage.page - 1 : undefined,
    },
  )

  const posts = useMemo(
    () => (query.data?.pages || []).flatMap((page) => page.posts),
    [query.data],
  )

  return {
    posts,
    ...query,
  }
}
