import { LPE } from '@/types/lpe.types'
import Link from 'next/link'
import { PodcastType } from './PostCard'
import { Typography } from '@acid-info/lsd-react'
import { LogosCircleIcon } from '../Icons/LogosCircleIcon'
import styled from '@emotion/styled'

export interface PostCardShowDetailsProps {
  title: string
  slug: string
  episodeNumber: number
  logo?: LPE.Image.Document
  podcast: PodcastType
}

// TODO
export const PostCardShowDetails = (props: PostCardShowDetailsProps) => {
  const { slug, episodeNumber, podcast } = props
  const isNetWokrState = podcast === PodcastType.NETWORK_STATE

  return (
    <CustomLink href={`/podcasts/${slug}`}>
      <Container>
        {isNetWokrState ? (
          <LogosCircleIcon width={38} height={38} />
        ) : (
          <LogosCircleIcon width={38} height={38} />
        )}
        <PodcastInfo>
          <Typography variant="body2">
            {isNetWokrState ? 'State of Network' : 'Hashing It Out'}
          </Typography>
          <Typography variant="body3">{episodeNumber} EP</Typography>
        </PodcastInfo>
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
