import { addTopicsToQuery } from '@/utils/search.utils'
import { Tag } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

const Tags = ({ tags }: { tags: string[] }) => {
  const router = useRouter()

  const onTagClick = (e: React.MouseEvent<HTMLElement>, tag: string) => {
    e.preventDefault()
    router.push(
      {
        pathname: '/search',
        query: {
          ...addTopicsToQuery([tag]),
        },
      },
      undefined,
      { shallow: true },
    )
  }

  return tags.length > 0 ? (
    <TagContainer>
      {tags.map((tag) => (
        <Tag
          onClick={(e) => onTagClick(e, tag)}
          size="small"
          disabled={false}
          key={tag}
        >
          {tag}
        </Tag>
      ))}
    </TagContainer>
  ) : null
}

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
`

export default Tags
