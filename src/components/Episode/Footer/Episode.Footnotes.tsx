import { Collapse, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'
import { useState } from 'react'

const EpisodeFootnotes = ({
  footnotes,
}: {
  footnotes: LPE.Article.Footnotes
}) => {
  const [open, setOpen] = useState(true)

  return footnotes.length > 0 ? (
    <Container>
      <Collapse
        label="References"
        open={open}
        onChange={() => setOpen((prev) => !prev)}
      >
        {footnotes.map((footnote, idx) => (
          <Reference key={idx}>
            <Typography
              component="a"
              variant="body3"
              href={`#${footnote.refId}`}
              target="_blank"
              id={footnote.id.replace('#', '')}
            >
              {footnote.refValue}
            </Typography>
            <P dangerouslySetInnerHTML={{ __html: footnote.valueHTML }} />
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
  align-items: center;
  padding: 8px 14px;
  gap: 8px;
`

const P = styled.p`
  font-size: var(--lsd-body3-fontSize);
`

export default EpisodeFootnotes
