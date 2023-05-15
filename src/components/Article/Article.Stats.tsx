import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

const ArticleStats = ({
  dateStr,
  readingLength,
}: {
  dateStr: string
  readingLength: number
}) => (
  <Row>
    <Typography variant="body3" genericFontFamily="sans-serif">
      {readingLength} minutes read
    </Typography>
    <Typography variant="body3">•</Typography>
    <Typography variant="body3" genericFontFamily="sans-serif">
      {new Date(dateStr).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long', // TODO: Should be uppercase
        year: 'numeric',
      })}
    </Typography>
  </Row>
)

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`

export default ArticleStats
