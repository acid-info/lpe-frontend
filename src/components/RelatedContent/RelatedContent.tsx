import styled from '@emotion/styled'
import { Section } from '../Section/Section'
import { SearchResultItem } from '@/types/data.types'
import { UnbodyImageBlock, UnbodyTextBlock } from '@/lib/unbody/unbody.types'
import { Grid } from '../Grid/Grid'
import { ImageBlock, TextBlock } from '../ContentBlock'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

type Props = {
  blocks: SearchResultItem<UnbodyImageBlock | UnbodyTextBlock>[]
}

export default function RelatedContent({ blocks }: Props) {
  return (
    <Container>
      <Section title={'Related Content'} matches={blocks?.length}>
        <Grid>
          {blocks.map(
            (block: SearchResultItem<UnbodyImageBlock | UnbodyTextBlock>) => {
              if (!block.doc.document || !block.doc.document[0]) return null

              let refArticle = null
              if (UnbodyGraphQl.UnbodyDocumentTypeNames.GoogleDoc) {
                refArticle = block.doc.document[0]
              }

              switch (block.doc.__typename) {
                case UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock:
                  return <TextBlock doc={block.doc} />
                case UnbodyGraphQl.UnbodyDocumentTypeNames.ImageBlock: {
                  return <ImageBlock doc={block.doc} />
                }
              }
            },
          )}
        </Grid>
      </Section>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 108px;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`
