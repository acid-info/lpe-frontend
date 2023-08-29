import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { AuthorsConfig } from '../../configs/data.configs'
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
    <CustomTypography
      variant="body3"
      component="p"
      genericFontFamily="sans-serif"
    >
      {author.name}
    </CustomTypography>
    {email &&
      author.emailAddress &&
      !AuthorsConfig.hiddenEmailAddresses.includes(author.emailAddress) && (
        <Typography
          href={`mailto:${author.emailAddress}`}
          variant="label2"
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

const CustomTypography = styled(Typography)`
  text-transform: capitalized;
`

export default Author
