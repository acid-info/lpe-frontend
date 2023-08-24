/** @jsxImportSource @emotion/react */
import { Breakpoints, Theme, useTheme } from '@acid-info/lsd-react'
import { css, SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { LPE } from '../../types/lpe.types'
import { chunkArray } from '../../utils/array.utils'
import { lsdUtils } from '../../utils/lsd.utils'
import { lcm } from '../../utils/math.utils'
import { PostCard, PostCardProps } from '../PostCard'

export type PostsGridProps = Partial<React.ComponentProps<typeof Container>> & {
  shows?: LPE.Podcast.Show[]
  posts?: LPE.Post.Document[]
  displayPodcastShow?: boolean
  displayYear?: boolean
}

export const PostsGrid: React.FC<PostsGridProps> = ({
  posts = [],
  shows = [],
  pattern = [],
  breakpoints = [],
  bordered = false,
  horizontal = false,
  displayPodcastShow = true,
  displayYear = true,
  ...props
}) => {
  const theme = useTheme()

  const items = useMemo(() => {
    const cols = pattern.map((p) => p.cols)
    const chunked = chunkArray(posts, ...cols)

    return chunked
      .map((posts, i) =>
        posts.map((post) => ({
          post,
          size: pattern[i % pattern.length]?.size,
        })),
      )
      .flat()
  }, [pattern, posts])

  const postCardStyles = useMemo(
    () => ({
      xxsmall: PostCard.styles.xxsmall(theme),
      xsmall: PostCard.styles.xsmall(theme),
      small: PostCard.styles.small(theme),
      medium: PostCard.styles.medium(theme),
      large: PostCard.styles.large(theme),
    }),
    [theme],
  )

  return (
    <Container
      {...props}
      pattern={pattern}
      breakpoints={breakpoints}
      bordered={bordered}
      horizontal={horizontal}
      postCardStyles={postCardStyles}
    >
      <div className="row">
        {items.map(({ post, size }) => (
          <div key={post.id} className="post-card-wrapper">
            <PostCard
              size={size as any}
              applySizeStyles={false}
              className="post-card"
              contentType={post.type}
              displayYear={displayYear}
              displayPodcastShow={displayPodcastShow}
              data={PostCard.toData(post, shows)}
            />
          </div>
        ))}
      </div>
    </Container>
  )
}

type Pattern = {
  cols: number
  maxWidth?: string
  size: PostCardProps['size']
  rowBorder?: boolean
}
type Breakpoint = {
  pattern: Pattern[]
  breakpoint: Breakpoints
}

const createGridStyles = ({
  theme,
  pattern = [],
  postCardStyles,
  breakpoint = false,
  horizontal = false,
}: {
  theme: Theme
  postCardStyles: {
    [name: string]: SerializedStyles
  }
  pattern: Pick<Pattern, 'cols' | 'size' | 'maxWidth' | 'rowBorder'>[]
  breakpoint?: boolean
  horizontal?: boolean
}) => {
  const grid = !horizontal

  if (grid) {
    const cm = pattern.map((p) => p.cols).reduce(lcm, 1)
    const sum = Math.max(
      1,
      pattern.reduce((p, c) => p + c.cols, 0),
    )

    let selectorNumber = 0
    const selectors = pattern.map((p) => {
      const start = selectorNumber + 1
      selectorNumber += p.cols

      return new Array(p.cols)
        .fill(null)
        .map((i, index) => `${sum}n + ${start + index}`)
    })

    return css`
      > .row {
        display: grid;
        grid-template-columns: repeat(${cm}, 1fr);
        overflow: hidden;

        & > div {
          ${pattern.map(
            (p, i) => css`
              ${selectors[i].map((s) => `&:nth-child(${s})`).join(', ')} {
                grid-column: span ${cm / p.cols};
                position: relative;

                ${p.rowBorder &&
                css`
                  &::before {
                    width: calc(100% + 16px);
                    height: 1px;
                    content: ' ';
                    top: 0;
                    left: 0px;
                    position: absolute;
                    background: rgb(var(--lsd-border-primary));
                  }
                `}

                .post-card {
                  --post-card-size: ${p.size};
                  ${postCardStyles[p.size as string].styles}
                }
              }
            `,
          )}
        }
      }
    `
  } else {
    return css`
      overflow: hidden;

      > .row {
        display: flex;
        flex-direction: row;
        flex-wrap: unwrap;
        justify-content: flex-start;
        width: 100%;
        overflow: scroll;
        scroll-snap-type: x mandatory;
        gap: 0 32px;

        /* Chrome, Safari and Opera */
        &::-webkit-scrollbar {
          width: 0;
          display: none;
        }

        /* Firefox, Edge and IE */
        -ms-overflow-style: none;
        scrollbar-width: none;

        & > div {
          ${pattern.map(
            (p, i) => css`
              max-width: ${p.maxWidth ? p.maxWidth : 'unset'};
              flex-grow: 1 auto;
              flex-shrink: 0;
              width: calc((100% - (${p.cols - 1} * 32px)) / ${p.cols});
              flex-basis: calc((100% - (${p.cols - 1} * 32px)) / ${p.cols});
              scroll-snap-align: start !important;
              position: relative;

              .post-card {
                --post-card-size: ${p.size};
                ${postCardStyles[p.size as string].styles}
              }

              &:not(:last-child) {
                &::after {
                  width: 1px;
                  height: calc(100% - 48px);
                  content: ' ';
                  right: -16px;
                  top: 24px;
                  background: rgb(var(--lsd-border-primary));
                  position: absolute;
                }
              }
            `,
          )}
        }
      }
    `
  }
}

const Container = styled.div<{
  bordered: boolean
  horizontal?: boolean
  pattern: Pattern[]
  breakpoints: Breakpoint[]
  postCardStyles: {
    [name: string]: SerializedStyles
  }
}>`
  display: grid;
  gap: 16px 0;

  ${(props) => css`
    > .row {
      display: grid;
      gap: 0 16px;

      & > div {
        padding: 24px 0;
        border-top: ${props.bordered ? '1px' : '0'} solid
          rgb(var(--lsd-border-primary));
      }
    }

    ${lsdUtils
      .breakpoints(props.breakpoints.map((b) => b.breakpoint))
      .map((breakpoint) =>
        lsdUtils.responsive(
          props.theme,
          breakpoint,
          'exact',
        )(css`
          ${createGridStyles({
            theme: props.theme,
            horizontal: props.horizontal,
            pattern: props.pattern,
            postCardStyles: props.postCardStyles,
            breakpoint: true,
          })}
        `),
      )}
  `}

  ${({ breakpoints = [], theme, postCardStyles, horizontal }) => {
    return breakpoints.map((b) =>
      lsdUtils.responsive(
        theme,
        b.breakpoint,
        'exact',
      )(css`
        ${createGridStyles({
          theme,
          horizontal,
          pattern: b.pattern,
          postCardStyles,
          breakpoint: true,
        })}
      `),
    )
  }}
`
