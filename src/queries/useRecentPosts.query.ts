import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { api } from '../services/api.service'
import { LPE } from '../types/lpe.types'

export const useRecentPosts = ({
  initialData = [],
  limit = 10,
}: {
  initialData?: LPE.Post.Document[]
  limit?: number
}) => {
  const query = useInfiniteQuery(
    ['latest-posts', initialData, limit],
    async ({ pageParam }) => {
      const firstPageLimit = initialData.length
      const _limit = pageParam === 1 ? firstPageLimit : limit
      const skip =
        pageParam === 1 ? 0 : (pageParam - 2) * limit + firstPageLimit

      return api.getRecentPosts({ skip, limit: _limit }).then((res) => ({
        page: pageParam,
        posts: res.data,
        hasMore: res.data.length === _limit,
      }))
    },
    {
      initialData: {
        pageParams: [1],
        pages: [
          {
            page: 1,
            hasMore: true,
            posts: initialData,
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
