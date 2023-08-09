import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

const ArticleStats = ({
  date,
  readingLength,
}: {
  date: Date | null
  readingLength: number
}) => (
  <Row>
    <Typography variant="body3" genericFontFamily="sans-serif">
      {readingLength} minutes read
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
