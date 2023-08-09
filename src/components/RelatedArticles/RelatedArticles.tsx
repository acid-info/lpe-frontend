import { SearchResultsSection } from '@/components/SearchResultsSection/SearchResultsSection'
import { SearchHook } from '@/types/data.types'
import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { PostsList } from '../PostList/PostList'

type Props = {
  data: SearchHook<LPE.Article.Data>
}

export default function RelatedArticles({ data }: Props) {
  if (!data.loading && !data.data) return null
  return (
    <Container>
      <SearchResultsSection
        resultSize={data.data.length}
        loading={data.loading}
        title={'Related Articles'}
      >
        {
          <PostsList
            posts={data.data.map((item) => item.doc)}
            pageSize={
              typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 4
            }
            loading={data.loading}
          />
        }
      </SearchResultsSection>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`
