import { SearchResultItem } from '@/types/data.types'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { LPE } from '../../types/lpe.types'
import { GridItem } from '../Grid/Grid'
import ContentBlockFooter from './ContentBlockFooter'
import ContentBlockHeader, { BlockType } from './ContentBlock.Header'

type Props = LPE.Search.ResultItemBase<LPE.Post.TextBlock>

const TextBlock = (props: Props) => {
  const {
    score,
    type,
    data: { document, order, labels, classNames, text, html },
  } = props

  return (
    <Container>
      <ContentBlockHeader
        type={BlockType.TEXT}
        date={
          document?.publishedAt
            ? new Date(document?.publishedAt)
            : document?.modifiedAt
            ? new Date(document?.modifiedAt)
            : null
        }
      />
      <Typography variant="body2" genericFontFamily="sans-serif">
        {text}
      </Typography>
      <ContentBlockFooter data={document} order={order} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  gap: 8px;
`

export default TextBlock
