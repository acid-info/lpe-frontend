import styled from '@emotion/styled'
import { ShareButton } from '../ShareButton'
import { Tags } from '../Tags'

export type TagsProps = {
  tags: string[]
  className?: string
}

const TagsAndSocial: React.FC<TagsProps> = ({ tags, className }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <Container>
      {tags && <Tags tags={tags} className={className} />}
      <VerticalLine />
      <ShareButton url={currentUrl} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
`

const VerticalLine = styled.div`
  height: 12px;
  border-left: 1px solid rgb(var(--lsd-border-primary));
`

export default TagsAndSocial
