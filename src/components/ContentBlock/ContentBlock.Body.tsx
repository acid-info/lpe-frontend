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
  const mentions =
    typeof firstDocument.mentions === 'string'
      ? JSON.parse(firstDocument.mentions)
      : firstDocument.mentions

  return (
    <BlockBodyContainer>
      <Link href={`/article/${data.document[0].slug}#p-${data.order}`}>
        <Typography variant="body1" component="div" genericFontFamily="serif">
          {data.document[0].title}
        </Typography>
      </Link>
      <Authors mentions={mentions} email={false} />
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
