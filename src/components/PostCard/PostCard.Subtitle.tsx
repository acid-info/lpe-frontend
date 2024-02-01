import { Typography } from '@acid-info/lsd-react'
import { PropsWithChildren } from 'react'

export const PostCardSubTitle = ({ children }: PropsWithChildren) => (
  <Typography
    className="post-card__subtitle"
    variant={'body2'}
    genericFontFamily="sans-serif"
  >
    {children}
  </Typography>
)
