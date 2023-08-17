import { Tags } from '@/components/Tags'
import { Typography } from '@acid-info/lsd-react'
import { CommonProps } from '@acid-info/lsd-react/dist/utils/useCommonProps'
import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import { LPE } from '../../types/lpe.types'
import { Authors } from '../Authors'
import { AuthorsDirection } from '../Authors/Authors'

import { ResponsiveImageProps } from '../ResponsiveImage/ResponsiveImage'

import { PostCardLabel } from './PostCard.Label'
import { PostCardCover } from '@/components/PostCard/PostCard.Cover'
import {
  PostCardShowDetails,
  PostCardShowDetailsProps,
} from '@/components/PostCard/PostCard.ShowDetails'

export type PostAppearanceProps = {
  imageProps?: ResponsiveImageProps
}

export enum PodcastType {
  NETWORK_STATE = 'network-state',
  HASHING_IT_OUT = 'hashing-it-out',
}

export type PostDataProps = {
  slug: string
  date: Date | null
  title: string
  subtitle?: string
  authors?: LPE.Author.Document[]
  tags?: string[]
  coverImage?: LPE.Article.Data['coverImage'] | null
  podcastShowDetails?: PostCardShowDetailsProps
}

export type PostCardProps = CommonProps &
  React.HTMLAttributes<HTMLDivElement> & {
    appearance?: PostAppearanceProps
    data: PostDataProps
    isFeatured?: boolean
    contentType: LPE.PostType
  }

export const PostCard = (_props: PostCardProps) => {
  const {
    appearance: { imageProps = {} } = {},
    data: {
      coverImage = null,
      date,
      title,
      subtitle,
      authors,
      slug,
      tags = [],
      podcastShowDetails,
    },
    contentType,
    isFeatured = false,
    ...props
  } = _props

  const link =
    contentType === LPE.PostTypes.Article
      ? `/article/${slug}`
      : `/podcasts/${slug}`

  return (
    <Container {...props}>
      {coverImage && (
        <PostCardCover
          imageProps={imageProps}
          imageData={coverImage}
          link={link}
        />
      )}

      <PostCardLabel contentType={contentType} date={date} />

      <TitleLink href={link}>
        <Title genericFontFamily="serif" component="h3">
          {title}
        </Title>
      </TitleLink>

      {subtitle && (
        <Subtitle variant={'body1'} genericFontFamily="sans-serif">
          {subtitle}
        </Subtitle>
      )}

      {authors && authors.length > 0 && (
        <Authors
          authors={authors}
          email={false}
          flexDirection={AuthorsDirection.ROW}
          gap={8}
        />
      )}

      {podcastShowDetails && <PostCardShowDetails {...podcastShowDetails} />}
      {tags.length > 0 && <Tags tags={tags} />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: 'relative';
  gap: 16px;
`

const CustomTypography = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
`

const PodcastAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const TitleLink = styled(Link)`
  text-decoration: none;
  width: fit-content;
`

const Subtitle = styled(CustomTypography)`
  @media (min-width: 768px) {
  }
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`

const Title = styled(CustomTypography)`
  @media (max-width: 768px) {
    font-size: 28px;
    line-height: 36px;
  }
`
