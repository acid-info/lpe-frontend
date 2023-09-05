import { THEME_BREAKPOINTS } from '@acid-info/lsd-react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { lsdUtils } from '../../utils/lsd.utils'

export type GridOptions = {
  cols?: number
}

export type GridProps = React.HTMLProps<HTMLDivElement> &
  GridOptions & {
    xs?: GridOptions
    sm?: GridOptions
    md?: GridOptions
    lg?: GridOptions
    xl?: GridOptions
  }

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols || 16}, 1fr);
  gap: 16px;

  ${(props) =>
    THEME_BREAKPOINTS.map((key) => {
      if (!props[key]) return null

      const bp = props[key] as GridItemOptions

      return lsdUtils.responsive(
        props.theme,
        key,
        'up',
      )(css`
        ${bp.cols &&
        css`
          grid-template-columns: repeat(${bp.cols}, 1fr);
        `}
      `)
    })}
`

export type GridItemOptions = {
  cols?: number
}

export type GridItemProps = React.HTMLProps<HTMLDivElement> &
  GridItemOptions & {
    xs?: GridItemOptions
    sm?: GridItemOptions
    md?: GridItemOptions
    lg?: GridItemOptions
    xl?: GridItemOptions
  }

export const GridItem = styled.div<GridItemProps>`
  grid-column: span ${(props) => props.cols || 4};

  &.w-1 {
    grid-column: span 1;
  }

  &.w-2 {
    grid-column: span 2;
  }

  &.w-3 {
    grid-column: span 3;
  }

  &.w-4 {
    grid-column: span 4;
  }

  &.w-7 {
    grid-column: span 7;
  }

  &.w-8 {
    grid-column: span 8;
  }

  &.w-16 {
    grid-column: span 16;
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    grid-column: span 16 !important;
  }

  ${(props) =>
    THEME_BREAKPOINTS.map((key) => {
      if (!props[key]) return null

      const bp = props[key] as GridItemOptions

      return lsdUtils.responsive(
        props.theme,
        key,
        'up',
      )(css`
        ${bp.cols === 0 ? `display: none;` : `display: initial;`}
        ${bp.cols && `grid-column: span ${bp.cols};`}
      `)
    })}
`
