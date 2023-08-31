import { LPE } from '@/types/lpe.types'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { getPostLink } from '../../utils/route.utils'

type Props = {
  order: number
  data: LPE.Post.Document
  type: LPE.Post.ContentBlockType
}

const ContentBlockFooter = ({
  data,
  data: { title, slug, type: postType },
  order,
  type,
}: Props) => {
  const link = getPostLink(postType, {
    blockType: type,
    block: `${order}`,
    postSlug: slug,
    showSlug: data.type === 'podcast' ? data.show?.slug : null,
  })

  return (
    <Container>
      <Link href={link}>
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
