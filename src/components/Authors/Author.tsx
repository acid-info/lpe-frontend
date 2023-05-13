import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

const Author = ({
  mention,
  email,
}: {
  mention: UnbodyGraphQl.Fragments.MentionItem
  email: boolean
}) => (
  <AuthorInfo key={mention.name}>
    <Typography variant="body3" component="p" genericFontFamily="sans-serif">
      {mention.name}
    </Typography>
    {email && (
      <Typography
        href={`mailto:${mention.emailAddress}`}
        variant="body3"
        component="a"
        genericFontFamily="sans-serif"
      >
        {mention.emailAddress}
      </Typography>
    )}
  </AuthorInfo>
)

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export default Author
