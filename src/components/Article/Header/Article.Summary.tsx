import { Quote } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

const ArticleSummary = ({ summary }: { summary: string }) => (
  //TODO for ihor to work out the design for this
  <ArticleSummaryContainer>
    <Quote>{summary}</Quote>
  </ArticleSummaryContainer>
)

const ArticleSummaryContainer = styled('div')`
  padding-left: 40px;
  margin-bottom: 32px;
`

export default ArticleSummary
