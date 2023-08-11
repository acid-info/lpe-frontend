import { ArticleHeading } from '@/components/Article/Article.Heading'
import {
  extractClassFromFirstTag,
  extractIdFromFirstTag,
  extractInnerHtml,
} from '@/utils/html.utils'
import { convertToIframe } from '@/utils/string.utils'
import { HeadingElementsRef } from '@/utils/ui.utils'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import ReactPlayer from 'react-player'
import { LPE } from '../../types/lpe.types'
import { PostImageRatio } from '../Post/Post'
import { ArticleImageBlockWrapper } from './Article.ImageBlockWrapper'

export const RenderArticleBlock = ({
  block,
  headingElementsRef,
}: {
  block: LPE.Article.ContentBlock
  activeId: string | null
  headingElementsRef: HeadingElementsRef
  hide?: boolean
}) => {
  switch (block.type) {
    case 'image':
      return (
        <ArticleImageBlockWrapper
          ratio={PostImageRatio.LANDSCAPE}
          image={block}
        />
      )
    case 'text':
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
            /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/

          const isYoutube = isYoutubeRegex.test(block.text)
          const youtubeLink = block.text.match(isYoutubeRegex) ?? []

          const isSimplecastRegex =
            /^https?:\/\/([a-zA-Z0-9-]+\.)*simplecast\.com\/[^?\s]+(\?[\s\S]*)?$/

          const isSimplecast = isSimplecastRegex.test(block.text)
          const simplecastLink = block.text.match(isSimplecastRegex) ?? []

          // const episodeId = extractUUIDFromEpisode(simplecastLink[0] ?? '')

          // let audioSrc = ''

          // if (isSimplecast) {
          //   fetch(
          //     `https://api.simplecast.com/episodes/audio/bc313c16-82e9-439a-8e0c-af59833d22d7`,
          //   )
          //     .then((response) => response.json())
          //     .then((data) => console.log(data))
          // }

          return isIframe ? (
            <IframeContainer dangerouslySetInnerHTML={{ __html: block.text }} />
          ) : isYoutube ? (
            <ReactPlayer url={youtubeLink[0]} />
          ) : isSimplecast ? (
            <IframeContainer
              dangerouslySetInnerHTML={{
                __html: convertToIframe(simplecastLink[0] ?? ''),
              }}
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
