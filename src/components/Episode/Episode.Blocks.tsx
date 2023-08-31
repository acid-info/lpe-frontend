import { lsdUtils } from '@/utils/lsd.utils'
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

const EpisodeBlocks = ({ data }: Props) => {
  const [showMore, setShowMore] = useState(false)
  const blocks = data?.content as LPE.Post.TextBlock[]
  const isMobile = useWindowSize().width < 756

  return (
    <BlocksContainer
      className={`${showMore ? 'showMore' : ''}`}
      n={getMaxRenderIndex(isMobile)}
    >
      {blocks.map((block, idx) => (
        <RenderEpisodeBlock key={'block-' + idx} block={block} />
      ))}
      {blocks.length > getMaxRenderIndex(isMobile) && (
        <ShowButton onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Show Less' : 'Show More'}
        </ShowButton>
      )}
    </BlocksContainer>
  )
}

const BlocksContainer = styled.div<{ n: number }>`
  display: flex;
  flex-direction: column;
  gap: 24px;

  > *:nth-of-type(n + ${({ n }) => n + 1}) {
    display: none;
  }

  &.showMore {
    > *:nth-of-type(n + ${({ n }) => n + 1}) {
      display: flex;
    }
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'down')} {
    gap: 16px;
  }
`
const ShowButton = styled(Button)`
  margin-top: calc(var(--lsd-body2-lineHeight) * 1);
  height: 40px;
`

export default EpisodeBlocks
