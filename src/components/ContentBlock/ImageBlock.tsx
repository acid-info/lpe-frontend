import styled from '@emotion/styled'
import Link from 'next/link'
import { LPE } from '../../types/lpe.types'
import { GridItem } from '../Grid/Grid'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'
import ContentBlockFooter from './ContentBlockFooter'
import ContentBlockHeader, { BlockType } from './ContentBlock.Header'
import { lsdUtils } from '@/utils/lsd.utils'
import { Typography } from '@acid-info/lsd-react'

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
      <Typography variant={'body2'} component={'p'}>
        {data.alt}
      </Typography>
      <ContentBlockFooter data={document} order={order} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 0;
  position: relative;

  figure {
    margin: 0;
    padding: 0;
    ${lsdUtils.typography('body2')}
  }
`
export default ImageBlock
