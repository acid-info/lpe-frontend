import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { DotIcon } from '../Icons/DotIcon'
import Author from './Author'

export enum AuthorsDirection {
  COLUMN = 'column',
  ROW = 'row',
}

export type AuthorsProps = Partial<
  React.ComponentProps<typeof AuthorsContainer>
> & {
  authors: LPE.Author.Document[]
  email: boolean
}

const Authors: React.FC<AuthorsProps> = ({
  authors,
  email,
  gap = 12,
  flexDirection = AuthorsDirection.ROW,
  ...props
}) => {
  return authors?.length > 0 ? (
    <AuthorsContainer gap={gap} flexDirection={flexDirection} {...props}>
      <Typography variant="label2" style={{ marginRight: `${3 - gap}px` }}>
        by
      </Typography>
      {authors.map((author, index) => (
        <AuthorContainer gap={gap} key={author.name}>
          <Author author={author} email={email} />
          {index < authors.length - 1 && <DotIcon color="primary" />}
        </AuthorContainer>
      ))}
    </AuthorsContainer>
  ) : null
}

const AuthorsContainer = styled.div<{
  gap?: number
  flexDirection?: AuthorsDirection
}>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  gap: ${({ gap }) => gap}px;
  align-items: center;
`

const AuthorContainer = styled.div<{
  gap: number
}>`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap}px;
`

export default Authors
