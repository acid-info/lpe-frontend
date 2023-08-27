import styled from '@emotion/styled'
import Link from 'next/link'
import { LPE } from '../../types/lpe.types'
import { GridItem } from '../Grid/Grid'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'
import ContentBlockFooter from './ContentBlockFooter'
import ContentBlockHeader, { BlockType } from './ContentBlock.Header'

type Props = LPE.Search.ResultItemBase<LPE.Post.ImageBlock>

const ImageBlock = (props: Props) => {
  const {
    score,
    type,
    data: { document, order, labels, ...data },
  } = props

  return (
    <Container>
      <Link href={`/article/${document?.slug}#p-${order}`}>
        <ResponsiveImage data={data} />
      </Link>
      <ContentBlockHeader
        type={BlockType.IMAGE}
        date={document?.modifiedAt ? new Date(document?.modifiedAt) : null}
      />
      <ContentBlockFooter data={document} order={order} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 0;
  position: relative;
`
export default ImageBlock
