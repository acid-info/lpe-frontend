import { Authors } from '@/components/Authors'
import { Tags } from '@/components/Tags'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'
import ReactPlayer from 'react-player'

export type EpisodeHeaderProps = LPE.Podcast.Document & { url: string }

const EpisodeHeader = ({
  title,
  description,
  publishedAt,
  authors,
  tags,
  url,
}: EpisodeHeaderProps) => {
  const date = publishedAt ? new Date(publishedAt) : null
  return (
    <EpisodeHeaderContainer>
      <ReactPlayer url={url} forceVideo={true} controls={true} />
      <Typography>
        {date &&
          date.toLocaleString('en-GB', {
            day: 'numeric',
            month: 'long', // TODO: Should be uppercase
            year: 'numeric',
          })}
      </Typography>
      <EpisodeTitle variant="h1" genericFontFamily="serif" component="h1">
        {title}
      </EpisodeTitle>
      {description && (
        <EpisodeSubtitle
          variant="body1"
          genericFontFamily="sans-serif"
          component="div"
        >
          {description}
        </EpisodeSubtitle>
      )}
      {tags && <Tags tags={tags} />}
      <AuthorsContainer>
        <Authors authors={authors} email={true} gap={12} />
      </AuthorsContainer>
    </EpisodeHeaderContainer>
  )
}

const EpisodeHeaderContainer = styled.header`
  .mobileSummary {
    display: none;
  }

  .desktopSummary {
    display: block;
  }

  @media (max-width: 768px) {
    .mobileSummary {
      display: block;
      p {
        font-size: var(--lsd-body3-fontSize);
        line-height: var(--lsd-body3-lineHeight);
        margin-bottom: 24px;
      }
      hr {
        display: none;
      }
    }

    .desktopSummary {
      display: none;
    }
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
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: var(--lsd-subtitle1-fontSize);
  }
`

const AuthorsContainer = styled.div`
  //margin-block: 24px;
  margin-top: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-top: 16px;
    margin-bottom: 24px;

    a[href^='mailto:'] {
      display: none;
    }
  }
`

export default EpisodeHeader
