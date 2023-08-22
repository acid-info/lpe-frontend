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

import { PostCardCover } from '@/components/PostCard/PostCard.Cover'
import {
  PostCardShowDetails,
  PostCardShowDetailsProps,
} from '@/components/PostCard/PostCard.ShowDetails'
import { css } from '@emotion/react'
import { PostCardLabel } from './PostCard.Label'

export type PostAppearanceProps = {
  imageProps?: ResponsiveImageProps
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
    contentType: LPE.PostType
    size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'
    displayPodcastShow?: boolean
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
    size = 'small',
    contentType,
    displayPodcastShow = true,
    ...props
  } = _props

  const link =
    contentType === LPE.PostTypes.Article
      ? `/article/${slug}`
      : `/podcasts/${podcastShowDetails?.slug}/${slug}`

  const coverImageElement = coverImage && (
    <PostCardCover
      className="coverImage"
      href={link}
      imageProps={imageProps}
      imageData={coverImage}
    />
  )

  const labelElement = (
    <PostCardLabel className="label" contentType={contentType} date={date} />
  )

  const titleElement = (
    <Link href={link} className="titleLink">
      <Typography
        className="title"
        genericFontFamily="serif"
        component="h3"
        variant={
          size === 'xxsmall'
            ? 'h6'
            : size === 'xsmall'
            ? 'body3'
            : size === 'small'
            ? 'h4'
            : 'h2'
        }
      >
        {title}
      </Typography>
    </Link>
  )

  const subtitleElement = subtitle && (
    <Typography
      className="subtitle"
      variant={'body1'}
      genericFontFamily="sans-serif"
    >
      {subtitle}
    </Typography>
  )

  const authorsElement = authors && authors.length > 0 && (
    <Authors
      className="authors"
      authors={authors}
      email={false}
      flexDirection={AuthorsDirection.ROW}
      gap={8}
    />
  )

  const showElement = displayPodcastShow && podcastShowDetails && (
    <PostCardShowDetails
      {...podcastShowDetails}
      size={size === 'large' ? 'medium' : 'small'}
      className="showDetails"
    />
  )

  const tagsElement = tags.length > 0 && <Tags className="tags" tags={tags} />

  return (
    <Container {...props} size={size}>
      {size === 'large' ? (
        <>
          <div>
            {labelElement}
            {titleElement}
            {subtitleElement}
            {authorsElement}
            {showElement}
            {tagsElement}
          </div>
          <div>{coverImageElement}</div>
        </>
      ) : (
        <>
          {coverImageElement}
          {labelElement}
          {titleElement}
          {subtitleElement}
          {authorsElement}
          {showElement}
          {tagsElement}
        </>
      )}
    </Container>
  )
}

PostCard.toData = (post: LPE.Post.Document, shows: LPE.Podcast.Show[] = []) => {
  const show =
    post.type === 'podcast'
      ? post.show || shows.find((show) => show.id === post.showId) || shows[0]
      : undefined

  return {
    date:
      post.type === 'podcast'
        ? post.publishedAt
          ? new Date(post.publishedAt)
          : null
        : post.modifiedAt
        ? new Date(post.modifiedAt)
        : null,
    slug: post.slug,
    title: post.title,
    authors: post.type === 'article' ? post.authors : [],
    coverImage: post.coverImage,
    subtitle: (post.type === 'article' && post.subtitle) || '',
    tags: post.tags,
    ...(post.type === 'podcast' && show
      ? {
          podcastShowDetails: {
            episodeNumber: post.episodeNumber,
            title: show.title,
            slug: show.slug,
            podcast: show,
          },
        }
      : {}),
  }
}

const Container = styled.div<Pick<PostCardProps, 'size'>>`
  display: flex;
  flex-direction: column;
  position: 'relative';
  gap: 16px;

  .label {
    margin-bottom: -8px;
  }

  .titleLink {
    text-decoration: none;
    width: fit-content;
  }

  .title,
  .subtitle {
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
  }

  .title {
    @media (max-width: 768px) {
      font-size: 28px;
      line-height: 36px;
    }
  }

  .subtitle {
    @media (max-width: 768px) {
      font-size: 14px;
      line-height: 20px;
    }
  }

  ${({ size }) =>
    size === 'xxsmall' &&
    css`
      .label {
      }

      .title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-height: calc(2 * var(--lsd-h6-lineHeight));
      }

      .subtitle {
        display: none;
      }

      .coverImage {
        display: none;
      }

      .tags {
        display: none;
      }

      .authors,
      .showDetails {
        flex-grow: 1;
        display: flex;
      }
    `}

  ${({ size }) =>
    size === 'xsmall' &&
    css`
      .label {
        margin-bottom: -px;
      }

      .title {
      }

      .subtitle {
        display: none;
      }

      .coverImage {
      }

      .tags {
        margin-top: 8px;
      }

      .authors,
      .showDetails {
      }
    `}

  ${({ size }) => size === 'small' && css``}

  ${({ size }) => size === 'medium' && css``}

  ${({ size }) =>
    size === 'large' &&
    css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      > * {
        display: flex;
        flex-direction: column;
        position: 'relative';
        gap: 16px;
      }
    `}
`
