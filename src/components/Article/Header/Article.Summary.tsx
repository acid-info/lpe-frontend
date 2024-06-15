import { removeDynamicSection } from '@/utils/html.utils'
import { lsdUtils } from '@/utils/lsd.utils'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

type Props = {
  summary: string
  className?: string
  showLabel?: boolean
}
const ArticleSummary = ({ summary, className, showLabel }: Props) => {
  return (
    <ArticleSummaryContainer className={className}>
      {showLabel && <Typography variant="body3">summary</Typography>}
      <SummaryParagraph
        variant="h4"
        component={'div'}
        dangerouslySetInnerHTML={{
          __html: removeDynamicSection(summary),
        }}
      ></SummaryParagraph>
    </ArticleSummaryContainer>
  )
}

const ArticleSummaryContainer = styled('div')`
  display: block;
  border-bottom: 1px solid rgb(var(--lsd-text-primary));
  border-top: 1px solid rgb(var(--lsd-text-primary));

  > span {
    //margin-bottom: 16px;
    display: block;
  }
`

const SummaryParagraph = styled(Typography)`
  display: block;
  padding: 24px 0;
  white-space: pre-wrap;

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'down')} {
    ${lsdUtils.typography('subtitle1')}
    padding: 16px 0;
  }
`

export default ArticleSummary
