import {
  UnbodyGoogleDoc,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

export const getContentBlocks = (
  blocks: (UnbodyImageBlock | UnbodyTextBlock)[],
) => {
  return blocks.filter((b) => {
    return (
      (b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.ImageBlock &&
        b.order !== 4) ||
      (b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock &&
        b.html.indexOf(`class="subtitle"`) === -1 &&
        b.html.indexOf(`class="title"`) === -1)
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
