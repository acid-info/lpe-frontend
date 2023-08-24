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
}

export const PostsGrid: React.FC<PostsGridProps> = ({
  posts = [],
  shows = [],
  pattern = [],
  breakpoints = [],
  bordered = false,
  displayPodcastShow = true,
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
  size: PostCardProps['size']
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
}: {
  theme: Theme
  postCardStyles: {
    [name: string]: SerializedStyles
  }
  pattern: Pick<Pattern, 'cols' | 'size'>[]
  breakpoint?: boolean
}) => {
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

      & > div {
        ${pattern.map(
          (p, i) => `
          ${selectors[i].map((s) => `&:nth-child(${s})`).join(', ')} {
            grid-column: span ${cm / p.cols};

            .post-card {
              ${postCardStyles[p.size as string].styles}
            }
           }
        `,
        )}
      }
    }
  `
}

const Container = styled.div<{
  bordered: boolean
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
        lsdUtils.breakpoint(
          props.theme,
          breakpoint,
          'exact',
        )(css`
          ${createGridStyles({
            theme: props.theme,
            pattern: props.pattern,
            postCardStyles: props.postCardStyles,
            breakpoint: true,
          })}
        `),
      )}
  `}

  ${({ breakpoints = [], theme, postCardStyles }) => {
    return breakpoints.map((b) =>
      lsdUtils.breakpoint(
        theme,
        b.breakpoint,
        'exact',
      )(css`
        ${createGridStyles({
          theme,
          pattern: b.pattern,
          postCardStyles,
          breakpoint: true,
        })}
      `),
    )
  }}
`
// ${b.size.map(
//           ([originalSize, targetSize]) => `
//           .post-card--${originalSize} {
//             ${postCardStyles[targetSize as string]?.styles}
//           }
//         `,
//         )}

// @media (max-width: ${props.theme.breakpoints.sm.width - 1}px) {
// }

// @media (min-width: ${props.theme.breakpoints.sm.width}px) {
//   ${props.pattern.sm && createGridStyles({ pattern: props.pattern.sm })}
// }

// @media (min-width: ${props.theme.breakpoints.md.width}px) {
//   ${props.pattern.md && createGridStyles({ pattern: props.pattern.md })}
// }

// @media (min-width: ${props.theme.breakpoints.lg.width}px) {
//   ${props.pattern.lg && createGridStyles({ pattern: props.pattern.lg })}
// }

// styled.div`
//   ${(props) =>
//     props.size === 'xxsmall' &&
//     css`
//       > .row {
//         padding: 24px 0;
//         gap: 0 32px;

//         & > div {
//           border-top: 0;
//           padding: 0;
//           position: relative;
//         }

//         & > div:not(:last-child)::after {
//           content: ' ';
//           height: 100%;
//           width: 1px;
//           background: rgb(var(--lsd-border-primary));
//           position: absolute;
//           top: 0;
//           right: -16px;
//           display: ${props.bordered ? 'block' : 'none'};
//         }
//       }
//     `}

//   ${(props) =>
//     props.size === 'xsmall' &&
//     css`
//       > .row {
//         gap: 0 16px;

//         & > div {
//           box-sizing: border-box;
//           border-top: 0;
//         }

//         & > div:last-child {
//         }
//         & > div:not(:last-child) {
//         }
//       }
//     `}

//   ${(props) => props.size === 'small' && css``}

//   ${(props) => props.size === 'medium' && css``}

//   ${(props) => props.size === 'large' && css``} // @media (max-width: ${(
//     props,
//   ) => props.theme.breakpoints.sm.width})
// `
