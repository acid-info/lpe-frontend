import { useIsMobile } from '@/utils/ui.utils'
import { Button, ChevronRightIcon, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React, { useEffect, useMemo } from 'react'
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

const TAGS_DESKTOP_LIMIT = 12
const TAGS_MOBILE_LIMIT = 6

export const HomePage: React.FC<HomePageProps> = ({
  data,
  data: { highlighted = [], shows = [], tags: _tags = [], latest },
  ...props
}) => {
  const query = useRecentPosts({ initialData: latest, limit: 12 })
  const tags = useMemo(
    () =>
      _tags
        .filter((t) => !!t.postsCount && t.postsCount > 0)
        .sort((a, b) => (a.postsCount! > b.postsCount! ? -1 : 1)),
    [_tags],
  )
  const isMobile = useIsMobile()

  const [tagsLimit, setTagsLimit] = React.useState(
    isMobile ? TAGS_MOBILE_LIMIT : TAGS_DESKTOP_LIMIT,
  )

  useEffect(() => {
    setTagsLimit(isMobile ? TAGS_MOBILE_LIMIT : TAGS_DESKTOP_LIMIT)
  }, [isMobile])

  const handleTagsLimit = () => {
    if (isMobile) {
      setTagsLimit(
        tagsLimit === TAGS_MOBILE_LIMIT ? tags?.length : TAGS_MOBILE_LIMIT,
      )
    } else {
      setTagsLimit(
        tagsLimit === TAGS_DESKTOP_LIMIT ? tags?.length : TAGS_DESKTOP_LIMIT,
      )
    }
  }

  return (
    <Root {...props}>
      <HeroContainer>
        <Hero />
      </HeroContainer>
      <Container>
        <div>
          <FeaturedFirst>
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
          </FeaturedFirst>
          <FeaturedSecond>
            <PostsGrid
              shows={shows}
              posts={[...highlighted.slice(0, 1), ...highlighted.slice(0, 1)]}
              pattern={[{ cols: 2, size: 'large' }]}
              breakpoints={[
                {
                  breakpoint: 'xs',
                  pattern: [{ cols: 2, size: 'small' }],
                },
                {
                  breakpoint: 'md',
                  pattern: [{ cols: 2, size: 'large' }],
                },
              ]}
            />
          </FeaturedSecond>
          <Section title="Latest posts" bordered={highlighted.length > 0}>
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
          <TagsTitle>
            <Typography component="h2" variant="body1">
              Tags
            </Typography>
            <ChevronRightIcon />
            <span onClick={handleTagsLimit}>
              {tagsLimit === TAGS_DESKTOP_LIMIT ||
              tagsLimit === TAGS_MOBILE_LIMIT
                ? 'See all'
                : 'See less'}
            </span>
          </TagsTitle>
          <Grid xs={{ cols: 1 }} sm={{ cols: 4 }}>
            {tags?.slice(0, tagsLimit)?.map((tag) => (
              <GridItem key={tag.name} cols={1}>
                <TagCard
                  href={`/search?topic=${tag.name}`}
                  name={formatTagText(tag.name)}
                  count={tag.postsCount}
                />
              </GridItem>
            ))}
          </Grid>
          <ShowMoreTagsButton onClick={handleTagsLimit}>
            See {tagsLimit === TAGS_MOBILE_LIMIT ? 'more' : 'less'} tags
          </ShowMoreTagsButton>
          <AllPosts title="All posts">
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

const TagsTitle = styled.div`
  display: flex;
  align-items: center;
  gap: var(--lsd-spacing-8);

  span {
    cursor: pointer;
    color: var(--lsd-color-primary);
    text-decoration: underline;
  }
`

const ShowMoreTagsButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 40px;
  border: 1px solid rgb(var(--lsd-border-primary));
  margin-top: 40px;
  height: 56px;
  box-sizing: border-box;

  margin-bottom: 66px;

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'up')} {
    display: none;
  }
`

const FeaturedFirst = styled.div`
  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'up')} {
    .show-details {
      margin-top: var(--lsd-spacing-32);
    }
  }
`

const FeaturedSecond = styled.div`
  margin-bottom: var(--lsd-spacing-64);

  h3 {
    font-size: var(--lsd-h3-fontSize) !important;
    font-weight: var(--lsd-h3-fontWeight) !important;
    line-height: var(--lsd-h3-lineHeight) !important;
  }

  .post-card-wrapper {
    border-top: 1px solid rgb(var(--lsd-border-primary));
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'exact')} {
    margin-top: var(--lsd-spacing-40);
    margin-bottom: var(--lsd-spacing-80);

    .post-card-wrapper {
      width: 327px;

      & > div {
        width: 327px;
      }
    }

    & > div > div {
      display: flex !important;
      overflow-x: auto !important;
    }
  }
`
