import {
  UnbodyGoogleDoc,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

function hasClassName(inputString: string, className: string) {
  const regex = new RegExp(`class\\s*=\\s*"[^"]*\\b${className}\\b[^"]*"`)
  return regex.test(inputString)
}

export const getContentBlocks = (
  blocks: (UnbodyImageBlock | UnbodyTextBlock)[],
) => {
  return blocks.filter((b) => {
    return (
      (b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.ImageBlock &&
        b.order !== 4) ||
      (b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock &&
        !hasClassName(b.html, 'subtitle') &&
        !hasClassName(b.html, 'title'))
    )
  })
}

export const getArticleCover = (
  blocks: (UnbodyImageBlock | UnbodyTextBlock)[],
): UnbodyImageBlock | null => {
  return (
    (blocks.find(
      (b) =>
        b.order === 4 &&
        b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.ImageBlock,
    ) as UnbodyImageBlock) || null
  )
}
