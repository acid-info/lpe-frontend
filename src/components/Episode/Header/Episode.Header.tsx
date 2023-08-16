import { Tags } from '@/components/Tags'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'
import ReactPlayer from 'react-player'
import { default as Stats } from '@/components/Article/Article.Stats'
import { LogosCircleIcon } from '@/components/Icons/LogosCircleIcon'

export type EpisodeHeaderProps = LPE.Podcast.Document & { url: string }

const EpisodeHeader = ({
  title,
  description,
  publishedAt,
  tags,
  url,
}: EpisodeHeaderProps) => {
  const date = new Date(publishedAt)
  return (
    <EpisodeHeaderContainer>
      <PlayerContainer>
        <ReactPlayer url={url} forceVideo={true} controls={true} />
      </PlayerContainer>
      <Stats date={date} readingLength={6} />
      <EpisodeTitle variant="h1" genericFontFamily="serif" component="h1">
        {title}
      </EpisodeTitle>
      <PodcastName>
        <LogosCircleIcon width={24} height={24} />
        Network State Podcast
      </PodcastName>
      {description && (
        <EpisodeSubtitle
          variant="h6"
          genericFontFamily="sans-serif"
          component="div"
        >
          {description}
        </EpisodeSubtitle>
      )}
      {tags && <Tags tags={tags} />}
    </EpisodeHeaderContainer>
  )
}

const EpisodeHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
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
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: var(--lsd-subtitle1-fontSize);
  }
`

const PodcastName = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`

const PlayerContainer = styled.div`
  margin-bottom: 32px;
`

export default EpisodeHeader
