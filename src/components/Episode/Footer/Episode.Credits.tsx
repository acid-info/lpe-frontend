import { Collapse } from '@/components/Collapse'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'

const EpisodeCredits = ({
  credits,
}: {
  credits: LPE.Podcast.Document['credits']
}) => {
  return credits && credits?.length > 0 ? (
    <Collapse label="Credits">
      {credits?.map((credit, idx) => (
        <Reference key={idx}>
          <Typography
            component="p"
            variant="body3"
            id={credit.id.replace('#', '')}
          >
            {credit.text}
          </Typography>
        </Reference>
      ))}
    </Collapse>
  ) : null
}

const Reference = styled.div`
  display: flex;
  padding: 8px 14px;
  gap: 8px;
`

export default EpisodeCredits
