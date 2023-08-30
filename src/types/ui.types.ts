import { ReactNode } from 'react'
export const enum PostListLayout {
  XXXX = 'xxxx',
  XXXX_XX = 'xxxx_xx',
}

export type LPEFooterItem = {
  label: string | null
  href: string
  icon?: ReactNode
  key?: string
}
export type LPEFooterGroup = {
  title: string | null
  key?: string
  links: LPEFooterItem[]
}
