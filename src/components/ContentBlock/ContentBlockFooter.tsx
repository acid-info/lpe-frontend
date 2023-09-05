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
      <PostTitle>
        <Typography
          variant="subtitle1"
          component="h4"
          genericFontFamily="serif"
        >
          <span>☞</span>
        </Typography>
        <Link href={link}>
          <Typography
            variant="subtitle1"
            component="h4"
            genericFontFamily="serif"
          >
            {title}
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
