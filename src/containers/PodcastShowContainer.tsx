import { Grid, GridItem } from '@/components/Grid/Grid'
import styled from '@emotion/styled'
import { LPE } from '../types/lpe.types'
import PodcastsList from '@/components/Podcasts/Podcasts.List'
import EpisodesList from '@/components/Podcasts/Episodes.List'
import { Typography } from '@acid-info/lsd-react'
import { PodcastType } from '@/components/Post/Post'
import PodcastShowCard from '@/components/Podcasts/PodcastShowCard'

interface Props {
  show: LPE.Podcast.Show
  latestEpisodes: LPE.Podcast.Document[]
}

const PodcastShowContainer = (props: Props) => {
  const { show, latestEpisodes } = props

  return (
    <PodcastsGrid>
      <PodcastsBodyContainer className={'w-16'}>
        <PodcastShowCard show={show} />
        <EpisodesList
          header={<Typography variant="body2">Latest Episodes</Typography>}
          episodes={latestEpisodes}
          podcastType={PodcastType.LATEST}
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

export default PodcastShowContainer
