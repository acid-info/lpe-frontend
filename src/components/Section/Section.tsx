import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  title: string
  subtitle?: string | React.ReactNode
}>

export const Section = ({ title, subtitle, children, ...props }: Props) => {
  return (
    <SectionContainer {...props}>
      <Container>
        <Typography genericFontFamily="sans-serif" variant="body2">
          {title}
        </Typography>
        {subtitle && (
          <>
            <Typography variant="body2">•</Typography>
            {typeof subtitle === 'string' ? (
              <Typography genericFontFamily="sans-serif" variant="body2">
                subtitle
              </Typography>
            ) : (
              subtitle
            )}
          </>
        )}
      </Container>
      {children}
    </SectionContainer>
  )
}

const SectionContainer = styled.section`
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding-inline: 16px;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`
