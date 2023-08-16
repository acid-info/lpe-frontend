import { Tags } from '@/components/Tags'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { LPE } from '../../types/lpe.types'
import { Authors } from '../Authors'
import { AuthorsDirection } from '../Authors/Authors'
import { LogosCircleIcon } from '../Icons/LogosCircleIcon'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'

export enum Size {
  SMALL = 'small',
  LARGE = 'large',
}

interface Props {
  podcast: string
  episode: LPE.Podcast.Document
  size?: Size
}

export default function EpisodeCard({
  podcast,
  episode,
  size = Size.SMALL,
  ...props
}: Props) {
  const _title = useMemo(
    () => (
      <TitleLink href={`/podcasts/${podcast}/${episode.slug}`}>
        <Title
          variant={size === Size.SMALL ? 'h4' : 'h3'}
          genericFontFamily="serif"
        >
          {episode.title}
        </Title>
      </TitleLink>
    ),
    [podcast, episode],
  )

  const _thumbnail = useMemo(() => {
    if (!episode.coverImage) return null

    return (
      <Link href={`/podcasts/${podcast}/${episode.slug}`}>
        <ResponsiveImage data={episode.coverImage} />
      </Link>
    )
  }, [podcast, episode])

  const _header = useMemo(() => {
    const date = new Date(episode.publishedAt)
    return (
      <>
        <>
          <Row>
            <Typography variant="body3" genericFontFamily="sans-serif">
              PODCAST
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
        </>
      </>
    )
  }, [episode, _title])

  return (
    <Container {...props}>
      {_thumbnail}
      {_header}
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
