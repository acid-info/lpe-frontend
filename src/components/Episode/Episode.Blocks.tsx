import { useState } from 'react'
import { LPE } from '../../types/lpe.types'
import { RenderEpisodeBlock } from './Episode.Block'
import styled from '@emotion/styled'
import { Button } from '@acid-info/lsd-react'

type Props = {
  data: LPE.Podcast.Document
}

const EpisodeBlocks = ({ data }: Props) => {
  const [showMore, setShowMore] = useState(false)
  const blocks = data?.transcription

  return blocks?.length && showMore ? (
    <>
      {blocks.map((block, idx) => (
        <RenderEpisodeBlock key={'block-' + idx} block={block} />
      ))}
      <ShowButton onClick={() => setShowMore(false)}>Show Less</ShowButton>
    </>
  ) : blocks?.length && !showMore ? (
    <>
      {blocks.slice(0, 3).map((block, idx) => (
        <RenderEpisodeBlock key={'block-' + idx} block={block} />
      ))}
      <ShowButton onClick={() => setShowMore(true)}>Show More</ShowButton>
    </>
  ) : null
}

const ShowButton = styled(Button)`
  margin-top: calc(var(--lsd-body2-lineHeight) * -1);
  height: 40px;
`

export default EpisodeBlocks
