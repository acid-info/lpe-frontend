import Link from 'next/link'
import { useState } from 'react'
import { Grid, GridItem } from '../Grid/Grid'
import styled from '@emotion/styled'
import Post, { PostDataProps } from '../Post/Post'

type Props = {
  posts: PostDataProps[]
}

export const PostsList = (props: Props) => {
  const [posts, setPosts] = useState<PostDataProps[]>(props.posts)

  //TODO pagination

  return (
    <Grid>
      {posts.map((post, index) => (
        <GridItem className="w-4" key={index}>
          <PostLink href={`/article/${post.remoteId}`}>
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
