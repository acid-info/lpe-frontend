import { nope } from '@/utils/general.utils'
import { Tag, TagProps } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

type FilterTagsProps = {
  tags: string[]
  selectedTags: string[]
  size?: TagProps['size']
  onTagClick?: (tag: string) => void
}

export default function FilterTags(props: FilterTagsProps) {
  const { size = 'small', tags = [], onTagClick = nope, selectedTags } = props

  return (
    <Container>
      <Tags>
        {tags.map((tag, index) => (
          <Tag
            size={size}
            disabled={false}
            key={index}
            onClick={() => onTagClick(tag)}
            variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
          >
            {tag}
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
  flex-wrap: wrap;

  min-height: 24px;

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
    overflow: hidden;
    max-width: 200px;

    span {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md.width}px) {
    justify-content: center;
  }
`
