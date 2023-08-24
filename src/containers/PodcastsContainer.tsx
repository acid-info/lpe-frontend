import { Grid, GridItem } from '@/components/Grid/Grid'
import { LogosCircleIcon } from '@/components/Icons/LogosCircleIcon'
import EpisodesList from '@/components/Podcasts/Episodes.List'
import PodcastSection from '@/components/Podcasts/Podcast.Section'
import PodcastsLists from '@/components/Podcasts/Podcasts.Lists'
import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { LPE } from '../types/lpe.types'
import { uiConfigs } from '@/configs/ui.configs'
import { useWindowSize } from 'react-use'
import Image from 'next/image'

interface Props {
  shows: LPE.Podcast.Show[]
  highlightedEpisodes: LPE.Podcast.Document[]
}

const PodcastsContainer = (props: Props) => {
  const { shows, highlightedEpisodes } = props

  const { width } = useWindowSize()
  const isMobile = width < 768 // TODO : use global breakpoint + use media query if cols is not needed

  return (
    <PodcastsGrid>
      <PodcastsBodyContainer className={'w-16'}>
        <PodcastsLists shows={shows} />

        <PodcastSection>
          <EpisodesList
            cols={isMobile ? 1 : 2}
            size="medium"
            episodes={highlightedEpisodes.slice(0, 2)}
            header={<EpisodeListHeader>Latest Episodes</EpisodeListHeader>}
          />
          <EpisodesList
            cols={isMobile ? 1 : 4}
            size="small"
            bordered
            episodes={highlightedEpisodes.slice(2)}
          />
        </PodcastSection>

        {shows.map((show) => (
          <PodcastSection key={show.id}>
            <EpisodesList
              header={
                <EpisodeListHeader>
                  <Show>
                    <Image
                      src={show.logo.url}
                      alt={show.logo.alt}
                      width={38}
                      height={38}
                    />
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
              cols={isMobile ? 1 : 4}
              shows={[show]}
              displayShow={false}
              episodes={show.episodes as LPE.Podcast.Document[]}
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
  @media (max-width: 768px) {
    margin-top: ${uiConfigs.navbarRenderedHeight + 80}px;
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
