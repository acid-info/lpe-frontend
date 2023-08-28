import { LPE } from '@/types/lpe.types'
import styled from '@emotion/styled'
import { PostCard } from '@/components/PostCard'
import { SearchResultTopPostBlocks } from '@/components/Search/SearchResult.TopPost.Blocks'
import { Typography } from '@acid-info/lsd-react'
import { lsdUtils } from '@/utils/lsd.utils'

interface Props {
  post: LPE.Search.ResultItemBase<LPE.Post.Document>
  shows: LPE.Podcast.Show[]
  blocks: LPE.Search.ResultItemBase<LPE.Post.ContentBlock>[]
}
export const SearchResultTopPost = ({ post, shows, blocks }: Props) => {
  const data = PostCard.toData(post.data, shows)
  return (
    <Container>
      <PostCard
        data={{
          ...data,
          coverImage: post.type === 'podcast' ? data.coverImage : undefined,
        }}
        className={'post-card__search-result top-post'}
        size={'large'}
        contentType={post.type as LPE.PostType}
      />
      {blocks.length > 0 && <SearchResultTopPostBlocks blocks={blocks} />}
    </Container>
  )
}

const Container = styled.div`
  padding: 24px 0;

  ${({ theme }) => lsdUtils.breakpoint(theme, 'xs', 'exact')} {
    padding: 0;
  }
`
