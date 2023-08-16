import {
  extractClassFromFirstTag,
  extractIdFromFirstTag,
  extractInnerHtml,
} from '@/utils/html.utils'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import ReactPlayer from 'react-player'
import { LPE } from '../../types/lpe.types'
import { convertSecToMinAndSec } from '@/utils/string.utils'

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
    <TranscriptionItem>
      <TranscriptionData>
        {block?.start && (
          <Typography variant="body2" component={'p'}>
            {convertSecToMinAndSec(Number(block.start))}
          </Typography>
        )}
        <Typography variant="body2" component={'p'}>
          {block.speaker}
        </Typography>
      </TranscriptionData>
      <Transcript
        variant="body2"
        component={'p'}
        genericFontFamily="sans-serif"
        className={extractClassFromFirstTag(block.html) || ''}
        id={extractIdFromFirstTag(block.html) || `p-${block.start}`}
        dangerouslySetInnerHTML={{ __html: extractInnerHtml(block.html) }}
      />
    </TranscriptionItem>
  )
}

const TranscriptionItem = styled.div`
  margin-bottom: calc(var(--lsd-body2-lineHeight) * 2);
`

const Transcript = styled(Typography)`
  &.subtitle,
  &#p-2 {
    font-size: var(--lsd-h6-fontSize);
    line-height: var(--lsd-h6-lineHeight);
  }
`

const TranscriptionData = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: var(--lsd-body2-lineHeight);
`
