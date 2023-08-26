import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { LPETag } from '@/components/LPETag'

export type TagsProps = React.ComponentProps<typeof TagsContainer> & {
  tags: string[]
}

const Tags: React.FC<TagsProps> = ({ tags, className, ...props }) => {
  const router = useRouter()
  const { query } = router
  const { topics } = query

  return tags?.length > 0 ? (
    <TagsContainer className={className} {...props}>
      {tags.map((tag, idx) => (
        <LPETag
          tag={tag}
          key={`tag-${idx}`}
          LSDProps={{
            variant: topics?.includes(tag) ? 'filled' : 'outlined',
          }}
        />
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
