import Link from 'next/link'
import { Grid, GridItem } from '../Grid/Grid'
import styled from '@emotion/styled'
import Post, { PostDataProps } from '../Post/Post'

type Props = {
  post: PostDataProps
}

const FeaturedPost = ({ post }: Props) => {
  return (
    <CustomGrid>
      <GridItem className="w-16">
        <PostLink href={`/article/${post.slug}`}>
          <PostWrapper>
            <Post
              data={post}
              appearance={{ imageProps: { fill: true, height: '480px' } }}
            />
          </PostWrapper>
        </PostLink>
      </GridItem>
    </CustomGrid>
  )
}

const CustomGrid = styled(Grid)`
  margin-bottom: 108px;
`

const PostWrapper = styled.div`
  margin-top: 16px;
  padding: 16px 0;
  border-top: 1px solid rgb(var(--lsd-theme-primary));
  width: 100%;
`

const PostLink = styled(Link)`
  text-decoration: none;
`

export default FeaturedPost
