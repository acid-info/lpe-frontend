import { Typography } from '@acid-info/lsd-react'
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
import { Authors } from '../Authors'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'
import { Tags } from '@/components/Tags'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'

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
  slug: string
  date: string
  title: string
  description?: string
  mentions: UnbodyGraphQl.Fragments.MentionItem[]
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
    mentions,
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
          <ResponsiveImage data={coverImage} height={'458px'} />
          {/*<Thumbnail fill src={coverImage.url} alt={coverImage.alt} />*/}
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
        <Authors mentions={mentions} email={false} />
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
  overflow: hidden;
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

const PodcastAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
