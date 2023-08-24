import { PostCardCover } from '@/components/PostCard/PostCard.Cover'
import {
  PostCardShowDetails,
  PostCardShowDetailsProps,
} from '@/components/PostCard/PostCard.ShowDetails'
import { Tags } from '@/components/Tags'
import { Theme, Typography } from '@acid-info/lsd-react'
import { CommonProps } from '@acid-info/lsd-react/dist/utils/useCommonProps'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { LPE } from '../../types/lpe.types'
import { lsdUtils } from '../../utils/lsd.utils'
import { Authors } from '../Authors'
import { AuthorsDirection } from '../Authors/Authors'
import { ResponsiveImageProps } from '../ResponsiveImage/ResponsiveImage'
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
    applySizeStyles?: boolean
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
    applySizeStyles = true,
    displayPodcastShow = true,
    ...props
  } = _props

  const link =
    contentType === LPE.PostTypes.Article
      ? `/article/${slug}`
      : `/podcasts/${podcastShowDetails?.slug}/${slug}`

  const coverImageElement = coverImage && (
    <PostCardCover
      className="post-card__cover-image"
      href={link}
      imageProps={imageProps}
      imageData={coverImage}
    />
  )

  const labelElement = (
    <PostCardLabel
      className="post-card__label"
      contentType={contentType}
      date={date}
    />
  )

  const titleElement = (
    <Link href={link} className="post-card__title">
      <Typography
        variant={'h3'}
        component="h3"
        genericFontFamily="serif"
        className="post-card__title-text"
      >
        {title}
      </Typography>
    </Link>
  )

  const subtitleElement = subtitle && (
    <Typography
      className="post-card__subtitle"
      variant={'body1'}
      genericFontFamily="sans-serif"
    >
      {subtitle}
    </Typography>
  )

  const authorsElement = authors && authors.length > 0 && (
    <Authors
      className="post-card__authors"
      authors={authors}
      email={false}
      flexDirection={AuthorsDirection.ROW}
      gap={8}
    />
  )

  const showElement = displayPodcastShow && podcastShowDetails && (
    <PostCardShowDetails
      {...podcastShowDetails}
      className="post-card__show-details"
      size={'small'}
    />
  )

  const tagsElement = tags.length > 0 && (
    <Tags className="post-card__tags" tags={tags} />
  )

  return (
    <Container
      className={clsx(
        'post-card',
        applySizeStyles && applySizeStyles && `post-card--${size}`,
      )}
    >
      {labelElement}
      {coverImageElement}
      {titleElement}
      {subtitleElement}
      {showElement}
      {authorsElement}
      {tagsElement}
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

PostCard.styles = {
  xxsmall: (theme: Theme) => css`
    height: 100%;

    .post-card__title-text {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      max-height: calc(2 * var(--lsd-h6-lineHeight));

      ${lsdUtils.typography('h6')}
    }

    .post-card__subtitle {
      display: none;
    }

    .post-card__cover-image {
      display: none;
    }

    .post-card__tags {
      display: none;
    }

    .post-card__authors,
    .post-card__show-details {
      flex-grow: 1;
      display: flex;
    }

    @media (max-width: ${theme.breakpoints.lg.width - 1}px) {
      .post-card__title-text {
        ${lsdUtils.typography('subtitle1', true)}
        max-height: calc(2 * var(--lsd-subtitle1-lineHeight));
      }
    }
  `,
  xsmall: (theme: Theme) => css`
    .post-card__title-text {
      ${lsdUtils.typography('h6')}
    }
  `,
  small: (theme: Theme) => css`
    .post-card__title-text {
      ${lsdUtils.typography('h4')}
    }

    .post-card__subtitle {
      ${lsdUtils.typography('subtitle2')}
    }

    .post-card__show-details {
      ${PostCardShowDetails.styles.large(theme)}
    }
  `,
  medium: (theme: Theme) => css`
    .post-card__title-text {
      ${lsdUtils.typography('h2')}
    }

    .post-card__subtitle {
      ${lsdUtils.typography('subtitle2')}
    }

    .post-card__show-details {
      ${PostCardShowDetails.styles.large(theme)}
    }
  `,
  large: (theme: Theme) => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'info image'
      'info image'
      'info image'
      'info image'
      'info image'
      'info image'
      '. image';
    gap: 16px 105px;

    .post-card__title-text {
      ${lsdUtils.typography('h2')}
    }

    .postcard__subtitle {
      ${lsdUtils.typography('subtitle2')}
    }

    .post-card__cover-image {
      grid-area: image;
    }

    .post-card__label {
      grid-area: info;
      grid-row: auto;
    }

    .post-card__title {
      grid-area: info;
      grid-row: auto;
    }

    .post-card__authors,
    .post-card__show-details {
      grid-area: info;
      grid-row: auto;
    }

    .post-card__tags {
      grid-area: info;
      grid-row: auto;
    }

    .post-card__show-details {
      ${PostCardShowDetails.styles.large(theme)}
    }
  `,
}

const Container = styled.div<Pick<PostCardProps, 'size'>>`
  display: flex;
  flex-direction: column;
  position: 'relative';
  gap: 16px 0;

  .post-card__label {
    margin-bottom: -8px;
  }

  .post-card__title {
    text-decoration: none;
    width: fit-content;
  }

  .post-card__title-text,
  .post-card__subtitle {
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
  }

  &.post-card--xxsmall {
    ${({ theme }) => PostCard.styles.xxsmall(theme)}
  }

  &.post-card--xsmall {
    ${({ theme }) => PostCard.styles.xsmall(theme)}
  }

  &.post-card--small {
    ${({ theme }) => PostCard.styles.small(theme)}
  }

  &.post-card--medium {
    ${({ theme }) => PostCard.styles.medium(theme)}
  }

  &.post-card--large {
    ${({ theme }) => PostCard.styles.large(theme)}
  }
`
