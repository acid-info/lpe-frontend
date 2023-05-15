import { GoogleDocEnhanced } from '@/lib/unbody/unbody.types'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { Authors } from '../Authors'
import { AuthorsDirection } from '../Authors/Authors'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  data: GoogleDocEnhanced
}

export default function ArticleReference({
  data: { title, modifiedAt, mentions, slug },
  ...props
}: Props) {
  const localDate = new Date(modifiedAt).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Container {...props}>
      <ArticleLink href={slug}>
        <Typography component="span" variant="body1">
          {title}
        </Typography>
      </ArticleLink>
      <Info>
        <Authors
          flexDirection={AuthorsDirection.ROW}
          gap={4}
          mentions={mentions}
          email={false}
        />
        <Typography variant="body3">•</Typography>
        <Typography variant="body3" genericFontFamily="sans-serif">
          {localDate}
        </Typography>
      </Info>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 14px;
  border-bottom: 1px solid rgb(var(--lsd-border-primary));
  text-decoration: none;

  &:last-child {
    border-bottom: none;
  }
`

const ArticleLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`
