import {
  Breakpoints,
  Theme,
  TypographyVariants,
  THEME_BREAKPOINTS,
} from '@acid-info/lsd-react'
import { css, SerializedStyles } from '@emotion/react'

export class LsdUtils {
  breakpoints = (exclude: Breakpoints[] = []) =>
    THEME_BREAKPOINTS.filter((b) => !exclude.find((b2) => b2 === b))

  typography = (variant: TypographyVariants | 'subtitle3', important = false) =>
    variant === 'subtitle3'
      ? `
    font-size: 12px !important;
    font-weight: 400 !important;
    line-height: 16px !important;
  `
      : `
    font-size: var(--lsd-${variant}-fontSize)${important ? '!important' : ''};
    font-weight: var(--lsd-${variant}-fontWeight)${
          important ? '!important' : ''
        };
    line-height: var(--lsd-${variant}-lineHeight)${
          important ? '!important' : ''
        };
  `

  breakpoint = (
    theme: Theme,
    breakpoint: Breakpoints,
    func: 'exact' | 'up' | 'down' = 'up',
  ) => {
    const width = theme.breakpoints[breakpoint].width
    const idx = THEME_BREAKPOINTS.findIndex((b) => b === breakpoint)
    const next = theme.breakpoints[THEME_BREAKPOINTS[idx + 1]]
    const min = width
    const max = next?.width ? next.width - 1 : Number.MAX_SAFE_INTEGER

    let media = `@media `

    if (func === 'up') {
      media += `(min-width: ${min}px)`
    } else if (func === 'down') media += `(max-width: ${max}px)`
    else media += `(min-width: ${min}px) and (max-width: ${max}px)`

    return `${media}`
  }

  responsive = (
    theme: Theme,
    breakpoint: Breakpoints,
    func: 'exact' | 'up' | 'down' = 'up',
  ) => {
    const media = lsdUtils.breakpoint(theme, breakpoint, func)
    return (styles: SerializedStyles) => css`
      ${media} {
        ${styles}
      }
    `
  }
}

export const lsdUtils = new LsdUtils()
