import { LPE } from '@/types/lpe.types'
import { Button } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { lsdUtils } from '../../../utils/lsd.utils'
import { PodcastSection } from '../../Podcasts/Podcast.Section'
import { PostsGrid } from '../../PostsGrid'

type props = {
  podcastSlug: string
  relatedEpisodes: LPE.Podcast.Document[]
}

const DEFAULT_SHOW_INDEX = 4

const RelatedEpisodes = ({ podcastSlug, relatedEpisodes }: props) => {
  const [showMore, setShowMore] = useState(false)
  const [showIndex, setShowIndex] = useState(DEFAULT_SHOW_INDEX)

  const toggleShowMore = () => {
    setShowMore(!showMore)
    setShowIndex(!showMore ? relatedEpisodes.length - 1 : DEFAULT_SHOW_INDEX)
  }

  return (
    <Container>
      <PodcastSection title="More posts">
        <PostsGrid
          displayPodcastShow={false}
          posts={relatedEpisodes.slice(0, showIndex)}
          pattern={[{ cols: 2, size: 'small' }]}
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

      {relatedEpisodes?.length > 4 && (
        <ShowButton onClick={toggleShowMore}>
          {showMore ? 'Show less' : 'Show more'}
        </ShowButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: var(--lsd-spacing-64);

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
    margin-top: var(--lsd-spacing-32);
  }
`

const ShowButton = styled(Button)`
  height: 40px;
  margin-top: 48px;

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
    margin-top: var(--lsd-spacing-32);
  }
`

export default RelatedEpisodes
