import { Grid, GridItem } from '@/components/Grid/Grid'
import EpisodesList from '@/components/Podcasts/Episodes.List'
import PodcastSection from '@/components/Podcasts/Podcast.Section'
import PodcastsLists from '@/components/Podcasts/Podcasts.Lists'
import { uiConfigs } from '@/configs/ui.configs'
import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import { LPE } from '../types/lpe.types'

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
            episodes={highlightedEpisodes.slice(0, 2)}
            bordered="except-first-row"
            header={<EpisodeListHeader>Latest Episodes</EpisodeListHeader>}
            pattern={[{ cols: 2, size: 'medium' }]}
            breakpoints={[
              {
                breakpoint: 'xs',
                pattern: [
                  { cols: 1, size: 'small', rowBorder: 'except-first-row' },
                ],
              },
              {
                breakpoint: 'sm',
                pattern: [{ cols: 2, size: 'small' }],
              },
              {
                breakpoint: 'md',
                pattern: [{ cols: 2, size: 'small' }],
              },
            ]}
          />
          <EpisodesList
            bordered
            episodes={highlightedEpisodes.slice(2)}
            pattern={[{ cols: 4, size: 'small' }]}
            breakpoints={[
              {
                breakpoint: 'xs',
                pattern: [{ cols: 1, size: 'small', rowBorder: false }],
              },
              {
                breakpoint: 'sm',
                pattern: [{ cols: 2, size: 'small' }],
              },
              {
                breakpoint: 'md',
                pattern: [{ cols: 2, size: 'small' }],
              },
            ]}
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
              shows={[show]}
              bordered="except-first-row"
              displayShow={false}
              episodes={(show.episodes as LPE.Podcast.Document[]).slice(0, 4)}
              pattern={[{ cols: 4, size: 'small' }]}
              breakpoints={[
                {
                  breakpoint: 'xs',
                  pattern: [{ cols: 1, size: 'small' }],
                },
                {
                  breakpoint: 'sm',
                  pattern: [{ cols: 2, size: 'small' }],
                },
              ]}
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
