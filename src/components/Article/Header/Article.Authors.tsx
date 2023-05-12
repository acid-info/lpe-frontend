import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'
import ArticleAuthor from './Article.Author'
import styled from '@emotion/styled'

const ArticleAuthors = ({
  mentions,
}: {
  mentions: UnbodyGraphQl.Fragments.MentionItem[]
}) =>
  mentions.length > 0 ? (
    <ArticleAuthorsContainer>
      {mentions.map((mention) => (
        <ArticleAuthor key={mention.name} mention={mention} />
      ))}
    </ArticleAuthorsContainer>
  ) : null

const ArticleAuthorsContainer = styled.div`
  margin-block: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default ArticleAuthors
