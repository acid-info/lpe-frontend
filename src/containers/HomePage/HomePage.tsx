import styled from '@emotion/styled'
import React from 'react'
import { Hero } from '../../components/Hero'
import { PostsGrid } from '../../components/PostsGrid'
import { Section } from '../../components/Section/Section'
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
  const query = useRecentPosts({ initialData: latest, limit: 12 })

  return (
    <Root {...props}>
      <HeroContainer>
        <Hero tags={tags} />
      </HeroContainer>
      <Container>
        <PostsGrid
          posts={highlighted.slice(0, 1)}
          pattern={[{ cols: 1, size: 'large' }]}
          breakpoints={[
            {
              breakpoint: 'xs',
              pattern: [{ cols: 1, size: 'small' }],
            },
            {
              breakpoint: 'md',
              pattern: [{ cols: 1, size: 'large' }],
            },
          ]}
        />
        <Section title="Latest posts">
          <PostsGrid
            pattern={[{ cols: 4, size: 'small' }]}
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
                    cols: 2,
                    size: 'small',
                  },
                ],
              },
              {
                breakpoint: 'md',
                pattern: [
                  {
                    cols: 4,
                    size: 'small',
                  },
                ],
              },
            ]}
            posts={query.posts.slice(0, 8)}
          />
        </Section>

        {/* {query.hasNextPage && (
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
        )} */}

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
