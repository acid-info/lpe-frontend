import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { Button, Typography } from '@acid-info/lsd-react'
import Link from 'next/link'
import Image from 'next/image'
import { LogosCircleIcon } from '../Icons/LogosCircleIcon'
import { HashingItOutIcon } from '../Icons/HashingItOutIcon'

interface Props {
  shows: LPE.Podcast.Show[]
}

export default function PodcastsList({ shows }: Props) {
  return (
    <PodcastsContainer>
      {shows &&
        shows.map((show) => (
          <PodcastCard key={show.id}>
            {show.slug === 'network-state' ? (
              <LogosCircleIcon width={56} height={56} />
            ) : (
              <HashingItOutIcon width={56} height={56} />
            )}
            <Typography variant="h3">{show.title}</Typography>
            <Row>
              <Typography variant="body2">
                Hosted by: {show.hosts[0].name}
              </Typography>
              <Typography variant="body2">•</Typography>
              <Typography variant="body2">
                {show.numberOfEpisodes} EP
              </Typography>
            </Row>
            <Description variant="body2">{show.description}</Description>
            <Link href={`/podcasts/${show.slug}`}>
              <Button>Go to the show page</Button>
            </Link>
          </PodcastCard>
        ))}
    </PodcastsContainer>
  )
}

const PodcastsContainer = styled.article`
  display: flex;
  gap: 16px;

  @media (min-width: 768px) and (max-width: 1200px) {
  }
`

const PodcastCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid rgb(var(--lsd-text-primary));
  width: 50%;
`

const Row = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`

const Description = styled(Typography)`
  margin-bottom: 16px;
`
