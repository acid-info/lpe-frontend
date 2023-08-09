import { SearchResultsSection } from '@/components/SearchResultsSection/SearchResultsSection'
import { SearchHook, SearchResultItem } from '@/types/data.types'
import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { ImageBlock, TextBlock } from '../ContentBlock'
import { Grid } from '../Grid/Grid'

type Props = {
  data: SearchHook<LPE.Article.ContentBlock>
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
              block: SearchResultItem<LPE.Article.ContentBlock>,
              idx: number,
            ) => {
              if (!block.doc.document) return null
              switch (block.doc.type) {
                case 'text':
                  return <TextBlock key={`text-${idx}`} doc={block.doc} />
                case 'image': {
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

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`
