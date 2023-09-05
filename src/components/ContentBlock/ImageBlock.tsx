import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { LPE } from '../../types/lpe.types'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'
import ContentBlockHeader, { BlockType } from './ContentBlock.Header'
import ContentBlockFooter from './ContentBlockFooter'

type Props = LPE.Search.ResultItemBase<LPE.Post.ImageBlock>

const ImageBlock = (props: Props) => {
  const {
    score,
    type,
    data: { document, order, labels, ...data },
  } = props

  return (
    <Container>
      <Link href={`/article/${document?.slug}#i-${order}`}>
        <ResponsiveImage data={data} />
      </Link>
      <ContentBlockHeader
        type={BlockType.IMAGE}
        date={document?.modifiedAt ? new Date(document?.modifiedAt) : null}
      />
      {data.alt.length > 0 && (
        <Caption>
          <Typography variant={'body2'} component={'p'}>
            {data.alt}
          </Typography>
        </Caption>
      )}
      <ContentBlockFooter type="image" data={document} order={order} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0;
  position: relative;
  gap: 8px;

  > a {
    margin-bottom: 8px;
  }
`

const Caption = styled.figcaption`
  font-style: italic;
`
export default ImageBlock
