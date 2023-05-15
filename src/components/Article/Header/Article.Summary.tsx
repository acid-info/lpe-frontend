import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React from 'react'
import { Collapse } from '@/components/Collapse'
import useIsDarkState from '@/states/isDarkState/isDarkState'

export const MobileSummary = ({ summary }: { summary: string }) => {
  const isDark = useIsDarkState().get()
  return (
    <SummaryContainerMobile
      label={'Summary'}
      initOpen={false}
      style={{ background: isDark ? 'black' : 'white' }}
    >
      <SummaryParagraph variant="h6" component={'p'}>
        {summary}
      </SummaryParagraph>
    </SummaryContainerMobile>
  )
}

const ArticleSummary = ({ summary }: { summary: string }) => (
  <ArticleSummaryContainer>
    <Typography variant="body3">summary</Typography>
    <SummaryParagraph variant="h6" component={'p'}>
      {summary}
    </SummaryParagraph>
    <hr />
  </ArticleSummaryContainer>
)

const ArticleSummaryContainer = styled('div')`
  margin-block: 16px;

  > span {
    margin-bottom: 16px;
    display: block;
  }
`

const SummaryParagraph = styled(Typography)`
  margin-bottom: 32px;
  display: block;
`

const SummaryContainerMobile = styled(Collapse)`
  @media (max-width: 770px) {
    p {
      padding: 12px 14px;
      margin-bottom: 0;
      font-size: var(--lsd-font-size-body2);
      line-height: var(--lsd-line-height-body2);
    }
  }
`

export default ArticleSummary
