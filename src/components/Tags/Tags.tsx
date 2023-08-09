import { Tag } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Tags = ({ tags, className }: { tags: string[]; className?: string }) => {
  const router = useRouter()
  const { query } = router
  const { topics } = query

  return tags.length > 0 ? (
    <TagsContainer className={className}>
      {tags.map((tag, idx) => (
        <Link key={`tag-${idx}`} href={`/search?topics=${tag}`}>
          <Tag
            size="small"
            disabled={false}
            variant={topics?.includes(tag) ? 'filled' : 'outlined'}
          >
            {tag}
          </Tag>
        </Link>
      ))}
    </TagsContainer>
  ) : null
}

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  a {
    text-decoration: none;
  }
`

export default Tags
