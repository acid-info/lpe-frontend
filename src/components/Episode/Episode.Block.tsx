import {
  extractClassFromFirstTag,
  extractIdFromFirstTag,
} from '@/utils/html.utils'
import { parseText, parseTimestamp } from '@/utils/string.utils'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import ReactPlayer from 'react-player'
import { LPE } from '../../types/lpe.types'

export const RenderEpisodeBlock = ({
  block,
}: {
  block: Extract<LPE.Post.ContentBlock, LPE.Post.TextBlock>
  hide?: boolean
}) => {
  const isYoutubeRegex =
    /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/

  const isYoutube = isYoutubeRegex.test(block.html)
  const youtubeLink = block.html.match(isYoutubeRegex) ?? []

  return isYoutube ? (
    <ReactPlayer url={youtubeLink[0]} />
  ) : (
    <TranscriptionItem variant="body1" component={'p'}>
      <span>{parseTimestamp(block.text)}</span>
      <span>|</span>
      <span
        className={extractClassFromFirstTag(block.html) || ''}
        id={extractIdFromFirstTag(block.html) || `p-${block.id}`}
      >
        {parseText(block.text.replace(/-/, '')).trim()}
      </span>
    </TranscriptionItem>
  )
}

const TranscriptionItem = styled(Typography)`
  display: flex;
  flex-direction: row;
  gap: 12px;
`
