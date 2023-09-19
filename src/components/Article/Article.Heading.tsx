import { extractClassFromFirstTag, extractInnerHtml } from '@/utils/html.utils'
import { Typography, TypographyProps } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import { LPE } from '../../types/lpe.types'
import { lsdUtils } from '../../utils/lsd.utils'

type Props = PropsWithChildren<{
  block: LPE.Article.TextBlock
  typographyProps?: TypographyProps
}>
export const ArticleHeading = ({ block, typographyProps, ...props }: Props) => {
  return (
    <Headline
      variant={block.tagName as any}
      component={block.tagName as any}
      genericFontFamily="serif"
      className={extractClassFromFirstTag(block.html) || ''}
      dangerouslySetInnerHTML={{ __html: `${extractInnerHtml(block.html)}` }}
      {...(typographyProps || {})}
      {...props}
    />
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
