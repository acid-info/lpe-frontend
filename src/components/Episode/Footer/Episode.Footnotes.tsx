import { cleanUpUrlsInRawHtml } from '@/utils/string.utils'
import { Collapse, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { LPE } from '../../../types/lpe.types'

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
        <Footnotes>
          {footnotes.map((footnote, idx) => (
            <Footnote key={idx}>
              <Typography
                component="a"
                variant="label1"
                href={`#${footnote.refId}`}
                target="_blank"
                id={footnote.id.replace('#', '')}
              >
                {footnote.refValue.replace('[', '').replace(']', '')}.
              </Typography>
              <FootNoteText
                variant="label1"
                dangerouslySetInnerHTML={{
                  __html: cleanUpUrlsInRawHtml(footnote.valueHTML.trim()),
                }}
              />
            </Footnote>
          ))}
        </Footnotes>
      </Collapse>
    </Container>
  ) : null
}

const FootNoteText = styled(Typography)`
  line-height: var(--lsd-body2-lineHeight);
`

const Container = styled.div`
  margin-bottom: 32px;
  margin-top: -1px;

  button {
    width: 100% !important;
  }
`

const Footnotes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--lsd-body3-lineHeight);
  padding: 12px 14px;
`

const Footnote = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: start;
  gap: 3px;
  > a:first-of-type {
    text-decoration: none;
    a:hover {
      text-decoration: underline;
    }
  }
`

const P = styled.p`
  font-size: var(--lsd-body3-fontSize);
`

export default EpisodeFootnotes
