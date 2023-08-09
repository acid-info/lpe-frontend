import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'

const Author = ({
  author,
  email,
}: {
  author: LPE.Author.Document
  email: boolean
  gap?: number
}) => (
  <AuthorInfo key={author.name}>
    <Typography variant="body3" component="p" genericFontFamily="sans-serif">
      {author.name}
    </Typography>
    {email && (
      <Typography
        href={`mailto:${author.emailAddress}`}
        variant="body3"
        component="a"
        genericFontFamily="sans-serif"
      >
        {author.emailAddress}
      </Typography>
    )}
  </AuthorInfo>
)

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export default Author
