import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { Hero } from '../../components/Hero'
import { PostsGrid } from '../../components/PostsGrid'
import { uiConfigs } from '../../configs/ui.configs'
import { useRecentPosts } from '../../queries/useRecentPosts.query'
import { ApiPaginatedPayload } from '../../types/data.types'
import { LPE } from '../../types/lpe.types'
import { lsdUtils } from '../../utils/lsd.utils'
import { PodcastShowsPreview } from '../PodcastShowsPreview'

export type HomePageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  data: {
    tags: string[]
    shows: LPE.Podcast.Show[]
    latest: ApiPaginatedPayload<LPE.Post.Document[]>
    highlighted: LPE.Post.Document[]
  }
}

export const HomePage: React.FC<HomePageProps> = ({
  data,
  data: { highlighted = [], shows = [], tags = [], latest },
  ...props
}) => {
  const query = useRecentPosts({ initialData: latest, limit: 10 })

  const [group1, group2] = useMemo(
    () => [query.posts.slice(0, 5), query.posts.slice(5)],
    [query.posts],
  )

  return (
    <Root {...props}>
      <HeroContainer>
        <Hero tags={tags} />
      </HeroContainer>
      <MostRecentContainer>
        <Container>
          <PostsGrid
            posts={group1}
            horizontal
            displayYear={false}
            pattern={[{ cols: 5, size: 'xxsmall' }]}
            breakpoints={[
              {
                breakpoint: 'xs',
                pattern: [{ cols: 1.5, size: 'xxsmall', maxWidth: '192px' }],
              },
              {
                breakpoint: 'sm',
                pattern: [{ cols: 4, size: 'xxsmall' }],
              },
              {
                breakpoint: 'md',
                pattern: [{ cols: 4, size: 'xxsmall' }],
              },
            ]}
          />
        </Container>
      </MostRecentContainer>
      <Container>
        <PostsGrid
          bordered
          posts={highlighted.slice(0, 1)}
          pattern={[{ cols: 1, size: 'large' }]}
          breakpoints={[
            {
              breakpoint: 'xs',
              pattern: [{ cols: 1, size: 'small' }],
            },
          ]}
        />
        <PostsGrid
          pattern={[
            { cols: 4, size: 'small' },
            {
              cols: 2,
              size: 'medium',
            },
          ]}
          breakpoints={[
            {
              breakpoint: 'xs',
              pattern: [
                {
                  cols: 1,
                  size: 'small',
                },
              ],
            },
            {
              breakpoint: 'sm',
              pattern: [
                {
                  cols: 3,
                  size: 'small',
                },
                {
                  cols: 2,
                  size: 'medium',
                },
              ],
            },
            {
              breakpoint: 'md',
              pattern: [
                {
                  cols: 3,
                  size: 'small',
                },
                {
                  cols: 2,
                  size: 'medium',
                },
              ],
            },
          ]}
          posts={group2}
          bordered
        />

        {query.hasNextPage && (
          <div className="load-more">
            <Button
              onClick={() => query.fetchNextPage()}
              size="large"
              disabled={query.isLoading}
            >
              <Typography variant="label1">
                {query.isFetchingNextPage ? 'Loading...' : 'See more posts'}
              </Typography>
            </Button>
          </div>
        )}

        <PodcastShowsPreview data={{ shows }} />
      </Container>
    </Root>
  )
}

const Root = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;

  .load-more {
    width: 100%;
    text-align: center;

    button {
      width: 340px;
    }

    ${(props) => lsdUtils.breakpoint(props.theme, 'md', 'down')} {
      button {
        width: 236px;
      }
    }

    ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
      button {
        width: 100%;
      }
    }
  }

  .podcasts {
    margin-top: 40px;
  }
`

const MostRecentContainer = styled.div`
  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
    & > div {
      padding: 0;
      padding-left: var(--main-content-padding);
    }
  }
`

const HeroContainer = styled.div`
  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
    & > div:last-of-type {
      padding-left: 0;
      padding-right: 0;
    }
  }
`

const Container = styled.div`
  @media (max-width: ${uiConfigs.maxContainerWidth}px) {
    padding: 0 var(--main-content-padding);
  }
`
