import { NicerTextFormat } from '@/components/Search/SearchResult.NicerTextFormat'
import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import ContentBlockHeader, { BlockType } from './ContentBlock.Header'
import ContentBlockFooter from './ContentBlockFooter'

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
      <NicerTextFormat variant="body2" genericFontFamily="sans-serif">
        {text as string}
      </NicerTextFormat>
      <ContentBlockFooter order={order} data={document} type="text" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export default TextBlock
