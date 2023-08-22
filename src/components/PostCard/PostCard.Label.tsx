import { Typography } from '@acid-info/lsd-react'
import React, { FC } from 'react'
import styled from '@emotion/styled'
import { LPE } from '@/types/lpe.types'
import PostType = LPE.PostType

export type Props = React.ComponentProps<typeof Container> & {
  contentType: PostType
  date: Date | null
}

export const PostCardLabel: FC<Props> = ({ contentType, date, ...props }) => {
  return (
    <Container {...props}>
      <Typography variant="body3" genericFontFamily="sans-serif">
        {contentType.toUpperCase()}
      </Typography>

      <Typography variant="body3">•</Typography>

      <Typography variant="body3" genericFontFamily="sans-serif">
        {date &&
          date.toLocaleString('en-GB', {
            day: 'numeric',
            month: 'long', // TODO: Should be uppercase
            year: 'numeric',
          })}
      </Typography>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
