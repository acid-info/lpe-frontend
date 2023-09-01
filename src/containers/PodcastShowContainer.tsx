import { Grid, GridItem } from '@/components/Grid/Grid'
import EpisodesList from '@/components/Podcasts/Episodes.List'
import PodcastSection from '@/components/Podcasts/Podcast.Section'
import PodcastShowCard from '@/components/Podcasts/PodcastShowCard'
import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useRecentEpisodes } from '../queries/useRecentEpisodes.query'
import { ApiPaginatedPayload } from '../types/data.types'
import { LPE } from '../types/lpe.types'
import { lsdUtils } from '../utils/lsd.utils'

interface Props {
  show: LPE.Podcast.Show
  latestEpisodes: ApiPaginatedPayload<LPE.Podcast.Document[]>
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
        <PodcastsBodyContainer>
          <CustomPodcastShowCard show={show} />
          <PodcastSection>
            <EpisodesList
              shows={[show]}
              displayShow={false}
              episodes={highlightedEpisodes}
              header={<Typography variant="body2">All episodes</Typography>}
              bordered="except-first-row"
              pattern={[
                {
                  cols: 2,
                  size: 'medium',
                },
              ]}
              breakpoints={[
                {
                  breakpoint: 'xs',
                  pattern: [
                    {
                      cols: 1,
                      size: 'small',
                      rowBorder: 'except-first-row',
                    },
                  ],
                },
              ]}
            />
          </PodcastSection>
          <EpisodesList
            shows={[show]}
            displayShow={false}
            episodes={query.posts}
            bordered={
              highlightedEpisodes.length > 0 ? true : 'except-first-row'
            }
            pattern={[
              {
                cols: 4,
                size: 'small',
              },
            ]}
            breakpoints={[
              {
                breakpoint: 'xs',
                pattern: [{ cols: 1, size: 'small' }],
              },
              {
                breakpoint: 'sm',
                pattern: [{ cols: 4, size: 'xsmall' }],
              },
              {
                breakpoint: 'md',
                pattern: [{ cols: 4, size: 'xsmall' }],
              },
            ]}
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

const CustomPodcastShowCard = styled(PodcastShowCard)`
  padding: 64px 0;

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
    padding: 48px 0;
  }
`

export default PodcastShowContainer
