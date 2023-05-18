import styled from '@emotion/styled'
import { SearchHook, SearchResultItem } from '@/types/data.types'
import { UnbodyImageBlock, UnbodyTextBlock } from '@/lib/unbody/unbody.types'
import { Grid } from '../Grid/Grid'
import { ImageBlock, TextBlock } from '../ContentBlock'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'
import { SearchResultsSection } from '@/components/SearchResultsSection/SearchResultsSection'
import { breakpoints } from '@/configs/ui.configs'

type Props = {
  data: SearchHook<UnbodyTextBlock | UnbodyImageBlock>
}
export default function RelatedContent({ data }: Props) {
  return (
    <Container>
      <SearchResultsSection
        resultSize={data.data.length}
        loading={data.loading}
        title={'Related Content'}
      >
        <Grid>
          {data.data.map(
            (
              block: SearchResultItem<UnbodyImageBlock | UnbodyTextBlock>,
              idx: number,
            ) => {
              if (!block.doc.document || !block.doc.document[0]) return null
              switch (block.doc.__typename) {
                case UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock:
                  return <TextBlock key={`text-${idx}`} doc={block.doc} />
                case UnbodyGraphQl.UnbodyDocumentTypeNames.ImageBlock: {
                  return <ImageBlock key={`image-${idx}`} doc={block.doc} />
                }
              }
            },
          )}
        </Grid>
      </SearchResultsSection>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 108px;

  @media (max-width: ${breakpoints.mobile}px) {
    align-items: flex-start;
  }
`
