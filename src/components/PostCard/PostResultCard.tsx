import { PostCardCover } from '@/components/PostCard/PostCard.Cover'
import { PostCardShowDetails } from '@/components/PostCard/PostCard.ShowDetails'
import { Tags } from '@/components/Tags'
import styled from '@emotion/styled'
import clsx from 'clsx'

import { PostCardProps } from '@/components/PostCard/PostCard'
import { PostCardSubTitle } from '@/components/PostCard/PostCard.Subtitle'
import { PostCardTitle } from '@/components/PostCard/PostCard.Title'
import { getPostLink } from '../../utils/route.utils'
import { Authors } from '../Authors'
import { AuthorsDirection } from '../Authors/Authors'
import { PostCardLabel } from './PostCard.Label'

type PostResultCardProps = Omit<PostCardProps, 'size'>

export const PostResultCard = (_props: PostResultCardProps) => {
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
    applySizeStyles = true,
    displayPodcastShow = true,
    displayYear = true,
    ...props
  } = _props

  const link = getPostLink(contentType, {
    postSlug: slug,
    showSlug: podcastShowDetails?.slug,
  })

  return (
    <Container className={clsx('post-card-result', props.className)}>
      {coverImage && (
        <PostCardCover
          href={link}
          imageProps={imageProps}
          imageData={coverImage}
        />
      )}
      <PostCardLabel
        contentType={contentType}
        displayYear={displayYear}
        date={date}
      />
      <PostCardTitle href={link}>{title}</PostCardTitle>
      <PostCardSubTitle>{subtitle}</PostCardSubTitle>
      {authors && authors.length > 0 && (
        <Authors
          className="post-card__authors"
          authors={authors}
          email={false}
          flexDirection={AuthorsDirection.ROW}
          gap={8}
        />
      )}
      {displayPodcastShow && podcastShowDetails && (
        <PostCardShowDetails
          {...podcastShowDetails}
          className="post-card__show-details"
          applySizeStyles={false}
          size={'small'}
        />
      )}
      {tags.length > 0 && <Tags className="post-card__tags" tags={tags} />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: 'relative';
  gap: 16px 0;

  .post-card__label {
    margin-bottom: 0 !important;
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
`
