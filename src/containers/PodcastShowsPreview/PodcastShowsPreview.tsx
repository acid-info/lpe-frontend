import { Typography } from '@acid-info/lsd-react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import Image from 'next/image'
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
        <Typography component="h2" variant="h2">
          Podcasts
        </Typography>
      </div>
      <div className={clsx('podcasts__shows')}>
        {shows.slice(0, 2).map((show) => (
          <div key={show.id} className={clsx('podcasts__show')}>
            <div className="podcasts__show-card">
              <div className="podcasts__show-info">
                <Image
                  width={32}
                  height={32}
                  alt={show.title}
                  src={show.logo.url}
                  className="podcasts__show-logo"
                />
                <Typography
                  component="h3"
                  variant="subtitle2"
                  className="podcasts__show-title"
                >
                  {show.title}
                </Typography>
                <ChevronRightIcon color="primary" />
                <Typography
                  component="a"
                  variant="body1"
                  className="podcasts__show-link"
                  href={getPostLink('podcast', { showSlug: show.slug })}
                >
                  See all
                </Typography>
              </div>
              {show.description && (
                <Typography
                  variant="subtitle3"
                  className="podcasts__show-description"
                  dangerouslySetInnerHTML={{ __html: show.description }}
                />
              )}
              <Typography variant="subtitle3" className="podcasts__show-hosts">
                {show.hosts.length > 0 && (
                  <span>
                    Hosted by:{' '}
                    {show.hosts.map((host, index) => (
                      <span key={index}>{host.name}</span>
                    ))}
                  </span>
                )}
              </Typography>
            </div>

            <div className="podcasts__show-episodes">
              <PostsGrid
                posts={(show.episodes || []).slice(0, 1)}
                shows={shows}
                displayPodcastShow
                pattern={[
                  {
                    cols: 1,
                    size: 'medium',
                  },
                ]}
                style={{ marginBottom: 16 }}
              />
              <PostsGrid
                posts={(show.episodes || [])
                  .slice(1, 3)
                  .map((ep) => ({ ...ep, show }))}
                displayPodcastShow
                pattern={[
                  {
                    cols: 2,
                    size: 'small',
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
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding-bottom: var(--lsd-spacing-24);
      border-bottom: 1px solid rgb(var(--lsd-border-primary));
    }

    &__shows {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      margin-top: var(--lsd-spacing-24);
      gap: 0 var(--lsd-spacing-16);
    }

    &__show-card {
      margin: var(--lsd-spacing-24) 0;
      align-items: flex-start;

      display: flex;
      flex-direction: column;
      gap: var(--lsd-spacing-24) 0;

      ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'up')} {
        min-height: 220px;
        box-sizing: border-box;
      }
    }

    &__show-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0 8px;
    }

    &__show-logo {
      width: 32px;
      height: 32px;
      border-radius: 100%;
    }

    &__show-title {
      margin-left: 8px;
    }

    &__show-description {
      display: block;
    }

    &__show-link {
      display: block;
    }

    &__show-hosts {
      display: block;

      span:not(:last-child) {
        &:after {
          content: '•';
          margin: 0 8px;
          text-decoration: none;
          display: inline-block;
        }
      }

      ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'up')} {
        margin-top: auto;
      }
    }

    &__show-episodes {
      padding-top: var(--lsd-spacing-24);
    }
  }

  ${(props) =>
    lsdUtils.responsive(
      props.theme,
      'xs',
      'exact',
    )(css`
      .podcasts__header {
        padding-bottom: var(--lsd-spacing-16);
        border-bottom: none;

        h2 {
          ${lsdUtils.typography('h3')}
        }
      }

      .podcasts__shows {
        display: flex;
        flex-direction: column;
        margin-top: 0;
        gap: var(--lsd-spacing-32);
      }

      .podcasts__show {
        border-top: 1px solid rgb(var(--lsd-border-primary));
      }

      .podcasts__show-card {
      }

      .podcasts__show-hosts {
      }

      .podcasts__show-episodes {
        padding-top: var(--lsd-spacing-16);
      }
    `)}

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    .post-card__title-text {
      font-size: var(--lsd-h4-fontSize) !important;
      line-height: var(--lsd-h4-lineHeight) !important;
    }
  }
`
