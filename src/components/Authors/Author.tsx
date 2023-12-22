import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'

export type AuthorProps = React.ComponentProps<typeof AuthorInfo> & {
  author: LPE.Author.Document
}

const Author: React.FC<AuthorProps> = ({ author, ...props }) => (
  <AuthorInfo {...props}>
    <AuthorInitials>
      <span>{author.name.slice(0, 1)}</span>
    </AuthorInitials>
    <CustomTypography
      variant="subtitle4"
      component="p"
      genericFontFamily="sans-serif"
    >
      {author.name}
    </CustomTypography>
  </AuthorInfo>
)

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 var(--lsd-spacing-8);
`

const AuthorInitials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  box-sizing: border-box;
  border: 1px solid rgb(var(--lsd-border-primary));

  span {
    font-size: 0.6875rem !important;
    font-weight: 400 !important;
    line-height: 1rem !important;
  }
`

const CustomTypography = styled(Typography)`
  text-transform: capitalized;
`

export default Author
