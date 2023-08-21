import { Theme as LSDTheme } from '@acid-info/lsd-react'

declare module '@emotion/react' {
  export interface Theme extends LSDTheme {}
}
