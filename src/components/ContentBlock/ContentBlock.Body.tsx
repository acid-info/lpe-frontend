import { GoogleDocEnhanced } from '@/lib/unbody/unbody.types'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Authors } from '../Authors'

type Props = {
  data: any
}

const ContentBlockBody = ({ data }: Props) => {
  const firstDocument = data.document[0]
  if (!firstDocument) return null
  const title = firstDocument.title

  return (
    <BlockBodyContainer>
      <Link href={`/article/${firstDocument.slug}#p-${data.order}`}>
        <Typography variant="body1" component="h4" genericFontFamily="serif">
          {title.slice(0, Math.min(60, title.length))}
          {title.length > 60 ? '...' : ''}
        </Typography>
      </Link>
      {/*<Authors mentions={mentions} email={false} />*/}
    </BlockBodyContainer>
  )
}

const BlockBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  a {
    text-decoration: none;
  }
`

export default ContentBlockBody
