import { Collapse } from '@/components/Collapse'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'

const ArticleFootnotes = ({
  footnotes,
}: {
  footnotes: LPE.Article.Footnotes
}) =>
  footnotes.length > 0 ? (
    <Collapse label="Footenotes">
      {footnotes.map((footnote, idx) => (
        <Reference key={idx}>
          <Typography
            component="a"
            variant="body3"
            href={`#${footnote.refId}`}
            id={'fnt-' + footnote.id}
          >
            {footnote.refValue}
          </Typography>
          <p dangerouslySetInnerHTML={{ __html: footnote.valueHTML }} />
        </Reference>
      ))}
    </Collapse>
  ) : null

const Reference = styled.div`
  display: flex;
  padding: 8px 14px;
  gap: 8px;
`

export default ArticleFootnotes
