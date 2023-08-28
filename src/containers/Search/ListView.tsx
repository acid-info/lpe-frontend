import styled from '@emotion/styled'
import { LPE } from '@/types/lpe.types'
import { Grid, GridItem } from '@/components/Grid/Grid'
import { SearchResultsListHeader } from '@/components/Search/SearchResultsList.Header'
import { copyConfigs } from '@/configs/copy.configs'
import { SearchResultListPosts } from '@/components/Search/SearchResultList.Posts'
import { useMemo } from 'react'
import { SearchResultTopPost } from '@/components/Search/SearchResult.TopPost'
import { SearchResultListBlocks } from '@/components/Search/SearchResult.Blocks'
import { Typography } from '@acid-info/lsd-react'
import { lsdUtils } from '@/utils/lsd.utils'

interface Props {
  posts: LPE.Search.ResultItemBase<LPE.Post.Document>[]
  blocks: LPE.Search.ResultItemBase<LPE.Post.ContentBlock>[]
  shows: LPE.Podcast.Show[]
  busy: boolean
}

export const SearchResultsListView = (props: Props) => {
  const { posts, shows, blocks, busy } = props

  const mostReferredPostIndex = useMemo(() => {
    // Extract the IDs of the first 3 posts
    const firstThreePostIds = posts.slice(0, 3).map((post) => post.data.id)

    // Count occurrences of each post id from the blocks,
    // but only for the first 3 posts
    const postCounts = blocks.reduce((acc, block) => {
      const postId = block.data.document.id
      if (firstThreePostIds.includes(postId)) {
        acc[postId] = (acc[postId] || 0) + 1
      }
      return acc
    }, {} as { [key: string]: number })

    // Find the post id with the maximum count among the first 3 posts
    // Ensure it's been referred to at least once
    let maxCount = 0
    let topPostId: string | null = null

    for (const postId of firstThreePostIds) {
      if (postCounts[postId] > maxCount) {
        maxCount = postCounts[postId]
        topPostId = postId
      }
    }

    // Ensure the post has been referred to at least once
    return maxCount > 0 && topPostId
      ? posts.findIndex((p) => p.data.id === (topPostId as string))
      : -1
  }, [blocks, posts])

  const topPost = useMemo(() => {
    return mostReferredPostIndex >= 0 ? posts[mostReferredPostIndex] : null
  }, [mostReferredPostIndex])

  const [renderPosts, renderBlocks, topResultBlocks] = useMemo(() => {
    const _renderPosts = topPost
      ? posts.filter((p) => p.data.id !== topPost.data.id)
      : posts
    // we want to only show those blocks in top results
    // that are among the top 10 results
    const _topResultBlocks = blocks
      .slice(0, 10)
      .filter((b) => b.data.document.id === topPost?.data.id)
    const _renderBlocks = blocks.filter(
      (b) =>
        _topResultBlocks.findIndex((tb) => tb.data.id === b.data.id) === -1,
    )
    return [_renderPosts, _renderBlocks, _topResultBlocks]
  }, [posts, blocks, topPost])

  return (
    <Container cols={12}>
      <PostsList className={'w-8'}>
        {topPost && (
          <PostsListHeader>
            <SearchResultsListHeader
              title={copyConfigs.search.labels.topResults}
            />
            <SearchResultTopPost
              post={topPost}
              shows={shows}
              blocks={topResultBlocks}
            />
          </PostsListHeader>
        )}
        <PostsListContent>
          {renderPosts.length > 0 ? (
            <>
              <SearchResultsListHeader
                title={copyConfigs.search.labels.articlesAndPodcasts}
              />
              <SearchResultListPosts posts={renderPosts} shows={shows} />
            </>
          ) : (
            !busy && (
              <Typography variant={'subtitle2'} genericFontFamily={'serif'}>
                No results found
              </Typography>
            )
          )}
        </PostsListContent>
      </PostsList>
      <GridItem className={'w-1'} />
      <BlocksList className={'w-3'}>
        {renderBlocks.length > 0 ? (
          <>
            <SearchResultsListHeader
              title={copyConfigs.search.labels.relatedContent}
            />
            <SearchResultListBlocks blocks={renderBlocks} />
          </>
        ) : (
          !busy && (
            <Typography variant={'subtitle2'} genericFontFamily={'serif'}>
              No related content found
            </Typography>
          )
        )}
      </BlocksList>
    </Container>
  )
}

const Container = styled(Grid)`
  padding-top: 56px;
  ${({ theme }) => lsdUtils.breakpoint(theme, 'xs', 'exact')} {
    padding-top: 32px;
  }
`

const PostsList = styled(GridItem)`
  display: flex;
  flex-direction: column;
  gap: 56px;
  ${({ theme }) => lsdUtils.breakpoint(theme, 'xs', 'exact')} {
    gap: 32px;
  }
`
const PostsListHeader = styled.div``
const PostsListContent = styled.div``

const BlocksList = styled(GridItem)``
