import Link from 'next/link'
import styled from '@emotion/styled'

import { SearchResultItem } from '@/types/data.types'
import { UnbodyTextBlock } from '@/lib/unbody/unbody.types'

import { GridItem } from '../Grid/Grid'
import { Typography } from '@acid-info/lsd-react'
import { PostClassType } from '../Post/Post'
import ContentBlockHeader, { BlockType } from './ContentBlock.Header'
import ContentBlockBody from './ContentBlock.Body'

type Props = Omit<SearchResultItem<UnbodyTextBlock>, 'score'>

const TextBlock = ({ doc }: Props) => {
  return (
    <GridItem className="w-4">
      <Container>
        <ContentBlockHeader
          type={BlockType.TEXT}
          date={doc?.document[0].modifiedAt}
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
