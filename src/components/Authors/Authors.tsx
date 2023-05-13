import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'
import Author from './Author'
import styled from '@emotion/styled'

const Authors = ({
  mentions,
  email,
}: {
  mentions: UnbodyGraphQl.Fragments.MentionItem[]
  email: boolean
}) =>
  mentions?.length > 0 ? (
    <AuthorsContainer>
      {mentions.map((mention) => (
        <Author key={mention.name} mention={mention} email={email} />
      ))}
    </AuthorsContainer>
  ) : null

const AuthorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export default Authors
