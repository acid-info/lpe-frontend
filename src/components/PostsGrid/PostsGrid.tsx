import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { LPE } from '../../types/lpe.types'
import { chunkArray } from '../../utils/array.utils'
import { PostCard, PostCardProps } from '../PostCard'

export type PostsGridProps = Partial<React.ComponentProps<typeof Container>> & {
  shows?: LPE.Podcast.Show[]
  posts?: LPE.Post.Document[]
  displayPodcastShow?: boolean
}

export const PostsGrid: React.FC<PostsGridProps> = ({
  cols = 4,
  size = 'small',
  posts = [],
  shows = [],
  bordered = false,
  displayPodcastShow = true,
  ...props
}) => {
  const groups = useMemo(() => chunkArray(posts, cols), [posts, cols])

  return (
    <Container {...props} cols={cols} size={size} bordered={bordered}>
      {groups.map((group, index) => (
        <div className="row" key={index}>
          {group.map((post) => (
            <div key={post.id} className="post-card-wrapper">
              <PostCard
                size={size}
                className="post-card"
                contentType={post.type}
                displayPodcastShow={displayPodcastShow}
                data={PostCard.toData(post, shows)}
              />
            </div>
          ))}
        </div>
      ))}
    </Container>
  )
}

const Container = styled.div<{
  cols: number
  bordered: boolean
  size: PostCardProps['size']
}>`
  display: grid;
  gap: 16px 0;

  ${(props) => css`
    > .row {
      display: grid;
      grid-template-columns: repeat(${props.cols}, 1fr);
      gap: 0 16px;

      & > div {
        padding: 24px 0;
        border-top: ${props.bordered ? '1px' : '0'} solid
          rgb(var(--lsd-border-primary));
      }
    }
  `}

  ${(props) =>
    props.size === 'xxsmall' &&
    css`
      > .row {
        padding: 24px 0;
        gap: 0 32px;

        & > div {
          border-top: 0;
          padding: 0;
          position: relative;
        }

        & > div:not(:last-child)::after {
          content: ' ';
          height: 100%;
          width: 1px;
          background: rgb(var(--lsd-border-primary));
          position: absolute;
          top: 0;
          right: -16px;
          display: ${props.bordered ? 'block' : 'none'};
        }
      }
    `}

  ${(props) =>
    props.size === 'xsmall' &&
    css`
      > .row {
        gap: 0 16px;

        & > div {
          box-sizing: border-box;
          border-top: 0;
        }

        & > div:last-child {
        }
        & > div:not(:last-child) {
        }
      }
    `}

  ${(props) => props.size === 'small' && css``}

  ${(props) => props.size === 'medium' && css``}

  ${(props) => props.size === 'large' && css``}
`
