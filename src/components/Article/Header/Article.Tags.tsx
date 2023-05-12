import { Tag } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

const ArticleTags = ({ tags }: { tags: string[] }) =>
  tags.length > 0 ? (
    <TagContainer>
      {tags.map((tag) => (
        <Tag size="small" disabled={false} key={tag}>
          {tag}
        </Tag>
      ))}
    </TagContainer>
  ) : null

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`

export default ArticleTags
