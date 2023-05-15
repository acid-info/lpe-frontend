import Link from 'next/link'
import { Grid, GridItem } from '../Grid/Grid'
import styled from '@emotion/styled'
import Post, { PostDataProps, PostSize } from '../Post/Post'

type Props = {
  post: PostDataProps
}

const FeaturedPost = ({ post }: Props) => {
  return (
    <CustomGrid>
      <GridItem className="w-16">
        <PostWrapper>
          <Post
            data={post}
            appearance={{
              size: PostSize.LARGE,
              imageProps: {
                fill: true,
                height: '480px',
                nextImageProps: post.coverImage
                  ? {
                      quality: 100,
                      width: post.coverImage?.width * 2,
                      height: post.coverImage?.height * 2,
                    }
                  : {},
              },
            }}
            isFeatured
          />
        </PostWrapper>
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

export default FeaturedPost
