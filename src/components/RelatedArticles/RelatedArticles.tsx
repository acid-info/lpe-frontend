import { getArticleCover } from '@/utils/data.utils'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { PostsList } from '../PostList/PostList'
import { Section } from '../Section/Section'
import { SearchHook, SearchResultItem } from '@/types/data.types'
import { UnbodyGoogleDoc } from '@/lib/unbody/unbody.types'

type Props = {
  data: SearchHook<UnbodyGoogleDoc>
}

export default function RelatedArticles({ data }: Props) {
  if (!data.loading && !data.data) return null

  return (
    <Container>
      <Section
        title={data.loading ? 'Loading...' : 'Related Articles'}
        matches={data.loading ? undefined : data.data.length}
      >
        {
          <PostsList
            posts={
              data.loading
                ? []
                : data.data.map((article) => ({
                    slug: article.doc.slug,
                    date: article.doc.modifiedAt,
                    title: article.doc.title,
                    description: article.doc.subtitle, // TODO: summary is not available
                    author: 'Jinho',
                    tags: article.doc.tags,
                    coverImage: getArticleCover(article.doc.blocks),
                  }))
            }
            pageSize={4}
          />
        }
      </Section>
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
