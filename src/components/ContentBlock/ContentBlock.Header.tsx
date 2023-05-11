import styled from '@emotion/styled'
import { Typography } from '@acid-info/lsd-react'
import { PostClassType } from '../Post/Post'

type Props = {
  type: PostClassType
  date: string
}

const ContentBlockHeader = ({ type, date }: Props) => {
  return (
    <ContentBlockInfo>
      <Typography variant="body3" genericFontFamily="sans-serif">
        {type.toUpperCase()}
      </Typography>
      <Typography variant="body3">•</Typography>
      <Typography variant="body3" genericFontFamily="sans-serif">
        {new Date(date).toLocaleString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </Typography>
    </ContentBlockInfo>
  )
}

const ContentBlockInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export default ContentBlockHeader
