import { getArticleCover } from '@/utils/data.utils'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { PostsList } from '../PostList/PostList'
import { Section } from '../Section/Section'
import { SearchResultItem } from '@/types/data.types'
import { UnbodyGoogleDoc } from '@/lib/unbody/unbody.types'

type Props = {
  articles: SearchResultItem<UnbodyGoogleDoc>[]
}

export default function RelatedArticles({ articles }: Props) {
  return (
    <Container>
      <Section title={'Related Articles'} matches={articles?.length}>
        <PostsList
          posts={articles.map((article) => ({
            slug: article.doc.slug,
            date: article.doc.modifiedAt,
            title: article.doc.title,
            description: article.doc.subtitle, // TODO: summary is not available
            author: 'Jinho',
            tags: article.doc.tags,
            coverImage: getArticleCover(article.doc.blocks),
          }))}
        />
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
