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
    </Container>
  )
}

const Container = styled.div`
  a {
    text-decoration: none;
  }
`

export default ContentBlockFooter
