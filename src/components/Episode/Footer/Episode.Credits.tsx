import { Collapse, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'
import { useState } from 'react'

const EpisodeCredits = ({
  credits,
}: {
  credits: LPE.Podcast.Document['credits']
}) => {
  const [open, setOpen] = useState(true)

  return credits && credits?.length > 0 ? (
    <Container>
      <Collapse
        label="Credits"
        open={open}
        onChange={() => setOpen((prev) => !prev)}
      >
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
    </Container>
  ) : null
}

const Container = styled.div`
  margin-bottom: 32px;

  button {
    width: 100% !important;
  }
`

const Reference = styled.div`
  display: flex;
  padding: 8px 14px;
  gap: 8px;
`

export default EpisodeCredits
