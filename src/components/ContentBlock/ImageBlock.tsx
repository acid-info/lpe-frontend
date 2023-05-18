import Link from 'next/link'
import styled from '@emotion/styled'

import { SearchResultItem } from '@/types/data.types'
import { UnbodyImageBlock } from '@/lib/unbody/unbody.types'

import { GridItem } from '../Grid/Grid'
import ContentBlockHeader, { BlockType } from './ContentBlock.Header'
import ContentBlockBody from './ContentBlock.Body'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'
import { breakpoints } from '@/configs/ui.configs'

type Props = Omit<SearchResultItem<UnbodyImageBlock>, 'score'>

const ImageBlock = ({ doc }: Props) => {
  return (
    <CustomGridItem className="w-2">
      {/* TODO: order not working for images */}
      <Container>
        <Link href={`/article/${doc.document[0].slug}#p-${doc.order}`}>
          <ResponsiveImage data={doc} />
        </Link>
        <ContentBlockHeader
          type={BlockType.IMAGE}
          date={doc?.document[0].modifiedAt}
        />
        <ContentBlockBody data={doc} />
      </Container>
    </CustomGridItem>
  )
}

const CustomGridItem = styled(GridItem)`
  @media (max-width: ${breakpoints.mobile}px) {
    grid-column: span 8 !important;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  padding: 16px 0;
  border-top: 1px solid rgb(var(--lsd-theme-primary));
  position: relative;
`

export default ImageBlock
