import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Grid, GridItem } from '../Grid/Grid'
import styled from '@emotion/styled'
import Post, { PostDataProps } from '../Post/Post'
import { Button, Typography } from '@acid-info/lsd-react'
import { PostListLayout } from '@/types/ui.types'

type Props = {
  posts: PostDataProps[]
  pageSize?: number
  layout?: PostListLayout
  loading?: boolean
}

const getGridItemWidth = (index: number) => {
  // Each cycle consists of 6 indices: 4 for "w-4" and 2 for "w-8"
  const cycleLength = 6

  // Determine which part of the cycle this index falls into
  const positionInCycle = index % cycleLength

  // If the index is in the first 4 positions, return "w-4"
  // Otherwise, return "w-8"
  return positionInCycle < 4 ? 'w-4' : 'w-8'
}

export const PostsList = (props: Props) => {
  const { pageSize = 6 } = props
  const [posts, setPosts] = useState<PostDataProps[]>(props.posts)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPosts(props.posts)
  }, [props.posts])

  const handleMoreOrLess = () => {
    const dir = page * pageSize < posts.length ? 1 : -1
    setPage(
      Math.max(1, Math.min(page + dir, Math.ceil(posts.length / pageSize))),
    )
  }

  const postsToShow = posts.slice(0, page * pageSize)

  return (
    <div>
      <Grid style={{ minHeight: '500px' }}>
        {postsToShow.length > 0 ? (
          postsToShow.map((post, index) => (
            <GridItem
              className={
                props.layout === PostListLayout.XXXX_XX
                  ? getGridItemWidth(index)
                  : 'w-4'
              }
              key={index}
            >
              <PostWrapper className={props.loading ? 'loading' : ''}>
                <Post data={post} />
              </PostWrapper>
            </GridItem>
          ))
        ) : (
          <GridItem className="w-12">
            <Typography variant="body1">No related articles found.</Typography>
          </GridItem>
        )}
      </Grid>
      {posts.length > pageSize && (
        <Button onClick={() => handleMoreOrLess()}>
          {page * pageSize < posts.length ? 'Load More' : 'Show Less'}
        </Button>
      )}
    </div>
  )
}

const PostWrapper = styled.div`
  margin-top: 16px;
  padding: 16px 0;
  border-top: 1px solid rgb(var(--lsd-theme-primary));
  width: 100%;

  transition: opacity 0.3s ease-in-out;

  &.loading {
    opacity: 0.5;
  }
`
