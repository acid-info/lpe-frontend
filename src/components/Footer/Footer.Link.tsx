import styled from '@emotion/styled'
import { Typography } from '@acid-info/lsd-react'

export const FooterLink = styled(Typography)`
  width: fit-content;
  &:not(:last-child) {
    &:after {
      content: '•';
      margin-left: 8px;
      text-decoration: none;
      display: inline-block;
    }
  }
`
