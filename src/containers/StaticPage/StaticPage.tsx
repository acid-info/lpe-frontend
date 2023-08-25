import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React from 'react'
import { LPE } from '../../types/lpe.types'

export type StaticPageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  data: {
    page: LPE.StaticPage.Document
  }
}

export const StaticPage: React.FC<StaticPageProps> = ({
  data,
  data: { page },
  ...props
}) => {
  return (
    <Root {...props}>
      <Typography variant="h1">{page.title}</Typography>
    </Root>
  )
}

const Root = styled('div')``
