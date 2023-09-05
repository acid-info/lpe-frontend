import { LPE } from '@/types/lpe.types'
import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { lsdUtils } from '../../../utils/lsd.utils'
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
      <Typography>More Episodes</Typography>
      <PostsGrid
        className="related-episodes"
        displayPodcastShow={false}
        posts={relatedEpisodes.slice(0, showIndex)}
        pattern={[{ cols: 2, size: 'xsmall' }]}
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
      {relatedEpisodes?.length > 4 && (
        <ShowButton onClick={toggleShowMore}>
          {showMore ? 'Show less' : 'Show more'}
        </ShowButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 72px;
  border-top: 1px solid rgb(var(--lsd-border-primary));
  padding-block: 16px;
  display: flex;
  flex-direction: column;

  .related-episodes {
    .post-card-wrapper {
      padding-top: 24px;
      padding-bottom: 8px;
    }
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'up')} {
    .related-episodes {
      padding-top: 24px;

      .post-card-wrapper {
        padding-top: 0;
        padding-bottom: 24px;
      }
    }
  }
`

const ShowButton = styled(Button)`
  height: 40px;
  margin-top: 24px;
`

export default RelatedEpisodes
