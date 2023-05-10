import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  title: string
}>

export const Section = (props: any) => {
  return (
    <section>
      <Title>{props.title}</Title>
      {props.children}
    </section>
  )
}

const Title = styled(Typography)`
  padding: 0 16px;
`
