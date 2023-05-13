import { Tag } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

const Tags = ({ tags }: { tags: string[] }) =>
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
`

export default Tags
