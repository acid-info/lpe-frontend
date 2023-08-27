import { Typography } from '@acid-info/lsd-react'
import React, { PropsWithChildren } from 'react'

export const PostCardSubTitle = ({ children }: PropsWithChildren) => (
  <Typography
    className="post-card__subtitle"
    variant={'body1'}
    genericFontFamily="sans-serif"
  >
    {children}
  </Typography>
)
