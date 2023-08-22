import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { PostsGrid } from '../../components/PostsGrid'
import { useRecentPosts } from '../../queries/useRecentPosts.query'
import { LPE } from '../../types/lpe.types'
import { chunkArray } from '../../utils/array.utils'
import { PodcastShowsPreview } from '../PodcastShowsPreview'

export type HomePageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  data: {
    tags: string[]
    shows: LPE.Podcast.Show[]
    latest: LPE.Post.Document[]
    highlighted: LPE.Post.Document[]
  }
}

export const HomePage: React.FC<HomePageProps> = ({
  data,
  data: { highlighted = [], shows = [], tags = [], latest = [] },
  ...props
}) => {
  const query = useRecentPosts({ initialData: latest, limit: 10 })

  const [group1, group2] = useMemo(
    () => [[query.posts.slice(0, 5)], chunkArray(query.posts.slice(5), 4, 2)],
    [query.posts],
  )

  return (
    <Root {...props}>
      <PostsGrid posts={group1[0]} cols={5} bordered size="xxsmall" />
      <PostsGrid
        posts={highlighted.slice(0, 1)}
        cols={1}
        bordered
        size="large"
      />
      {group2.map((group, index) => (
        <PostsGrid
          bordered
          key={index}
          posts={group}
          cols={index % 2 !== 0 ? 2 : 4}
          size={index % 2 !== 0 ? 'medium' : 'small'}
        />
      ))}
      {query.hasNextPage && (
        <div className="load-more">
          <Button
            onClick={() => query.fetchNextPage()}
            size="large"
            disabled={query.isLoading}
          >
            <Typography variant="label1">
              {query.isFetchingNextPage ? 'Loading...' : 'See more posts'}
            </Typography>
          </Button>
        </div>
      )}

      <PodcastShowsPreview data={{ shows }} />
    </Root>
  )
}

const Root = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;

  .load-more {
    width: 100%;
    text-align: center;

    button {
      width: 340px;
    }
  }

  .podcasts {
    margin-top: 40px;
  }
`
