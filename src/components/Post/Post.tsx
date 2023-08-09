import { Tags } from '@/components/Tags'
import { Typography } from '@acid-info/lsd-react'
import { CommonProps } from '@acid-info/lsd-react/dist/utils/useCommonProps'
import styled from '@emotion/styled'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { LPE } from '../../types/lpe.types'
import { Authors } from '../Authors'
import { AuthorsDirection } from '../Authors/Authors'
import { LogosCircleIcon } from '../Icons/LogosCircleIcon'
import {
  ResponsiveImage,
  ResponsiveImageProps,
} from '../ResponsiveImage/ResponsiveImage'

export enum PostImageRatio {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
  SQUARE = 'square',
}

export enum PostClassType {
  ARTICLE = 'article',
  PODCAST = 'podcast',
}

export enum PostStyleType {
  LSD = 'lsd',
  DEFAULT = 'default',
}

export enum PostSize {
  SMALL = 'small',
  LARGE = 'large',
}

export enum PostType {
  BODY = 'body',
  HEADER = 'header',
}

export type PostAppearanceProps = {
  size?: PostSize
  classType?: PostClassType
  postType?: PostType
  styleType?: PostStyleType
  aspectRatio?: PostImageRatio
  showImage?: boolean
  imageProps?: ResponsiveImageProps
  imagePropsArray?: ResponsiveImageProps[]
}

export type PostDataProps = {
  slug: string
  date: Date | null
  title: string
  description?: string
  authors: LPE.Author.Document[]
  tags?: string[]
  coverImage?: LPE.Article.Data['coverImage'] | null
  summary?: string
}

export const PostImageRatioOptions = {
  [PostImageRatio.PORTRAIT]: '9 / 16',
  [PostImageRatio.LANDSCAPE]: '16 / 9',
  [PostImageRatio.SQUARE]: '1 / 1',
}

export type PostProps = CommonProps &
  React.HTMLAttributes<HTMLDivElement> & {
    appearance?: PostAppearanceProps
    data: PostDataProps
    isFeatured?: boolean
  }

export default function Post({
  appearance: {
    size = PostSize.SMALL,
    classType = PostClassType.ARTICLE,
    postType = PostType.BODY,
    showImage = true,
    imageProps,
    imagePropsArray = [],
  } = {},
  data: {
    coverImage = null,
    date,
    title,
    description,
    authors,
    slug,
    tags = [],
  },
  isFeatured = false,
  ...props
}: PostProps) {
  const _title = useMemo(
    () => (
      <TitleLink href={`/article/${slug}`}>
        <Title
          variant={size === PostSize.SMALL ? 'h4' : 'h1'}
          genericFontFamily="serif"
          component="h2"
        >
          {title}
        </Title>
      </TitleLink>
    ),
    [title, size, slug],
  )

  const _description = useMemo(
    () =>
      classType == PostClassType.ARTICLE && (
        <Description
          variant={size === PostSize.SMALL ? 'body2' : 'h6'}
          genericFontFamily="sans-serif"
          isFeatured={isFeatured}
        >
          {description}
        </Description>
      ),
    [classType, description, isFeatured, size],
  )

  const _thumbnail = useMemo(() => {
    if (!showImage || !coverImage) return null
    let allImageProps = [
      ...imagePropsArray,
      ...(imageProps ? [imageProps] : []),
    ]

    if (postType === PostType.BODY) {
      return (
        <Link href={`/article/${slug}`}>
          {allImageProps.length > 0 ? (
            allImageProps.map((_imageProps, index) => (
              <ResponsiveImage key={index} {..._imageProps} data={coverImage} />
            ))
          ) : (
            <ResponsiveImage {...imageProps} data={coverImage} />
          )}
        </Link>
      )
    } else {
      return (
        <>
          <Link href={`/article/${slug}`}>
            {allImageProps.length > 0 ? (
              allImageProps.map((_imageProps, index) => (
                <ResponsiveImage
                  key={index}
                  {..._imageProps}
                  data={coverImage}
                />
              ))
            ) : (
              <ResponsiveImage {...imageProps} data={coverImage} />
            )}
          </Link>
          {_title}
          {_description}
        </>
      )
    }
  }, [slug, showImage, coverImage, postType, imageProps, _title, _description])

  const _header = useMemo(() => {
    if (postType === 'body')
      return (
        <>
          <HeaderContainer isFeatured={isFeatured}>
            <Row>
              <Typography variant="body3" genericFontFamily="sans-serif">
                {classType.toUpperCase()}
              </Typography>
              <Typography variant="body3">•</Typography>
              <Typography variant="body3" genericFontFamily="sans-serif">
                {date &&
                  date.toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'long', // TODO: Should be uppercase
                    year: 'numeric',
                  })}
              </Typography>
            </Row>
            {_title}
          </HeaderContainer>
        </>
      )
  }, [postType, classType, isFeatured, date, _title])

  return (
    <Container {...props}>
      {_thumbnail}
      {_header}
      {postType === 'body' && _description}
      {classType === 'article' ? (
        <Authors
          authors={authors}
          email={false}
          flexDirection={AuthorsDirection.ROW}
          gap={8}
        />
      ) : (
        <PodcastAuthor>
          <LogosCircleIcon color="primary" />
          <Typography variant="body3" genericFontFamily="sans-serif">
            Network State
          </Typography>
        </PodcastAuthor>
      )}
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
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

const HeaderContainer = styled(CustomTypography)<{ isFeatured: boolean }>`
  @media (min-width: 768px) {
    margin-right: ${({ isFeatured }) => (isFeatured ? '178px' : '0px')};
  }
`

const Description = styled(CustomTypography)<{ isFeatured: boolean }>`
  @media (min-width: 768px) {
    margin-right: ${({ isFeatured }) => (isFeatured ? '178px' : '0px')};
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
