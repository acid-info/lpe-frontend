import { Grid, GridItem } from '@/components/Grid/Grid'
import styled from '@emotion/styled'
import { LPE } from '../types/lpe.types'
import EpisodesList from '@/components/Podcasts/Episodes.List'
import { Button, Typography } from '@acid-info/lsd-react'
import PodcastShowCard from '@/components/Podcasts/PodcastShowCard'
import PodcastSection from '@/components/Podcasts/Podcast.Section'
import { api } from '@/services/api.service'
import { useState } from 'react'

interface Props {
  show: LPE.Podcast.Show
  latestEpisodes: LPE.Podcast.Document[]
  highlightedEpisodes: LPE.Podcast.Document[]
}

const PodcastShowContainer = (props: Props) => {
  const { show, latestEpisodes, highlightedEpisodes } = props
  const [latest, setLatest] = useState(latestEpisodes)
  const [page, setPage] = useState(2)
  const [showSeeMore, setShowSeeMore] = useState(true)

  const handleLoadMore = async () => {
    const response = await api.getLatestEpisodes({
      page: page,
      limit: 9,
      showSlug: show.slug,
    })

    if (response.data.length === 0) {
      setShowSeeMore(false)
      return
    }

    setLatest((prev) => [...prev, ...response.data])
    setPage((prev) => prev + 1)
  }

  return (
    <>
      <PodcastsGrid>
        <PodcastsBodyContainer className={'w-16'}>
          <PodcastShowCard show={show} />
          <PodcastSection>
            <EpisodesList
              header={<Typography variant="body2">All episodes</Typography>}
              episodes={highlightedEpisodes}
              show={show}
              isFeatured={true}
            />
          </PodcastSection>
          <EpisodesList episodes={latest} divider={true} show={show} />
        </PodcastsBodyContainer>
      </PodcastsGrid>
      {showSeeMore && (
        <SeeMoreButton onClick={handleLoadMore}>
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
