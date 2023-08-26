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
      {readingLength} MIN
    </Typography>
    {date && (
      <>
        <Typography variant="body3">•</Typography>
        <Date variant="body3" genericFontFamily="sans-serif">
          {date &&
            date.toLocaleString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
        </Date>
      </>
    )}
  </Row>
)

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`

const Date = styled(Typography)`
  text-transform: uppercase;
`

export default ArticleStats
