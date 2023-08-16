import { Grid, GridItem } from '@/components/Grid/Grid'
import styled from '@emotion/styled'
import { LPE } from '../types/lpe.types'
import PodcastsList from '@/components/Podcasts/Podcasts.List'
import EpisodesList from '@/components/Podcasts/Episodes.List'
import { Typography } from '@acid-info/lsd-react'
import { PodcastType } from '@/components/Post/Post'

interface Props {
  shows: LPE.Podcast.Show[]
  latestEpisodes: LPE.Podcast.Document[]
}

const PodcastsContainer = (props: Props) => {
  const { shows, latestEpisodes } = props

  return (
    <PodcastsGrid>
      <PodcastsBodyContainer className={'w-16'}>
        <PodcastsList shows={shows} />
        <EpisodesList
          header={<Typography variant="body2">Latest Episodes</Typography>}
          episodes={latestEpisodes}
          podcastType={PodcastType.LATEST}
        />

        <EpisodesList
          header={<Typography variant="body2">State of Network</Typography>}
          episodes={latestEpisodes.slice(0, 4)}
          podcastType={PodcastType.NETWORK_STATE}
        />

        <EpisodesList
          header={<Typography variant="body2">Hashing It Out</Typography>}
          episodes={latestEpisodes.slice(0, 4)}
          podcastType={PodcastType.HASHING_IT_OUT}
        />
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

export default PodcastsContainer
