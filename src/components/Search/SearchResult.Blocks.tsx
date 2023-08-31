import { ImageBlock, TextBlock } from '@/components/ContentBlock'
import { LPE } from '@/types/lpe.types'
import styled from '@emotion/styled'

interface Props {
  blocks: LPE.Search.ResultItemBase<LPE.Post.ContentBlock>[]
}
export const SearchResultListBlocks = ({ blocks }: Props) => {
  return (
    <Container>
      {blocks.map((block, index) => {
        switch (block.type) {
          case LPE.ContentTypes.Image: {
            return block.data.document.type === 'article' ? (
              <ImageBlock
                key={`result-${index}`}
                {...(block as LPE.Search.ResultItemBase<LPE.Post.ImageBlock>)}
              />
            ) : null
          }
          case LPE.ContentTypes.Text: {
            return (
              <TextBlock
                {...(block as LPE.Search.ResultItemBase<LPE.Post.TextBlock>)}
              />
            )
          }
        }
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-top: 24px;
`
