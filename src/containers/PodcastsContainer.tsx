import { Grid, GridItem } from '@/components/Grid/Grid'
import styled from '@emotion/styled'
import { LPE } from '../types/lpe.types'
import PodcastsList from '@/components/Podcasts/Podcasts.List'
import EpisodesList from '@/components/Podcasts/Episodes.List'
import { Button, Typography } from '@acid-info/lsd-react'
import { PodcastType } from '@/components/Post/Post'
import { LogosCircleIcon } from '@/components/Icons/LogosCircleIcon'
import Link from 'next/link'
import { HashingItOutIcon } from '@/components/Icons/HashingItOutIcon'

interface Props {
  shows: LPE.Podcast.Show[]
  latestEpisodes: LPE.Podcast.Document[]
}

const PodcastsContainer = (props: Props) => {
  const { shows, latestEpisodes } = props

  const networkState =
    shows.find((show) => show.slug === PodcastType.NETWORK_STATE) ?? shows[0]

  const hashingItOut =
    shows.find((show) => show.slug === PodcastType.HASHING_IT_OUT) ?? shows[1]

  return (
    <PodcastsGrid>
      <PodcastsBodyContainer className={'w-16'}>
        <PodcastsList shows={shows} />

        <Section>
          <EpisodesList
            header={<EpisodeListHeader>Latest Episodes</EpisodeListHeader>}
            episodes={latestEpisodes}
            podcastType={PodcastType.LATEST}
          />
        </Section>

        <Section>
          <EpisodesList
            header={
              <EpisodeListHeader>
                <Show>
                  <LogosCircleIcon width={38} height={38} />
                  <PodcastInfo>
                    <Typography variant="body1">
                      {networkState.title}
                    </Typography>
                    <Typography variant="body3">
                      {networkState.numberOfEpisodes} EP
                    </Typography>
                  </PodcastInfo>
                </Show>
                <Link href={`/podcasts/${networkState.slug}`}>
                  <Button size="small">See all episodes</Button>
                </Link>
              </EpisodeListHeader>
            }
            episodes={latestEpisodes.slice(0, 4)}
            podcastType={PodcastType.NETWORK_STATE}
          />
        </Section>

        <Section>
          <EpisodesList
            header={
              <EpisodeListHeader>
                <Show>
                  <HashingItOutIcon width={38} height={38} />
                  <PodcastInfo>
                    <Typography variant="body1">
                      {hashingItOut.title}
                    </Typography>
                    <Typography variant="body3">
                      {hashingItOut.numberOfEpisodes} EP
                    </Typography>
                  </PodcastInfo>
                </Show>
                <Link href={`/podcasts/${hashingItOut.slug}`}>
                  <Button size="small">See all episodes</Button>
                </Link>
              </EpisodeListHeader>
            }
            episodes={latestEpisodes.slice(0, 4)}
            podcastType={PodcastType.HASHING_IT_OUT}
          />
        </Section>
      </PodcastsBodyContainer>
    </PodcastsGrid>
  )
}

const PodcastsBodyContainer = styled(GridItem)`
  @media (min-width: 768px) and (max-width: 1200px) {
    grid-column: span 10 !important;
  }
`

const PodcastsGrid = styled(Grid)`
  width: 100%;
  @media (min-width: 768px) and (max-width: 1200px) {
  }
`

const Section = styled.div`
  margin-top: 140px;
`

const EpisodeListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Show = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const PodcastInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export default PodcastsContainer
