import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { Grid, GridItem } from '../Grid/Grid'
import Post, { PostSize } from '../Post/Post'

type Props = {
  post: LPE.Article.Data
}

const FeaturedPost = ({ post }: Props) => {
  return (
    <CustomGrid>
      <GridItem className="w-16">
        <PostWrapper>
          <Post
            data={{
              authors: post.authors,
              date: post.modifiedAt ? new Date(post.modifiedAt) : null,
              slug: post.slug,
              title: post.title,
              coverImage: post.coverImage,
              description: post.subtitle,
              summary: post.summary,
              tags: post.tags,
            }}
            appearance={{
              size: PostSize.LARGE,
              imagePropsArray: [
                {
                  fill: true,
                  height: '432px',
                  className: 'desktop',
                  nextImageProps: post.coverImage
                    ? {
                        quality: 100,
                        width: post.coverImage?.width * 2,
                        height: post.coverImage?.height * 2,
                      }
                    : {},
                },
                {
                  fill: false,
                  className: 'mobile',
                  nextImageProps: post.coverImage
                    ? {
                        quality: 100,
                        width: post.coverImage?.width * 2,
                        height: post.coverImage?.height * 2,
                      }
                    : {},
                },
              ],
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

  .mobile {
    display: none;
  }

  .desktop {
    display: block;
  }

  @media (max-width: 768px) {
    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }
  }
`

export default FeaturedPost
