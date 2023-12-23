import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React from 'react'
import { lsdUtils } from '../../utils/lsd.utils'

export type SectionProps = Partial<
  React.ComponentProps<typeof SectionContainer>
> & {
  title?: React.ReactNode
  subtitle?: string | React.ReactNode
  bordered?: boolean
}

export const Section = ({
  title,
  subtitle,
  bordered = true,
  children,
  ...props
}: SectionProps) => {
  return (
    <SectionContainer bordered={bordered} {...props}>
      {(title || subtitle) && (
        <Container>
          <Typography component="h2" variant="subtitle2">
            {title}
          </Typography>
          {subtitle && (
            <>
              <Typography variant="body2">•</Typography>
              {typeof subtitle === 'string' ? (
                <Typography variant="body2">subtitle</Typography>
              ) : (
                subtitle
              )}
            </>
          )}
        </Container>
      )}
      {children}
    </SectionContainer>
  )
}

const SectionContainer = styled.section<{
  bordered?: boolean
}>`
  width: 100%;
  box-sizing: border-box;
  border-top: ${(props) =>
    props.bordered ? '1px solid rgb(var(--lsd-border-primary))' : 'none'};

  ${(props) => lsdUtils.breakpoint(props.theme, 'md', 'down')} {
    margin-top: var(--lsd-spacing-16);
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;

  padding: var(--lsd-spacing-24) 0;

  ${(props) => lsdUtils.breakpoint(props.theme, 'md', 'down')} {
    padding: var(--lsd-spacing-16) 0;

    & > h2 {
      ${lsdUtils.typography('subtitle3')}
    }
  }
`
