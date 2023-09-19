import {
  extractClassFromFirstTag,
  extractIdFromFirstTag,
  extractInnerHtml,
} from '@/utils/html.utils'
import { Typography, TypographyProps } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { PropsWithChildren, useMemo } from 'react'
import { LPE } from '../../types/lpe.types'
import { lsdUtils } from '../../utils/lsd.utils'
import { HeadingElementsRef } from '../../utils/ui.utils'

type Props = PropsWithChildren<{
  block: LPE.Article.TextBlock
  typographyProps?: TypographyProps
  headingElementsRef?: HeadingElementsRef
}>
export const ArticleHeading = ({
  block,
  typographyProps,
  headingElementsRef,
  ...props
}: Props) => {
  const id = useMemo(
    () =>
      extractIdFromFirstTag(block.html) || `${block.tagName}-${block.order}`,
    [block],
  )

  const anchorElement = useMemo(() => {
    if (headingElementsRef)
      return (
        <span
          id={id}
          className="anchor"
          ref={(el) => {
            if (el) {
              headingElementsRef.current[id] = el as HTMLHeadingElement
            }
          }}
        ></span>
      )

    return null
  }, [id, headingElementsRef])

  return (
    <>
      {anchorElement}
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

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    &.title {
      font-size: var(--lsd-h4-fontSize);
      line-height: var(--lsd-h4-lineHeight);
    }

    font-size: var(--lsd-h4-fontSize);
    line-height: var(--lsd-h4-lineHeight);
  }
`
