import { Button, Typography } from '@acid-info/lsd-react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ChevronRightIcon } from '../../components/Icons/ChevronRightIcon'
import { PostsGrid } from '../../components/PostsGrid'
import { LPE } from '../../types/lpe.types'
import { lsdUtils } from '../../utils/lsd.utils'
import { getPostLink } from '../../utils/route.utils'

export type PodcastShowsPreviewProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  data: {
    shows: LPE.Podcast.Show[]
  }
}

export const PodcastShowsPreview: React.FC<PodcastShowsPreviewProps> = ({
  data,
  data: { shows = [] },
  ...props
}) => {
  return (
    <Root {...props} className={clsx('podcasts', props.className)}>
      <div className="podcasts__header">
        <Typography variant="subtitle1">Podcasts</Typography>
        <Link href="/podcasts">
          <Button variant="outlined" size="small">
            Go to all podcasts
          </Button>
        </Link>
      </div>
      <div
        className={clsx(
          'podcasts__shows',
          shows.length > 1 && 'podcasts__shows--bordered',
        )}
      >
        {shows.slice(0, 2).map((show) => (
          <div key={show.id} className={clsx('podcasts__show')}>
            <div className="podcasts__show-card">
              <Image
                width={56}
                height={56}
                alt={show.title}
                src={show.logo.url}
                className="podcasts__show-logo"
              />
              <Typography variant="h3" className="podcasts__show-title">
                {show.title}
              </Typography>
              {show.description && (
                <Typography
                  variant="subtitle2"
                  className="podcasts__show-description"
                  dangerouslySetInnerHTML={{ __html: show.description }}
                />
              )}

              <Link
                href={getPostLink('podcast', { showSlug: show.slug })}
                className="podcasts__show-link"
              >
                <Button
                  size="small"
                  variant="outlined"
                  icon={<ChevronRightIcon color="primary" />}
                >
                  Podcast page
                </Button>
              </Link>

              <Typography className="podcasts__show-hosts">
                {show.hosts.length > 0 && (
                  <span>
                    Hosted by:{' '}
                    {show.hosts.map((host, index) => (
                      <span key={index}>{host.name}</span>
                    ))}
                  </span>
                )}
                <span>{show.numberOfEpisodes} EP</span>
              </Typography>
            </div>

            <div className="podcasts__show-episodes">
              <PostsGrid
                posts={(show.episodes || [])
                  .slice(0, 4)
                  .map((ep) => ({ ...ep, show }))}
                displayPodcastShow={false}
                pattern={[
                  {
                    cols: 2,
                    size: 'xsmall',
                  },
                  {
                    cols: 2,
                    size: 'xsmall',
                    rowBorder: true,
                  },
                ]}
                breakpoints={[
                  {
                    breakpoint: 'xs',
                    pattern: [{ cols: 1, size: 'small', rowBorder: true }],
                  },
                  {
                    breakpoint: 'sm',
                    pattern: [
                      { cols: 2, size: 'small' },
                      { cols: 2, size: 'small', rowBorder: true },
                    ],
                  },
                  {
                    breakpoint: 'md',
                    pattern: [
                      { cols: 2, size: 'small' },
                      { cols: 2, size: 'small', rowBorder: true },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        ))}
      </div>
    </Root>
  )
}

const Root = styled('div')`
  & .podcasts {
    &__header {
      padding: 16px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgb(var(--lsd-border-primary));
      border-bottom: 1px solid rgb(var(--lsd-border-primary));
    }

    &__shows {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding-top: 24px;

      & > div:first-child {
        border-right: 1px solid rgb(var(--lsd-border-primary));
        padding-right: 16px;
      }

      &--bordered {
        & > div:last-child {
          padding-left: 16px;
        }
      }
    }

    &__show-card {
      margin-top: 24px;
      align-items: flex-start;
    }

    &__show-logo {
      width: 56px;
      height: 56px;
      border-radius: 100%;
    }

    &__show-title {
      margin-top: 16px;
    }

    &__show-description {
      display: block;
      margin-top: 8px;
    }

    &__show-link {
      display: block;
      margin-top: 24px;
      text-decoration: none;
    }

    &__show-hosts {
      display: block;
      margin-top: 200px;

      span:not(:last-child) {
        &:after {
          content: '•';
          margin: 0 8px;
          text-decoration: none;
          display: inline-block;
        }
      }
    }

    &__show-episodes {
      > div:not(:last-child) {
        border-bottom: 1px solid rgb(var(--lsd-border-primary));
      }
    }
  }

  ${(props) =>
    lsdUtils.responsive(
      props.theme,
      'xs',
      'exact',
    )(css`
      .podcasts__shows {
        padding-top: 0;
        grid-template-columns: repeat(1, 1fr);
      }

      .podcasts__show {
        border-right: none !important;
        padding: 0 !important;

        &:not(:first-child) {
          border-top: 1px solid rgb(var(--lsd-border-primary));
        }
      }

      .podcasts__show-card {
        margin-top: 0;
        padding: 24px 0px 16px 0px;
      }

      .podcasts__show-hosts {
        margin-top: 80px;
      }
    `)}
`
