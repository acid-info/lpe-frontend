import { PostCard } from '@/components/PostCard'
import { SearchResultTopPostBlocks } from '@/components/Search/SearchResult.TopPost.Blocks'
import { LPE } from '@/types/lpe.types'
import { lsdUtils } from '@/utils/lsd.utils'
import styled from '@emotion/styled'

interface Props {
  post: LPE.Search.ResultItemBase<LPE.Post.Document>
  shows: LPE.Podcast.Show[]
  relatedTextBlocks: LPE.Article.TextBlock[]
  relatedImageBlocks: LPE.Article.ImageBlock[]
}

export const SearchResultTopPost = ({
  post,
  shows,
  relatedImageBlocks,
  relatedTextBlocks,
}: Props) => {
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
      {relatedTextBlocks.length + relatedImageBlocks.length > 0 && (
        <SearchResultTopPostBlocks
          imageBlocks={relatedImageBlocks}
          textBlocks={relatedTextBlocks}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 24px 0;

  ${({ theme }) => lsdUtils.breakpoint(theme, 'xs', 'exact')} {
    padding: 0;
  }
`
