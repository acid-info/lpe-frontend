import { PostCard } from '@/components/PostCard'
import { LPE } from '@/types/lpe.types'
import styled from '@emotion/styled'

interface Props {
  posts: LPE.Search.ResultItemBase<LPE.Post.Document>[]
  shows: LPE.Podcast.Show[]
}
export const SearchResultListPosts = ({ posts, shows }: Props) => {
  return (
    <Container>
      {posts.map((post, index) => {
        const data = PostCard.toData(post.data, shows)
        return (
          <PostCard
            data={{
              ...data,
              coverImage: post.type === 'podcast' ? data.coverImage : undefined,
              authors: [],
            }}
            className={'post-card__search-result'}
            size={'large'}
            contentType={post.type as LPE.PostType}
            key={`result-${index}`}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
