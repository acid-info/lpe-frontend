import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import React from 'react'
import { lsdUtils } from '../../utils/lsd.utils'

export type SectionProps = Partial<React.ComponentProps<typeof Root>> & {
  title?: React.ReactNode
  subtitle?: string | React.ReactNode
  bordered?: boolean
  size?: 'small' | 'large'
}

export const Section = ({
  title,
  subtitle,
  bordered = true,
  size = 'small',
  className,
  children,
  ...props
}: SectionProps) => {
  return (
    <Root
      className={clsx(
        className,
        'section',
        `section--${size}`,
        bordered && `section--bordered`,
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="section__header">
          <Typography
            component="h2"
            variant="subtitle2"
            className="section__title"
          >
            {title}
          </Typography>
          {subtitle && (
            <>
              <Typography variant="body2">•</Typography>
              {typeof subtitle === 'string' ? (
                <Typography variant="body2" className="section__subtitle">
                  subtitle
                </Typography>
              ) : (
                subtitle
              )}
            </>
          )}
        </div>
      )}
      <div className="section__content">{children}</div>
    </Root>
  )
}

const Root = styled.section`
  width: 100%;
  box-sizing: border-box;

  &.section--small {
    &.section--bordered {
      border-top: 1px solid rgb(var(--lsd-border-primary));
    }

    ${(props) => lsdUtils.breakpoint(props.theme, 'md', 'down')} {
      margin-top: var(--lsd-spacing-16);
    }

    .section__header {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;

      padding: var(--lsd-spacing-24) 0;

      ${(props) => lsdUtils.breakpoint(props.theme, 'md', 'down')} {
        padding: var(--lsd-spacing-16) 0;

        & > .section__title {
          ${lsdUtils.typography('subtitle3')}
        }
      }
    }
  }

  &.section--large {
    & > .section__header {
      padding-bottom: var(--lsd-spacing-24);

      & > .section__title {
        ${lsdUtils.typography('h2')}
      }
    }

    &.section--bordered {
      & > .section__header {
        border-bottom: 1px solid rgb(var(--lsd-border-primary));
      }
    }

    ${(props) => lsdUtils.breakpoint(props.theme, 'md', 'down')} {
      & > .section__header {
        padding-bottom: var(--lsd-spacing-16);

        & > .section__title {
          ${lsdUtils.typography('h3')}
        }
      }
    }
  }
`
