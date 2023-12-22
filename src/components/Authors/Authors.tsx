import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { DotIcon } from '../Icons/DotIcon'
import Author from './Author'

export type AuthorsProps = Partial<
  React.ComponentProps<typeof AuthorsContainer>
> & {
  authors: LPE.Author.Document[]
  separator?: boolean
}

const Authors: React.FC<AuthorsProps> = ({
  authors,
  separator = true,
  ...props
}) => {
  return authors?.length > 0 ? (
    <AuthorsContainer {...props}>
      {authors.map((author, index) => (
        <AuthorContainer key={author.name}>
          <Author author={author} />
          {separator && index < authors.length - 1 && (
            <DotIcon color="primary" />
          )}
        </AuthorContainer>
      ))}
    </AuthorsContainer>
  ) : null
}

const AuthorsContainer = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const AuthorContainer = styled.div`
  gap: 12px;
  display: flex;
  align-items: center;
`

export default Authors
