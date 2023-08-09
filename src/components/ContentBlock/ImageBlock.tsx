import { SearchResultItem } from '@/types/data.types'
import styled from '@emotion/styled'
import Link from 'next/link'
import { LPE } from '../../types/lpe.types'
import { GridItem } from '../Grid/Grid'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'
import ContentBlockBody from './ContentBlock.Body'
import ContentBlockHeader, { BlockType } from './ContentBlock.Header'

type Props = Omit<SearchResultItem<LPE.Article.ImageBlock>, 'score'>

const ImageBlock = ({ doc }: Props) => {
  return (
    <CustomGridItem className="w-2">
      {/* TODO: order not working for images */}
      <Container>
        <Link href={`/article/${doc.document?.slug}#p-${doc.order}`}>
          <ResponsiveImage data={doc} />
        </Link>
        <ContentBlockHeader
          type={BlockType.IMAGE}
          date={
            doc.document?.modifiedAt ? new Date(doc.document?.modifiedAt) : null
          }
        />
        <ContentBlockBody data={doc} />
      </Container>
    </CustomGridItem>
  )
}

const CustomGridItem = styled(GridItem)`
  @media (max-width: 768px) {
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

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 8px;
  aspect-ratio: 1 / 1; // fixed aspect ratio temporarily
`

export default ImageBlock
