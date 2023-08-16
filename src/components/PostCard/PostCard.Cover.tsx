import React, { FC } from 'react'
import {
  ResponsiveImage,
  ResponsiveImageProps,
} from '@/components/ResponsiveImage/ResponsiveImage'
import { LPE } from '@/types/lpe.types'
import Link from 'next/link'

interface Props {
  imageProps: ResponsiveImageProps
  imageData: LPE.Image.Document
  playIcon?: boolean
  link: string
}
export const PostCardCover: FC<Props> = ({
  link,
  imageProps,
  imageData,
  playIcon,
}) => {
  return (
    <Link href={link}>
      <ResponsiveImage {...imageProps} data={imageData} />
    </Link>
  )
}
