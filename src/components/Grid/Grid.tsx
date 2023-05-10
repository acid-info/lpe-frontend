import styled from '@emotion/styled'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  padding: 16px;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
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

  @media (max-width: 768px) {
    grid-column: span 16 !important;
  }
`
