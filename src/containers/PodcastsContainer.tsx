import { Grid, GridItem } from '@/components/Grid/Grid'
import styled from '@emotion/styled'
import { LPE } from '../types/lpe.types'
import PodcastsLists from '@/components/Podcasts/Podcasts.Lists'
import EpisodesList from '@/components/Podcasts/Episodes.List'
import { Button, Typography } from '@acid-info/lsd-react'
import { LogosCircleIcon } from '@/components/Icons/LogosCircleIcon'
import Link from 'next/link'
import PodcastSection from '@/components/Podcasts/Podcast.Section'

interface Props {
  shows: LPE.Podcast.Show[]
  highlightedEpisodes: LPE.Podcast.Document[]
}

const PodcastsContainer = (props: Props) => {
  const { shows, highlightedEpisodes } = props

  return (
    <PodcastsGrid>
      <PodcastsBodyContainer className={'w-16'}>
        <PodcastsLists shows={shows} />

        <PodcastSection>
          <EpisodesList
            header={<EpisodeListHeader>Latest Episodes</EpisodeListHeader>}
            episodes={highlightedEpisodes.slice(0, 2)}
            isFeatured={true}
          />
          <EpisodesList
            episodes={highlightedEpisodes.slice(2)}
            divider={true}
          />
        </PodcastSection>

        {shows.map((show) => (
          <PodcastSection key={show.id}>
            <EpisodesList
              header={
                <EpisodeListHeader>
                  <Show>
                    <LogosCircleIcon width={38} height={38} />
                    <PodcastInfo>
                      <Typography variant="body1">{show.title}</Typography>
                      <Typography variant="body3">
                        {show.numberOfEpisodes} EP
                      </Typography>
                    </PodcastInfo>
                  </Show>
                  <Link href={`/podcasts/${show.slug}`}>
                    <Button size="small">See all episodes</Button>
                  </Link>
                </EpisodeListHeader>
              }
              episodes={show.episodes as LPE.Podcast.Document[]}
              show={show}
            />
          </PodcastSection>
        ))}
      </PodcastsBodyContainer>
    </PodcastsGrid>
  )
}

const PodcastsBodyContainer = styled(GridItem)``

const PodcastsGrid = styled(Grid)`
  width: 100%;
  @media (min-width: 768px) and (max-width: 1200px) {
  }
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
