import {
  extractClassFromFirstTag,
  extractIdFromFirstTag,
  extractInnerHtml,
} from '@/utils/html.utils'
import { HeadingElementsRef } from '@/utils/ui.utils'
import { Typography, TypographyProps } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import { LPE } from '../../types/lpe.types'

type Props = PropsWithChildren<{
  block: LPE.Article.TextBlock
  headingElementsRef?: HeadingElementsRef
  typographyProps?: TypographyProps
}>
export const ArticleHeading = ({
  block,
  headingElementsRef,
  typographyProps,
  ...props
}: Props) => {
  const id =
    extractIdFromFirstTag(block.html) || `${block.tagName}-${block.order}`
  const refProp = {
    ref: (ref: any) => {
      if (headingElementsRef) {
        headingElementsRef.current[id] = ref
      }
    },
  }

  return (
    <>
      <span className="anchor" id={id} {...refProp} />
      <Headline
        variant={block.tagName as any}
        component={block.tagName as any}
        genericFontFamily="serif"
        className={extractClassFromFirstTag(block.html) || ''}
        dangerouslySetInnerHTML={{ __html: `${extractInnerHtml(block.html)}` }}
        {...(typographyProps || {})}
        {...props}
      />
    </>
  )
}

const Headline = styled(Typography)`
  white-space: pre-wrap;
  margin-top: 16px;

  @media (max-width: 768px) {
    &.title {
      font-size: var(--lsd-h4-fontSize);
      line-height: var(--lsd-h4-lineHeight);
    }

    font-size: var(--lsd-h4-fontSize);
    line-height: var(--lsd-h4-lineHeight);
  }
`
