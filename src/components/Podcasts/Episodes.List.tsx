import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { PostsGrid, PostsGridProps } from '../PostsGrid'

interface Props {}

export type EpisodesListProps = Partial<
  React.ComponentProps<typeof EpisodeListContainer>
> & {
  header?: React.ReactNode
  episodes: LPE.Podcast.Document[]
  shows?: LPE.Podcast.Show[]
  displayShow?: boolean
} & Pick<PostsGridProps, 'pattern' | 'breakpoints' | 'bordered'>

export default function EpisodesList({
  shows = [],
  episodes = [],
  pattern,
  breakpoints,
  bordered,
  header,
  displayShow = true,
  ...props
}: EpisodesListProps) {
  return (
    <EpisodeListContainer {...props}>
      {header}
      <PostsGrid
        shows={shows}
        posts={episodes}
        bordered={bordered}
        pattern={pattern}
        breakpoints={breakpoints}
        displayPodcastShow={displayShow}
      />
    </EpisodeListContainer>
  )
}

const EpisodeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`
