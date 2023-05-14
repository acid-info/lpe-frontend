import Link from 'next/link'
import styled from '@emotion/styled'

import { SearchResultItem } from '@/types/data.types'
import { UnbodyImageBlock } from '@/lib/unbody/unbody.types'

import { GridItem } from '../Grid/Grid'
import { PostClassType } from '../Post/Post'
import ContentBlockHeader from './ContentBlock.Header'
import ContentBlockBody from './ContentBlock.Body'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'

type Props = Omit<SearchResultItem<UnbodyImageBlock>, 'score'>

const ImageBlock = ({ doc }: Props) => {
  return (
    <CustomGridItem className="w-2">
      {/* TODO: order not working for images */}
      <BlockLink href={`/article/${doc.document[0].slug}#p-${doc.order}`}>
        <Container>
          <ResponsiveImage data={doc} />
          <ContentBlockHeader
            type={PostClassType.ARTICLE}
            date={doc?.document[0].modifiedAt}
          />
          <ContentBlockBody
            title={doc.document[0].title}
            author="Jason Freeman"
          />
        </Container>
      </BlockLink>
    </CustomGridItem>
  )
}

const CustomGridItem = styled(GridItem)`
  @media (max-width: 768px) {
    grid-column: span 8 !important;
  }
`

const BlockLink = styled(Link)`
  text-decoration: none;
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
