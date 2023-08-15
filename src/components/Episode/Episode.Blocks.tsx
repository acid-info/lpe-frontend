import { LPE } from '../../types/lpe.types'
import { RenderEpisodeBlock } from './Episode.Block'

type Props = {
  data: LPE.Podcast.Document
}

const EpisodeBlocks = ({ data }: Props) => {
  const blocks = data?.transcription

  return blocks?.length ? (
    <>
      {blocks.map((block, idx) => (
        <RenderEpisodeBlock key={'block-' + idx} block={block} />
      ))}
    </>
  ) : null
}

export default EpisodeBlocks
