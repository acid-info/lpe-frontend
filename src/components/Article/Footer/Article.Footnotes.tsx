import { Collapse } from '@/components/Collapse'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

const ArticleFootnotes = ({
  footnotes,
}: {
  footnotes: UnbodyGraphQl.Fragments.FootnoteItem[]
}) =>
  footnotes.length > 0 ? (
    <Collapse label="Footenotes">
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
