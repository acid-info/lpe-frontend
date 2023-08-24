import styled from '@emotion/styled'
import React from 'react'

interface Props {
  children: React.ReactNode
  marginTop?: number
}

export default function PodcastSection({ children, marginTop = 140 }: Props) {
  return <Section marginTop={marginTop}>{children}</Section>
}

const Section = styled.div<{ marginTop: number }>`
  margin-top: ${(props) => props.marginTop}px;
  border-top: 1px solid rgb(var(--lsd-border-primary));

  @media (max-width: 768px) {
    margin-top: 80px;
    margin-bottom: 80px;
  }
`
