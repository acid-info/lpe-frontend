import { Grid, GridItem } from '@/components/Grid/Grid'
import EpisodesList from '@/components/Podcasts/Episodes.List'
import PodcastSection from '@/components/Podcasts/Podcast.Section'
import PodcastShowCard from '@/components/Podcasts/PodcastShowCard'
import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useRecentEpisodes } from '../queries/useRecentEpisodes.query'
import { LPE } from '../types/lpe.types'
import { uiConfigs } from '@/configs/ui.configs'
import { useWindowSize } from 'react-use'

interface Props {
  show: LPE.Podcast.Show
  latestEpisodes: LPE.Podcast.Document[]
  highlightedEpisodes: LPE.Podcast.Document[]
}

const PodcastShowContainer = (props: Props) => {
  const { show, latestEpisodes, highlightedEpisodes } = props
  const { width } = useWindowSize()

  const isMobile = width < 768 // TODO : use global breakpoint + use media query if cols is not needed

  const query = useRecentEpisodes({
    limit: 8,
    showSlug: show.slug,
    initialData: latestEpisodes,
  })

  return (
    <>
      <PodcastsGrid>
        <PodcastsBodyContainer>
          <PodcastShowCard show={show} />
          <PodcastSection marginTop={64}>
            <EpisodesList
              cols={isMobile ? 1 : 2}
              size="medium"
              shows={[show]}
              displayShow={false}
              episodes={highlightedEpisodes}
              header={<Typography variant="body2">All episodes</Typography>}
            />
          </PodcastSection>
          <EpisodesList
            cols={isMobile ? 1 : 4}
            bordered
            size="small"
            shows={[show]}
            displayShow={false}
            episodes={query.posts}
          />
        </PodcastsBodyContainer>
      </PodcastsGrid>
      {query.hasNextPage && (
        <SeeMoreButton onClick={() => query.fetchNextPage()}>
          See more episodes
        </SeeMoreButton>
      )}
    </>
  )
}

const PodcastsGrid = styled(Grid)`
  width: 100%;
  margin-top: -15px; // offset for postSectionMargin

  @media (max-width: 768px) {
    margin-top: ${uiConfigs.navbarRenderedHeight + 48}px;
  }
`

const PodcastsBodyContainer = styled(GridItem)`
  grid-column: span 16;
`

const SeeMoreButton = styled(Button)`
  display: block;
  width: 236px;
  height: 40px;
  margin: 24px auto;
`

export default PodcastShowContainer
