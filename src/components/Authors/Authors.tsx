import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import Author from './Author'

export enum AuthorsDirection {
  COLUMN = 'column',
  ROW = 'row',
}

const Authors = ({
  authors,
  email,
  gap = 12,
  flexDirection = AuthorsDirection.ROW,
}: {
  authors: LPE.Author.Document[]
  email: boolean
  gap?: number
  flexDirection?: AuthorsDirection
}) => {
  return authors?.length > 0 ? (
    <AuthorsContainer gap={gap} flexDirection={flexDirection}>
      {authors.map((author, index) =>
        index < authors.length - 1 ? (
          <AuthorContainer gap={gap} key={author.name}>
            <Author author={author} email={email} />
            <Dot variant={'body2'}>•</Dot>
          </AuthorContainer>
        ) : (
          <Author key={author.name} author={author} email={email} />
        ),
      )}
    </AuthorsContainer>
  ) : null
}

const AuthorsContainer = styled.div<{
  gap: number
  flexDirection: AuthorsDirection
}>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  gap: ${({ gap }) => gap}px;
  align-items: center;
`

const Dot = styled(Typography)`
  font-size: 14px;
  display: flex;
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
