import { CommonProps } from '@acid-info/lsd-react/dist/utils/useCommonProps'
import styled from '@emotion/styled'
import { Post, PostProps } from '../Post'
import { Typography } from '@acid-info/lsd-react'

export type PostContainerProps = CommonProps &
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string
    postsData: PostProps[]
  }

export default function PostContainer({
  title,
  postsData,
  ...props
}: PostContainerProps) {
  return (
    <div {...props}>
      {title && (<Title variant="body1" genericFontFamily="sans-serif">{title}</Title>)}
      <Container>
        {postsData.map((post, index) => (
          <PostWrapper key={index}>
            <Post {...post} />
          </PostWrapper>
        ))}
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  gap: 24px;

  @media (max-width: 768px) {
    // temporariy breakpoint
    flex-direction: column;
  }
`

const PostWrapper = styled.div`
  padding: 16px 0;
  border-top: 1px solid rgb(var(--lsd-theme-primary));
  width: 100%;
`

const Title = styled(Typography)`
  padding: 0 16px;
`
