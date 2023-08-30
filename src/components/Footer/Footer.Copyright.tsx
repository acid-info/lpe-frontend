import { FooterSection } from '@/components/Footer/Footer.Section'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

export const FooterCopyright = () => (
  <OrgInfo>
    <Typography component="div" genericFontFamily="sans-serif" variant="body2">
      Logos Press Engine ©{new Date().getFullYear()}
    </Typography>
    <Typography component="div" genericFontFamily="sans-serif" variant="body2">
      All rights reserved.
    </Typography>
  </OrgInfo>
)

const OrgInfo = styled(FooterSection)`
  @media (max-width: 768px) {
    margin-bottom: 72px;
  }
`
