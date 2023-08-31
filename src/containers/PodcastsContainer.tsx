import { Grid, GridItem } from '@/components/Grid/Grid'
import EpisodesList from '@/components/Podcasts/Episodes.List'
import PodcastSection from '@/components/Podcasts/Podcast.Section'
import PodcastsLists from '@/components/Podcasts/Podcasts.Lists'
import styled from '@emotion/styled'
import { LPE } from '../types/lpe.types'
import { lsdUtils } from '../utils/lsd.utils'

interface Props {
  shows: LPE.Podcast.Show[]
  latestEpisodes: LPE.Podcast.Document[]
  highlightedEpisodes: LPE.Podcast.Document[]
}

const PodcastsContainer = (props: Props) => {
  const { shows, highlightedEpisodes, latestEpisodes } = props

  const requiredHighlightPostsCount = 2
  const gapCount = requiredHighlightPostsCount - highlightedEpisodes.length

  // Spread the existing highlighted episodes and fill the rest with the latest episodes
  const highlightPosts = [
    ...highlightedEpisodes,
    ...latestEpisodes.slice(0, gapCount),
  ]

  // Now we need to remove the highlight posts from the latest episodes
  const latestPosts = latestEpisodes.filter(
    (episode) => !highlightPosts.includes(episode),
  )

  return (
    <PodcastsGrid>
      <PodcastsBodyContainer className={'w-16'}>
        <PodcastsLists shows={shows} />

        <Episodes>
          <PodcastSection>
            <EpisodesList
              episodes={highlightPosts}
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
              ]}
            />
            <EpisodesList
              bordered
              shows={shows}
              episodes={latestPosts.slice(0, 4)}
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
        </Episodes>
      </PodcastsBodyContainer>
    </PodcastsGrid>
  )
}

const PodcastsBodyContainer = styled(GridItem)``

const PodcastsGrid = styled(Grid)`
  width: 100%;
  padding-top: 64px;

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
    padding-top: 24px;
  }
`

const Episodes = styled.div`
  margin-top: 64px;
`

const EpisodeListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export default PodcastsContainer
