import { Grid, GridItem } from '@/components/Grid/Grid'
import EpisodesList from '@/components/Podcasts/Episodes.List'
import PodcastSection from '@/components/Podcasts/Podcast.Section'
import PodcastShowCard from '@/components/Podcasts/PodcastShowCard'
import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useRecentEpisodes } from '../queries/useRecentEpisodes.query'
import { LPE } from '../types/lpe.types'

interface Props {
  show: LPE.Podcast.Show
  latestEpisodes: LPE.Podcast.Document[]
  highlightedEpisodes: LPE.Podcast.Document[]
}

const PodcastShowContainer = (props: Props) => {
  const { show, latestEpisodes, highlightedEpisodes } = props

  const query = useRecentEpisodes({
    limit: 8,
    showSlug: show.slug,
    initialData: latestEpisodes,
  })

  return (
    <>
      <PodcastsGrid>
        <PodcastsBodyContainer className={'w-16'}>
          <PodcastShowCard show={show} />
          <PodcastSection>
            <EpisodesList
              cols={2}
              size="medium"
              shows={[show]}
              displayShow={false}
              episodes={highlightedEpisodes}
              header={<Typography variant="body2">All episodes</Typography>}
            />
          </PodcastSection>
          <EpisodesList
            cols={4}
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

const PodcastsBodyContainer = styled(GridItem)``

const SeeMoreButton = styled(Button)`
  display: block;
  width: 236px;
  height: 40px;
  margin: 24px auto;
`

const PodcastsGrid = styled(Grid)`
  width: 100%;
  @media (min-width: 768px) and (max-width: 1200px) {
  }
`

export default PodcastShowContainer
