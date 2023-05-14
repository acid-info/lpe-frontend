import { TextBlockEnhanced, UnbodyTextBlock } from '@/lib/unbody/unbody.types'
import { HeadingElementsRef } from '@/utils/ui.utils'
import {
  extractClassFromFirstTag,
  extractIdFromFirstTag,
  extractInnerHtml,
} from '@/utils/html.utils'
import styled from '@emotion/styled'
import { Typography, TypographyProps } from '@acid-info/lsd-react'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  block: TextBlockEnhanced | UnbodyTextBlock
  headingElementsRef: HeadingElementsRef
  typographyProps?: TypographyProps
}>
export const ArticleHeading = ({
  block,
  headingElementsRef,
  typographyProps,
  children,
}: Props) => {
  const id =
    extractIdFromFirstTag(block.html) || `${block.tagName}-${block.order}`
  const refProp = {
    ref: (ref: any) => {
      headingElementsRef.current[id] = ref
    },
  }
  return (
    <>
      <span className="anchor" id={id} {...refProp} />
      <Headline
        variant={block.tagName as any}
        component={block.tagName as any}
        genericFontFamily="sans-serif"
        className={extractClassFromFirstTag(block.html) || ''}
        dangerouslySetInnerHTML={{ __html: `${extractInnerHtml(block.html)}` }}
        {...(typographyProps || {})}
      />
    </>
  )
}

const Headline = styled(Typography)`
  white-space: pre-wrap;
  margin-top: 24px;
`
