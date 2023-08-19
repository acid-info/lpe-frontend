import { LPE } from '@/types/lpe.types'
import Link from 'next/link'
import { Typography } from '@acid-info/lsd-react'
import { LogosCircleIcon } from '../Icons/LogosCircleIcon'
import styled from '@emotion/styled'
import Image from 'next/image'

export interface PostCardShowDetailsProps {
  title: string
  slug: string
  episodeNumber: number
  logo?: LPE.Image.Document
  podcast: LPE.Podcast.Show
}

// TODO
export const PostCardShowDetails = (props: PostCardShowDetailsProps) => {
  const { slug, episodeNumber, podcast } = props

  return (
    <CustomLink href={`/podcasts/${slug}`}>
      <Container>
        {podcast && (
          <>
            <Image
              src={podcast?.logo?.url}
              width={38}
              height={38}
              alt={podcast.logo.alt}
            />
            <PodcastInfo>
              <Typography variant="body2">{podcast.title}</Typography>
              <Typography variant="body3">{episodeNumber} EP</Typography>
            </PodcastInfo>
          </>
        )}
      </Container>
    </CustomLink>
  )
}

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const PodcastInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const CustomLink = styled(Link)`
  text-decoration: none;
`
