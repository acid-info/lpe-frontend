import { UnbodyImageBlock } from '@/lib/unbody/unbody.types'
import styled from '@emotion/styled'
import React from 'react'
import { PostImageRatio, PostImageRatioOptions } from '../Post/Post'
import Image from 'next/image'

type Props = {
  image: UnbodyImageBlock
  ratio: PostImageRatio
}

export const ArticleImageBlockWrapper = ({ image, ratio }: Props) => {
  return (
    <ThumbnailContainer aspectRatio={ratio}>
      <Thumbnail fill src={image.url} alt={image.alt} />
    </ThumbnailContainer>
  )
}

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
