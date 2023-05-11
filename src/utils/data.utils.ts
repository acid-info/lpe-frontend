import {
  GoogleDocEnhanced,
  UnbodyGoogleDoc,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'
import { isAuthorsParagraph } from './html.utils'
import { similarity } from './string.utils'

function hasClassName(inputString: string, className: string) {
  const regex = new RegExp(`class\\s*=\\s*"[^"]*\\b${className}\\b[^"]*"`)
  return regex.test(inputString)
}

export const getBodyBlocks = ({
  blocks,
  summary,
  tags = [],
  mentions = [],
}: GoogleDocEnhanced) => {
  return (blocks || []).filter((b) => {
    const classNames = b.classNames || []

    const isTitle = classNames.includes('title')
    const isSubtitle = classNames.includes('subtitle')
    const isCoverImage =
      b.order === 5 &&
      b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.ImageBlock
    const isAuthor =
      b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock &&
      similarity(b.text, mentions.map((m) => m.name).join('')) > 0.8
    const isSummary =
      b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock &&
      summary === b.text
    const isTag =
      b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock &&
      similarity(b.text, tags.map((t) => `#${t}`).join(' ')) > 0.8

    //TODO this is a hack to remove the footnotes from the body
    // we should find a better way to do this
    const isFootenots =
      b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock &&
      b.html.startsWith(`<div><p class="c15"><a href="#ftnt_`)

    return (
      !isTitle &&
      !isSubtitle &&
      !isCoverImage &&
      !isAuthor &&
      !isSummary &&
      !isTag &&
      !isFootenots
    )
  })
}

export const getArticleCover = (
  blocks: (UnbodyImageBlock | UnbodyTextBlock)[],
): UnbodyImageBlock | null => {
  return (
    ((blocks || []).find(
      (b) =>
        b.order === 5 &&
        b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.ImageBlock,
    ) as UnbodyImageBlock) || null
  )
}
