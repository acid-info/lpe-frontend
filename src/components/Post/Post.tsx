import { Tag, Typography } from '@acid-info/lsd-react'
import { CommonProps } from '@acid-info/lsd-react/dist/utils/useCommonProps'
import styled from '@emotion/styled'
import Image from 'next/image'
import { LogosCircleIcon } from '../Icons/LogosCircleIcon'
import { useMemo } from 'react'

export type PostProps = CommonProps &
  React.HTMLAttributes<HTMLDivElement> & {
    size?: 'small' | 'large'
    classType?: 'article' | 'podcast'
    postType?: 'body' | 'header'
    styleType?: 'lsd' | 'default'
    aspectRatio?: 'portrait' | 'landscape' | 'square'
    showImage?: boolean
    imageUrl?: string
    date: Date
    title: string
    description?: string
    author?: string
    tags?: string[]
  }

const getAspectRatio = (aspectRatio: PostProps['aspectRatio']) => {
  switch (aspectRatio) {
    case 'portrait':
      return '9 / 16'
    case 'landscape':
      return '16 / 9'
    case 'square':
      return '1 / 1'
    default:
      return '16 / 9'
  }
}

export default function Post({
  size = 'small',
  classType = 'article',
  postType = 'body',
  styleType = 'lsd',
  aspectRatio = 'landscape',
  showImage = true,
  imageUrl,
  date,
  title,
  description,
  author,
  tags = [],
  ...props
}: PostProps) {
  const _title = useMemo(
    () => (
      <CustomTypography
        variant={size === 'small' ? 'h4' : 'h2'}
        genericFontFamily="serif"
      >
        {title}
      </CustomTypography>
    ),
    [title, size],
  )

  const _description = useMemo(
    () =>
      classType == 'article' && (
        <CustomTypography variant="body3" genericFontFamily="sans-serif">
          {description}
        </CustomTypography>
      ),
    [classType, description, size],
  )

  const _thumbnail = useMemo(() => {
    if (!showImage || !imageUrl) return null
    if (postType === 'body') {
      return (
        <ThumbnailContainer aspectRatio={aspectRatio}>
          <Thumbnail fill src={imageUrl} alt={imageUrl} />
        </ThumbnailContainer>
      )
    } else {
      // TBD
      return (
        <ThumbnailContainer aspectRatio={aspectRatio}>
          <Thumbnail fill src={imageUrl} alt={imageUrl} />
          {_title}
          {_description}
        </ThumbnailContainer>
      )
    }
  }, [showImage, imageUrl, aspectRatio, postType, _title, _description])

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
  aspectRatio: PostProps['aspectRatio']
}>`
  aspect-ratio: ${(p) =>
    p.aspectRatio ? getAspectRatio(p.aspectRatio) : '16 / 9'};
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
