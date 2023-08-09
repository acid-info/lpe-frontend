import { SearchResultItem } from '@/types/data.types'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { LPE } from '../../types/lpe.types'
import { GridItem } from '../Grid/Grid'
import ContentBlockBody from './ContentBlock.Body'
import ContentBlockHeader, { BlockType } from './ContentBlock.Header'

type Props = Omit<SearchResultItem<LPE.Article.TextBlock>, 'score'>

const TextBlock = ({ doc }: Props) => {
  return (
    <GridItem className="w-4">
      <Container>
        <ContentBlockHeader
          type={BlockType.TEXT}
          date={
            doc.document?.modifiedAt ? new Date(doc.document?.modifiedAt) : null
          }
        />
        <Typography variant="body2" genericFontFamily="sans-serif">
          {doc.text}
        </Typography>
        <ContentBlockBody data={doc} />
      </Container>
    </GridItem>
  )
}

const BlockLink = styled(Link)`
  text-decoration: none;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  padding: 16px 0;
  border-top: 1px solid rgb(var(--lsd-theme-primary));
`

export default TextBlock
