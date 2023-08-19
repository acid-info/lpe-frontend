import { Grid, GridItem } from '@/components/Grid/Grid'
import styled from '@emotion/styled'
import { LPE } from '../types/lpe.types'
import EpisodesList from '@/components/Podcasts/Episodes.List'
import { Typography } from '@acid-info/lsd-react'
import PodcastShowCard from '@/components/Podcasts/PodcastShowCard'
import { PodcastType } from '@/components/PostCard/PostCard'
import PodcastSection from '@/components/Podcasts/Podcast.Section'

interface Props {
  show: LPE.Podcast.Show
  latestEpisodes: LPE.Podcast.Document[]
  highlightedEpisodes: LPE.Podcast.Document[]
}

const PodcastShowContainer = (props: Props) => {
  const { show, latestEpisodes, highlightedEpisodes } = props

  return (
    <PodcastsGrid>
      <PodcastsBodyContainer className={'w-16'}>
        <PodcastShowCard show={show} />

        <PodcastSection>
          <EpisodesList
            header={<Typography variant="body2">All episodes</Typography>}
            episodes={highlightedEpisodes}
            show={show}
          />
        </PodcastSection>

        <EpisodesList episodes={latestEpisodes} divider={true} show={show} />
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
