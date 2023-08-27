import styled from '@emotion/styled'
import { Typography } from '@acid-info/lsd-react'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

interface Props {
  href: string
}
export const PostCardTitle = ({ href, children }: PropsWithChildren<Props>) => (
  <Link href={href} className="post-card__title">
    <Typography
      variant={'h3'}
      component="h3"
      genericFontFamily="serif"
      className="post-card__title-text"
    >
      {children}
    </Typography>
  </Link>
)
