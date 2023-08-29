import { ArticleHeading } from '@/components/Article/Article.Heading'
import {
  extractClassFromFirstTag,
  extractIdFromFirstTag,
  extractInnerHtml,
} from '@/utils/html.utils'
import { HeadingElementsRef } from '@/utils/ui.utils'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import ReactPlayer from 'react-player'
import { LPE } from '../../types/lpe.types'
import { ArticleImageBlockWrapper } from './Article.ImageBlockWrapper'

export const RenderArticleBlock = ({
  block,
  headingElementsRef,
}: {
  block: LPE.Article.ContentBlock
  activeId: string | null
  headingElementsRef?: HeadingElementsRef
  hide?: boolean
}) => {
  switch (block.type) {
    case 'image':
      return <ArticleImageBlockWrapper image={block} />
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
          const isIframe = block.embed && block.labels.includes('embed')

          return block.embed && isIframe ? (
            block.labels.includes('youtube_embed') ? (
              <ReactPlayer url={block.embed.src} />
            ) : (
              <IframeContainer
                dangerouslySetInnerHTML={{
                  __html: block.embed.html,
                }}
              />
            )
          ) : (
            <Paragraph
              variant="body1"
              component={block.tagName as any}
              genericFontFamily="sans-serif"
              className={`${extractClassFromFirstTag(
                block.html,
              )} ${block.classNames.join(' ')}`}
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
              className={`${extractClassFromFirstTag(
                block.html,
              )} ${block.classNames.join(' ')}`}
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
`
