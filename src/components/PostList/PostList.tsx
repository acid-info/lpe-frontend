import Link from 'next/link'
import { useState } from 'react'
import { Grid, GridItem } from '../Grid/Grid'
import styled from '@emotion/styled'
import Post, { PostDataProps } from '../Post/Post'

type Props = {
  posts: PostDataProps[]
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
  const [posts, setPosts] = useState<PostDataProps[]>(props.posts)

  return (
    <Grid>
      {posts.map((post, index) => (
        <GridItem className="w-4" key={index}>
          <PostLink href={`/article/${post.slug}`}>
            <PostWrapper>
              <Post data={post} />
            </PostWrapper>
          </PostLink>
        </GridItem>
      ))}
    </Grid>
  )
}

const PostWrapper = styled.div`
  padding: 16px 0;
  border-top: 1px solid rgb(var(--lsd-theme-primary));
  width: 100%;
`

const PostLink = styled(Link)`
  text-decoration: none;
`
