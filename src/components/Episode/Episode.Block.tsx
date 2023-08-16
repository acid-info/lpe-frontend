import {
  extractClassFromFirstTag,
  extractIdFromFirstTag,
  extractInnerHtml,
} from '@/utils/html.utils'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import ReactPlayer from 'react-player'
import { LPE } from '../../types/lpe.types'

export const RenderEpisodeBlock = ({
  block,
}: {
  block: LPE.Podcast.Document['transcription'][0]
  hide?: boolean
}) => {
  const isYoutubeRegex =
    /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/

  const isYoutube = isYoutubeRegex.test(block.html)
  const youtubeLink = block.html.match(isYoutubeRegex) ?? []

  return isYoutube ? (
    <ReactPlayer url={youtubeLink[0]} />
  ) : (
    <Paragraph
      variant="body1"
      component={'p'}
      genericFontFamily="sans-serif"
      className={extractClassFromFirstTag(block.html) || ''}
      id={extractIdFromFirstTag(block.html) || `p-${block.start}`}
      dangerouslySetInnerHTML={{ __html: extractInnerHtml(block.html) }}
    />
  )
}

const Paragraph = styled(Typography)`
  &.subtitle,
  &#p-2 {
    font-size: var(--lsd-h6-fontSize);
    line-height: var(--lsd-h6-lineHeight);
  }
`
