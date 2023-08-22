import {
  ResponsiveImage,
  ResponsiveImageProps,
} from '@/components/ResponsiveImage/ResponsiveImage'
import { LPE } from '@/types/lpe.types'
import Link from 'next/link'
import { FC } from 'react'

export type PostCardCoverProps = React.ComponentProps<typeof Link> & {
  imageProps: ResponsiveImageProps
  imageData: LPE.Image.Document
  playIcon?: boolean
}
export const PostCardCover: FC<PostCardCoverProps> = ({
  imageProps,
  imageData,
  playIcon,
  ...props
}) => {
  return (
    <Link {...props}>
      <ResponsiveImage {...imageProps} data={imageData} />
    </Link>
  )
}
