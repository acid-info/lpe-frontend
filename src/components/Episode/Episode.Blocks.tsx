import useWindowSize from '@/utils/ui.utils'
import { Button } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { LPE } from '../../types/lpe.types'
import { RenderEpisodeBlock } from './Episode.Block'

type Props = {
  data: LPE.Podcast.Document
}

const getMaxRenderIndex = (isMobile: boolean) => (isMobile ? 7 : 20)

const DEFUALT_RENDER_COUNT = 6

const OFFSET = 20

const EpisodeBlocks = ({ data }: Props) => {
  const [showMore, setShowMore] = useState(true)
  const blocks = data?.content as LPE.Post.TextBlock[]
  const isMobile = useWindowSize().width < 756
  const [count, setCount] = useState(DEFUALT_RENDER_COUNT)

  const handleShowMore = () => {
    setCount((prev) => prev + OFFSET)

    if (count >= blocks.length) {
      setShowMore(false)
    }
  }

  return (
    <BlocksContainer
      className={`${showMore ? 'showMore' : ''}`}
      n={getMaxRenderIndex(isMobile)}
    >
      {blocks.slice(0, count).map((block, index) => (
        <RenderEpisodeBlock key={'block-' + index} block={block} />
      ))}
      {showMore && <ShowButton onClick={handleShowMore}>Show More</ShowButton>}
    </BlocksContainer>
  )
}

const BlocksContainer = styled.div<{ n: number }>`
  display: flex;
  flex-direction: column;
  gap: 32px;

  > *:nth-of-type(n + ${({ n }) => n + 1}) {
    display: none;
  }

  &.showMore {
    > *:nth-of-type(n + ${({ n }) => n + 1}) {
      display: flex;
    }
  }
`
const ShowButton = styled(Button)`
  margin-top: calc(var(--lsd-body2-lineHeight) * 1);
  height: 40px;
`

export default EpisodeBlocks
