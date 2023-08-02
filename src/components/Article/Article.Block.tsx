import { UnbodyImageBlock, UnbodyTextBlock } from '@/lib/unbody/unbody.types'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'
import { ArticleImageBlockWrapper } from './Article.ImageBlockWrapper'
import { PostImageRatio } from '../Post/Post'
import styled from '@emotion/styled'
import { Typography } from '@acid-info/lsd-react'
import {
  extractClassFromFirstTag,
  extractIdFromFirstTag,
  extractInnerHtml,
} from '@/utils/html.utils'
import { HeadingElementsRef } from '@/utils/ui.utils'
import UnbodyDocumentTypeNames = UnbodyGraphQl.UnbodyDocumentTypeNames
import { ArticleHeading } from '@/components/Article/Article.Heading'
import ReactPlayer from 'react-player'
import { GlobalAudioPlayer } from '../GlobalAudioPlayer'

export const RenderArticleBlock = ({
  block,
  headingElementsRef,
}: {
  block: UnbodyImageBlock | UnbodyTextBlock
  activeId: string | null
  headingElementsRef: HeadingElementsRef
  hide?: boolean
}) => {
  switch (block.__typename) {
    case UnbodyGraphQl.UnbodyDocumentTypeNames.ImageBlock:
      return (
        <ArticleImageBlockWrapper
          ratio={PostImageRatio.LANDSCAPE}
          image={block}
        />
      )
    case UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock:
      switch (block.tagName) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6': {
          return (
            <ArticleHeading
              block={block}
              headingElementsRef={headingElementsRef}
            />
          )
        }
        case 'p': {
          const isIframeRegex = /<iframe[^>]*>(?:<\/iframe>|[^]*?<\/iframe>)/
          const isIframe = isIframeRegex.test(block.text)

          const isYoutubeRegex =
            /https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/
          const isYoutube = isYoutubeRegex.test(block.text)

          const isSimplecastRegex = /https?:\/\/.*cdn\.simplecast\.com\/.*/
          const isSimplecast = isSimplecastRegex.test(block.text)

          return isIframe ? (
            <IframeContainer dangerouslySetInnerHTML={{ __html: block.text }} />
          ) : isYoutube ? (
            <ReactPlayer url="https://youtu.be/Je7yErjEVt4" />
          ) : isSimplecast ? (
            <ReactPlayer
              height={100}
              controls
              url="https://pdcn.co/e/cdn.simplecast.com/audio/b623b331-ffef-40c4-918d-b35a07ee8729/episodes/72d2eac9-2d2a-4a8c-943d-c2ffa1e071c0/audio/98a3ad48-86ec-45e3-be20-bdb0beea23c1/default_tc.mp3?aid=embed"
            />
          ) : (
            <Paragraph
              variant="body1"
              component={block.tagName as any}
              genericFontFamily="sans-serif"
              className={extractClassFromFirstTag(block.html) || ''}
              id={extractIdFromFirstTag(block.html) || `p-${block.order}`}
              dangerouslySetInnerHTML={{ __html: extractInnerHtml(block.html) }}
            />
          )
        }
        default:
          return (
            <Paragraph
              variant="body1"
              component={block.tagName as any}
              genericFontFamily="sans-serif"
              className={extractClassFromFirstTag(block.html) || ''}
              id={extractIdFromFirstTag(block.html) || `p-${block.order}`}
              dangerouslySetInnerHTML={{ __html: extractInnerHtml(block.html) }}
            />
          )
      }
    default:
      return null
  }
}

const Paragraph = styled(Typography)`
  &.subtitle,
  &#p-2 {
    font-size: var(--lsd-h6-fontSize);
    line-height: var(--lsd-h6-lineHeight);
  }
`

const IframeContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;

  & > iframe,
  & > object,
  & > embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
