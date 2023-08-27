import styled from '@emotion/styled'
import { Typography } from '@acid-info/lsd-react'

export enum BlockType {
  TEXT = 'text',
  IMAGE = 'image',
}

type Props = {
  type: BlockType
  date: Date | null
}

const ContentBlockHeader = ({ type, date }: Props) => {
  return (
    <ContentBlockInfo>
      <Typography variant="body3" genericFontFamily="sans-serif">
        {type === BlockType.TEXT ? 'PARAGRAPH' : 'IMAGE'}
      </Typography>
      <Typography variant="body3">•</Typography>
      <Typography variant="body3" genericFontFamily="sans-serif">
        {date &&
          date.toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
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
