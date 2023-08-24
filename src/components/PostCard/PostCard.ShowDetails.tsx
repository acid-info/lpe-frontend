import { LPE } from '@/types/lpe.types'
import { Theme, Typography } from '@acid-info/lsd-react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

type Size = 'small' | 'medium' | 'large'

export type PostCardShowDetailsProps = React.HTMLAttributes<HTMLAnchorElement> &
  Partial<CustomLinkProps> & {
    title: string
    slug: string
    episodeNumber: number
    logo?: LPE.Image.Document
    podcast: LPE.Podcast.Show
  }

// TODO
export const PostCardShowDetails = ({
  slug,
  episodeNumber,
  podcast,
  size = 'medium',
  ...props
}: PostCardShowDetailsProps) => {
  return (
    <CustomLink
      {...props}
      href={`/podcasts/${slug}`}
      className={clsx('show-details', `show-details--${size}`, props.className)}
    >
      <div className="show-details__container">
        {podcast && (
          <>
            <Image
              src={podcast?.logo?.url}
              width={38}
              height={38}
              alt={podcast.logo.alt}
              className="show-details__logo"
            />
            <div className="show-details__info">
              <Typography variant="subtitle2" className="show-details__title">
                {podcast.title}
              </Typography>
              <Typography variant="body3" className="show-details__episodes">
                {episodeNumber} EP
              </Typography>
            </div>
          </>
        )}
      </div>
    </CustomLink>
  )
}

PostCardShowDetails.styles = {
  small: (theme: Theme) => css`
    .show-details__title {
      font-size: 12px !important;
      font-weight: 400 !important;
      line-height: 16px !important;
    }

    .show-details__episodes {
      display: none;
    }

    .show-details__logo {
      width: 24px;
      height: 24px;
    }
  `,

  medium: (theme: Theme) => css`
    .show-details__episodes {
      display: none;
    }

    .show-details__logo {
      width: 28px;
      height: 28px;
    }
  `,

  large: (theme: Theme) => css`
    .show-details__episodes {
      display: block !important;
    }

    .show-details__logo {
      width: 38px;
      height: 38px;
    }
  `,
}

type CustomLinkProps = {
  size?: Size
  xsSize?: Size
  smSize?: Size
  mdSize?: Size
  lgSize?: Size
}

const CustomLink = styled(Link)<CustomLinkProps>`
  text-decoration: none;

  .show-details {
    &__container {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    &__logo {
      border-radius: 100%;
    }
  }

  &.show-details--small {
    ${(props) => PostCardShowDetails.styles.small(props.theme)}
  }

  &.show-details--medium {
    ${(props) => PostCardShowDetails.styles.medium(props.theme)}
  }

  &.show-details--large {
    ${(props) => PostCardShowDetails.styles.large(props.theme)}
  }

  &.show-details {
    @media (max-width: ${({ theme }) => theme.breakpoints.sm.width - 1}px) {
      ${(props) =>
        props.xsSize && PostCardShowDetails.styles[props.xsSize](props.theme)}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm.width}px) {
      ${(props) =>
        props.smSize && PostCardShowDetails.styles[props.smSize](props.theme)}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md.width}px) {
      ${(props) =>
        props.mdSize && PostCardShowDetails.styles[props.mdSize](props.theme)}
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg.width}px) {
      ${(props) =>
        props.lgSize && PostCardShowDetails.styles[props.lgSize](props.theme)}
    }
  }
`
