import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React from 'react'
import { Grid, GridItem } from '../../components/Grid/Grid'
import { Hero } from '../../components/Hero'
import { PostsGrid } from '../../components/PostsGrid'
import { Section } from '../../components/Section/Section'
import { TagCard } from '../../components/TagCard'
import { uiConfigs } from '../../configs/ui.configs'
import { useRecentPosts } from '../../queries/useRecentPosts.query'
import { ApiPaginatedPayload } from '../../types/data.types'
import { LPE } from '../../types/lpe.types'
import { lsdUtils } from '../../utils/lsd.utils'
import { formatTagText } from '../../utils/string.utils'
import { PodcastShowsPreview } from '../PodcastShowsPreview'

export type HomePageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  data: {
    tags: LPE.Tag.Document[]
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
        <Hero />
      </HeroContainer>
      <Container>
        <div>
          <PostsGrid
            shows={shows}
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
              shows={shows}
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
              posts={query.posts
                .filter((post) => !post.highlighted)
                .slice(0, 8)}
            />
          </Section>
        </div>

        <PodcastShowsPreview data={{ shows }} />

        <BrowseAll title="Browser all" size="large">
          <div>
            <Typography component="h2" variant="body1">
              Tags
            </Typography>
          </div>
          <Grid xs={{ cols: 1 }} sm={{ cols: 4 }}>
            {tags.map((tag) => (
              <GridItem key={tag.name} cols={1}>
                <TagCard
                  href={`/search?topic=${tag.name}`}
                  name={formatTagText(tag.name)}
                  count={tag.postsCount}
                />
              </GridItem>
            ))}
          </Grid>
          <AllPosts title="All posts">
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
              posts={query.posts}
            />
          </AllPosts>

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
        </BrowseAll>
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
    margin-top: var(--lsd-spacing-24);

    ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
      margin-top: var(--lsd-spacing-16);

      button {
        width: 100%;
      }
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

  display: flex;
  flex-direction: column;
  gap: var(--lsd-spacing-120) 0;

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
    gap: var(--lsd-spacing-80) 0;
  }
`

const BrowseAll = styled(Section)`
  & > .section__content {
    & > div:first-of-type {
      padding: var(--lsd-spacing-24) 0;
    }
  }
`

const AllPosts = styled(Section)`
  margin-top: var(--lsd-spacing-64);

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
    margin-top: var(--lsd-spacing-40);
  }
`
