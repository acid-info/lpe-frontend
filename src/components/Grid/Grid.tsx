import { Breakpoints } from '@acid-info/lsd-react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { lsdUtils } from '../../utils/lsd.utils'

export const Grid = styled.div<{
  cols?: number

  breakpoints?: {
    xs?: {
      cols?: number
    }
    sm?: {
      cols?: number
    }
    md?: {
      cols?: number
    }
    lg?: {
      cols?: number
    }
    xl?: {
      cols?: number
    }
  }
}>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols || 16}, 1fr);
  gap: 16px;

  ${(props) =>
    Object.entries(props.breakpoints || {}).map(([key, bp]) =>
      lsdUtils.responsive(
        props.theme,
        key as Breakpoints,
        'exact',
      )(css`
        ${bp.cols && `grid-template-columns: repeat(${bp.cols}, 1fr)`}
      `),
    )}
`

export const GridItem = styled.div`
  grid-column: span 4;

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

  @media (max-width: 768px) {
    grid-column: span 16 !important;
  }
`
