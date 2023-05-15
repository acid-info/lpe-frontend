import { Tag } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { nope } from '@/utils/general.utils'
import Link from 'next/link'

type FilterTagsProps = {
  tags: string[]
  selectedTags: string[]
  onTagClick?: (tag: string) => void
}

export default function FilterTags(props: FilterTagsProps) {
  const { tags = [], onTagClick = nope, selectedTags } = props
  return (
    <Container>
      <Tags>
        {tags.map((tag, index) => (
          <Tag
            size="small"
            disabled={false}
            key={index}
            onClick={() => onTagClick(tag)}
            variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
          >
            <Link href={`/search?topics=${tag}`}>{tag}</Link>
          </Tag>
        ))}
      </Tags>
    </Container>
  )
}

const Container = styled.div`
  max-width: 100%;
`

const Tags = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-right: 14px;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  > *:first-child {
    margin-left: 14px;
  }

  > * {
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    > *:first-child {
      margin-left: 16px;
    }

    padding-right: 16px;
  }

  a {
    text-decoration: none;
  }
`
