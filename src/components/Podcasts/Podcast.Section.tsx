import styled from '@emotion/styled'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function PodcastSection({ children, ...props }: Props) {
  return <Section {...props}>{children}</Section>
}

const Section = styled.div`
  border-top: 1px solid rgb(var(--lsd-border-primary));
`
