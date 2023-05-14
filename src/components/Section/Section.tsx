import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  title: string
  subtitle?: string | React.ReactNode
}>

export const Section = ({ title, subtitle, children, ...props }: Props) => {
  return (
    <section style={{ width: '100%' }} {...props}>
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
    </section>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`
