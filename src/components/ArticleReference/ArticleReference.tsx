import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

export type ArticleReferenceType = {
  title: string
  author: string
  date: Date
}

type Props = {
  data: ArticleReferenceType
}

export default function ArticleReference({
  data: { title, author, date },
  ...props
}: Props) {
  const localDate = date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Reference {...props}>
      <Typography component="span" variant="body1">
        {title}
      </Typography>
      <div>
        <Typography variant="body3" genericFontFamily="sans-serif">
          {author}
        </Typography>
        <Typography variant="body3">•</Typography>
        <Typography variant="body3" genericFontFamily="sans-serif">
          {localDate}
        </Typography>
      </div>
    </Reference>
  )
}

const Reference = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 14px;
  border-bottom: 1px solid rgb(var(--lsd-border-primary));

  &:last-child {
    border-bottom: none;
  }
`
