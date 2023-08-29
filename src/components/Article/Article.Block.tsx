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
      return <ArticleImageBlockWrapper image={block} order={block.order} />
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
              <IframeContainer isSimplecast={false}>
                <ReactPlayer url={block.embed.src} />
              </IframeContainer>
            ) : (
              <IframeContainer
                isSimplecast={true}
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

const IframeContainer = styled.div<{ isSimplecast?: boolean }>`
  position: relative;
  padding-bottom: ${({ isSimplecast }) => (isSimplecast ? '30%' : '60%')};
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

  & > div {
    width: 100% !important;
    height: unset !important;
    aspect-ratio: 16 / 9;
  }
`
