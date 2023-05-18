import { breakpoints } from '@/configs/ui.configs'
import styled from '@emotion/styled'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: 16px;

  // TODO: The mobile design works when commenting this out
  /* @media (max-width: 768px) {
    grid-template-columns: 100%;
  } */
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

  &.w-8 {
    grid-column: span 8;
  }

  &.w-16 {
    grid-column: span 16;
  }

  @media (max-width: ${breakpoints.mobile}px) {
    grid-column: span 16 !important;
  }
`
