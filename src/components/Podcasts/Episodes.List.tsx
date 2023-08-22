import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { PostsGrid, PostsGridProps } from '../PostsGrid'

interface Props {
  header?: React.ReactNode
  episodes: LPE.Podcast.Document[]
  shows?: LPE.Podcast.Show[]
  bordered?: boolean
  size?: PostsGridProps['size']
  cols?: number
  displayShow?: boolean
}

export default function EpisodesList({
  shows = [],
  header,
  episodes,
  bordered = false,
  cols = 4,
  size = 'small',
  displayShow = true,
}: Props) {
  return (
    <EpisodeListContainer>
      {header}
      <PostsGrid
        shows={shows}
        posts={episodes}
        bordered={bordered}
        cols={cols}
        size={size}
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
