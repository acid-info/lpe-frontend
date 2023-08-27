import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

interface Props {
  title: string
}
export const SearchResultsListHeader = (props: Props) => (
  <Container>
    <Typography variant={'subtitle2'}>{props.title}</Typography>
  </Container>
)

const Container = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(var(--lsd-text-primary), 1);
`
