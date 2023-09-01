import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { api } from '../services/api.service'
import { ApiPaginatedPayload } from '../types/data.types'
import { LPE } from '../types/lpe.types'

export const useRecentEpisodes = ({
  initialData = { data: [], hasMore: true },
  limit = 10,
  showSlug,
}: {
  initialData?: ApiPaginatedPayload<LPE.Podcast.Document[]>
  showSlug: string
  limit?: number
}) => {
  const query = useInfiniteQuery(
    ['recent-episodes', showSlug, initialData, limit],
    async ({ pageParam }) => {
      const firstPageLimit = initialData.data.length
      const _limit = pageParam === 1 ? firstPageLimit : limit
      const skip =
        pageParam === 1 ? 0 : (pageParam - 2) * limit + firstPageLimit

      return api
        .getLatestEpisodes({ skip, limit: _limit, showSlug })
        .then((res) => ({
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
            posts: initialData.data,
            hasMore: initialData?.hasMore,
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
