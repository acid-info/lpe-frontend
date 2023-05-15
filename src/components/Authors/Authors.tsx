import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'
import Author from './Author'
import styled from '@emotion/styled'
import { Typography } from '@acid-info/lsd-react'

export enum AuthorsDirection {
  COLUMN = 'column',
  ROW = 'row',
}

const Authors = ({
  mentions,
  email,
  gap = 12,
  flexDirection = AuthorsDirection.ROW,
}: {
  mentions: UnbodyGraphQl.Fragments.MentionItem[]
  email: boolean
  gap?: number
  flexDirection?: AuthorsDirection
}) => {
  return mentions?.length > 0 ? (
    <AuthorsContainer gap={gap} flexDirection={flexDirection}>
      {mentions.map((mention, index) =>
        index < mentions.length - 1 ? (
          <>
            <Author key={mention.name} mention={mention} email={email} />
            <Dot variant={'body2'}>•</Dot>
          </>
        ) : (
          <Author key={mention.name} mention={mention} email={email} />
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

export default Authors
