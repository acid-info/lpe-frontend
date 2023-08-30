import { Typography } from '@acid-info/lsd-react'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

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
