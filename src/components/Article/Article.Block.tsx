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

export const RenderArticleBlock = ({
  block,
}: {
  block: UnbodyImageBlock | UnbodyTextBlock
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
        case 'h6':
          return (
            <Headline
              variant={block.tagName as any}
              component={block.tagName as any}
              genericFontFamily="sans-serif"
              className={extractClassFromFirstTag(block.html) || ''}
              id={extractIdFromFirstTag(block.html) || ''}
              dangerouslySetInnerHTML={{ __html: extractInnerHtml(block.html) }}
            />
          )
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

const Headline = styled(Typography)`
  white-space: pre-wrap;
  margin-top: 24px;
`

const Paragraph = styled(Typography)`
  white-space: pre-wrap;
`
