import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

type Props = {
  summary: string
  className?: string
  showLabel?: boolean
}
const ArticleSummary = ({ summary, className, showLabel }: Props) => (
  <ArticleSummaryContainer className={className}>
    {/*{showLabel && <Typography variant="body3">summary</Typography>}*/}
    <SummaryParagraph variant="h6" component={'p'}>
      {summary}
    </SummaryParagraph>
    <hr />
  </ArticleSummaryContainer>
)

const ArticleSummaryContainer = styled('div')`
  margin-block: 16px;
  display: block;
  @media (max-width: 770px) {
    display: none;
  }

  > span {
    margin-bottom: 16px;
    display: block;
  }
`

const SummaryParagraph = styled(Typography)`
  margin-bottom: 32px;
  display: block;
`

export default ArticleSummary
