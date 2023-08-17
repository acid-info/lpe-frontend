import styled from '@emotion/styled'
import Image from 'next/image'
import { LPE } from '../../types/lpe.types'
import {
  PostImageRatio,
  PostImageRatioOptions,
} from '@/components/PostCard/PostCard'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'

type Props = {
  image: LPE.Image.Document
  ratio: PostImageRatio
}

export const ArticleImageBlockWrapper = ({ image }: Props) => {
  return (
    <Container>
      <ResponsiveImage data={image} />
    </Container>
  )
}

const Container = styled.div``

//Old code?
const ThumbnailContainer = styled.div<{
  aspectRatio: PostImageRatio
}>`
  aspect-ratio: ${(p) =>
    p.aspectRatio
      ? PostImageRatioOptions[p.aspectRatio]
      : PostImageRatioOptions[PostImageRatio.PORTRAIT]};
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 458px; // temporary max-height based on the Figma design's max height
  margin-bottom: 32px;
`

const Thumbnail = styled(Image)`
  object-fit: cover;
`
