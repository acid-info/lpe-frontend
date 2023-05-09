import { Tag, Typography } from '@acid-info/lsd-react'
import { CommonProps } from '@acid-info/lsd-react/dist/utils/useCommonProps'
import styled from '@emotion/styled'
import Image from 'next/image'
import { LogosCircleIcon } from '../Icons/LogosCircleIcon'
import { useMemo } from 'react'
import {
  UnbodyGoogleDoc,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'

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
}

export type PostDataProps = {
  remoteId: string // TODO: slug should be used for links
  date: string
  title: string
  description?: string
  author?: string
  authorEmail?: string // TODO: can we get  author: { name: string, email: string }?
  tags?: string[]
  coverImage?: UnbodyImageBlock | null
  summary?: string
  blocks?: UnbodyTextBlock
  toc?: Pick<UnbodyGoogleDoc, 'toc'>['toc']
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
  }

export default function Post({
  appearance: {
    size = PostSize.SMALL,
    classType = PostClassType.ARTICLE,
    postType = PostType.BODY,
    styleType = PostStyleType.LSD,
    aspectRatio = PostImageRatio.LANDSCAPE,
    showImage = true,
  } = {},
  data: {
    coverImage = null,
    date: dateStr = '',
    title,
    description,
    author,
    tags = [],
  },
  ...props
}: PostProps) {
  const date = new Date(dateStr)

  const _title = useMemo(
    () => (
      <CustomTypography
        variant={size === PostSize.SMALL ? 'h4' : 'h2'}
        genericFontFamily="serif"
      >
        {title}
      </CustomTypography>
    ),
    [title, size],
  )

  const _description = useMemo(
    () =>
      classType == PostClassType.ARTICLE && (
        <CustomTypography variant="body3" genericFontFamily="sans-serif">
          {description}
        </CustomTypography>
      ),
    [classType, description],
  )

  const _thumbnail = useMemo(() => {
    if (!showImage || !coverImage) return null
    if (postType === 'body') {
      return (
        <ThumbnailContainer aspectRatio={aspectRatio}>
          <Thumbnail fill src={coverImage.url} alt={coverImage.alt} />
        </ThumbnailContainer>
      )
    } else {
      // TBD
      return (
        <ThumbnailContainer aspectRatio={aspectRatio}>
          <Thumbnail fill src={coverImage.url} alt={coverImage.alt} />
          {_title}
          {_description}
        </ThumbnailContainer>
      )
    }
  }, [showImage, coverImage, aspectRatio, postType, _title, _description])

  const _header = useMemo(() => {
    if (postType === 'body')
      return (
        <>
          <div>
            <Row>
              <Typography variant="body3" genericFontFamily="sans-serif">
                {classType.toUpperCase()}
              </Typography>
              <Typography variant="body3">•</Typography>
              <Typography variant="body3" genericFontFamily="sans-serif">
                {date.toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'long', // TODO: Should be uppercase
                  year: 'numeric',
                })}
              </Typography>
            </Row>
            {_title}
          </div>
        </>
      )
  }, [postType, classType, date, _title])

  return (
    <Container {...props}>
      {_thumbnail}
      {_header}
      {postType === 'body' && _description}
      {classType === 'article' ? (
        <Typography variant="body3" genericFontFamily="sans-serif">
          {author}
        </Typography>
      ) : (
        <PodcastAuthor>
          <LogosCircleIcon color="primary" />
          <Typography variant="body3" genericFontFamily="sans-serif">
            Network State
          </Typography>
        </PodcastAuthor>
      )}
      {tags.length > 0 && (
        <TagContainer>
          {tags.map((tag) => (
            <Tag size="small" disabled={false} key={tag}>
              {tag}
            </Tag>
          ))}
        </TagContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: 'relative';
  gap: 16px;
`

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
`

const Thumbnail = styled(Image)`
  object-fit: cover;
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
const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
`

const PodcastAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
