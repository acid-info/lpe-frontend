import { Tags } from '@/components/Tags'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'
import { LogosCircleIcon } from '@/components/Icons/LogosCircleIcon'
import EpisodeChannels from './Episode.Channels'
import EpisodeStats from '../Episode.Stats'
import EpisodePlayer from './Episode.Player'
import Image from 'next/image'
import Link from 'next/link'

export type EpisodeHeaderProps = LPE.Podcast.Document & {
  channel: LPE.Podcast.Channel
  duration: number
}

const EpisodeHeader = ({
  channel,
  title,
  description,
  publishedAt,
  tags,
  show,
  channels,
  duration,
  coverImage,
}: EpisodeHeaderProps) => {
  const date = new Date(publishedAt)

  return (
    <EpisodeHeaderContainer>
      <EpisodePlayer
        title={title}
        showTitle={show?.title ?? ''}
        channel={channel}
        coverImage={coverImage}
      />
      <EpisodeStats date={date} duration={duration} />
      <EpisodeTitle variant="h1" genericFontFamily="serif" component="h1">
        {title}
      </EpisodeTitle>
      {show && (
        <CustomLink href={`/podcasts/${show.slug}`}>
          <Show>
            <Image
              src={show.logo.url}
              alt={show.logo.alt}
              width={24}
              height={24}
            />
            <Typography variant="body2">{show?.title}</Typography>
          </Show>
        </CustomLink>
      )}
      {tags && <Tags tags={tags} />}
      {channels && <EpisodeChannels channels={channels} />}
      {description && (
        <EpisodeSubtitle
          variant="h6"
          genericFontFamily="sans-serif"
          component="div"
        >
          {description}
        </EpisodeSubtitle>
      )}
    </EpisodeHeaderContainer>
  )
}

const EpisodeHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding-top: 32px;
  }
`

const CustomTypography = styled(Typography)`
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: pre-wrap;
`

const EpisodeTitle = styled(Typography)`
  margin-bottom: 16px;
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`

const EpisodeSubtitle = styled(CustomTypography)`
  margin-top: 32px;

  @media (max-width: 768px) {
    font-size: var(--lsd-subtitle1-fontSize);
  }
`

const Show = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  text-decoration: none;
`

const CustomLink = styled(Link)`
  text-decoration: none;
`

export default EpisodeHeader
