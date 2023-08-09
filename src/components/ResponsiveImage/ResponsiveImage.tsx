import styled from '@emotion/styled'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { LPE } from '../../types/lpe.types'

export type ResponsiveImageProps = {
  height?: number | string | null
  nextImageProps?: Partial<ImageProps>
  fill?: boolean
  className?: string
}

export type Props = {
  data: LPE.Image.Document
  alt?: string
} & ResponsiveImageProps

export const ResponsiveImage = ({
  data,
  height,
  fill = false,
  alt = 'alt',
  nextImageProps,
  className,
}: Props) => {
  const [loaded, setLoaded] = useState(false)

  const lazyUrl = `${data.url}?blur=200&px=16&auto=format`

  const imageProps: ImageProps = {
    src: `${data.url}`,
    width: data.width,
    height: data.height,
    alt: data.alt,
    className: loaded ? 'loaded' : '',
    onLoad: () => setLoaded(true),
    loading: 'lazy',
    ...(nextImageProps || {}),
    style: {
      width: '100%',
      height: 'auto',
    },
  }

  return (
    <Container
      className={`${fill ? 'fill' : ''} ${className || ''}`}
      style={{
        paddingTop: height ? 0 : `calc(${data.height / data.width} * 100%)`,
        height: height || 'auto',
      }}
    >
      <img src={lazyUrl} alt={alt} />
      <Image {...imageProps} alt={alt} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  filter: grayscale(100%);
  transition: filter 0.1s ease-in-out;

  :hover {
    filter: grayscale(0%);
  }

  &.fill {
    width: 100%;
    height: 100%;
    object-fit: cover;

    > img {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: auto;
    }
  }

  > * {
    position: absolute !important;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;

    &:last-of-type {
      opacity: 0;
      transition: opacity 250ms;

      &.loaded {
        opacity: 1;
      }
    }
  }
`
