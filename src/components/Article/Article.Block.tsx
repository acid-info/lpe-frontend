import {
  TextBlockEnhanced,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'
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

const Paragraph = styled(Typography)``
