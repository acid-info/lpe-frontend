import { GoogleDocEnhanced } from '@/lib/unbody/unbody.types'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

type Props = {
  data: GoogleDocEnhanced
}

export default function ArticleReference({
  data: { title, modifiedAt, mentions },
  ...props
}: Props) {
  const localDate = new Date(modifiedAt).toLocaleString('en-GB', {
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
          {/*TODO we need handle multiple authors for same article*/}
          {mentions[0]?.name}
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
