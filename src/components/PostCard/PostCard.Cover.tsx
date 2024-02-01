import {
  ResponsiveImage,
  ResponsiveImageProps,
} from '@/components/ResponsiveImage/ResponsiveImage'
import { LPE } from '@/types/lpe.types'
import { IconButton } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { FC } from 'react'
import { UnfilledPlayIcon } from '../Icons/UnfilledPlayIcon'

export type PostCardCoverProps = React.ComponentProps<typeof Link> & {
  imageProps: ResponsiveImageProps
  imageData: LPE.Image.Document
  playIcon?: boolean
  loadDelay?: number
}
export const PostCardCover: FC<PostCardCoverProps> = ({
  imageProps,
  imageData,
  playIcon,
  loadDelay = 0,
  ...props
}) => {
  return (
    <CustomLink
      {...props}
      className={`post-card__cover-image ${props.className}`}
    >
      <ResponsiveImage {...imageProps} data={imageData} loadDelay={loadDelay}>
        {playIcon && (
          <Icon size="small">
            <UnfilledPlayIcon />
          </Icon>
        )}
      </ResponsiveImage>
    </CustomLink>
  )
}

const CustomLink = styled(Link)`
  position: relative;
`

const Icon = styled(IconButton)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: white;
  border: none;
`
