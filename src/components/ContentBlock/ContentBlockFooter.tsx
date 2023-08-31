import { LPE } from '@/types/lpe.types'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'

type Props = {
  data: LPE.Post.Document
  order: number
}

const ContentBlockFooter = ({ data: { title, slug }, order }: Props) => {
  return (
    <Container>
      <PostTitle>
        <Typography
          variant="subtitle1"
          component="h4"
          genericFontFamily="serif"
        >
          <span>☞</span>
        </Typography>
        <Link href={`/article/${slug}#p-${order}`}>
          <Typography
            variant="subtitle1"
            component="h4"
            genericFontFamily="serif"
          >
            {title.slice(0, Math.min(60, title.length))}
            {title.length > 60 ? '...' : ''}
          </Typography>
        </Link>
      </PostTitle>
    </Container>
  )
}

const Container = styled.div``

const PostTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`

export default ContentBlockFooter
