import styled from '@emotion/styled'
import { lsdUtils } from '../../utils/lsd.utils'
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
      {tags && <CustomTags tags={tags} className={className} />}
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

  ${(props) => lsdUtils.breakpoint(props.theme, 'md', 'down')} {
    align-items: flex-start;
  }
`

const CustomTags = styled(Tags)`
  > * {
    flex-shrink: 0;
  }
`

const VerticalLine = styled.div`
  height: 12px;
  border-left: 1px solid rgb(var(--lsd-border-primary));

  ${(props) => lsdUtils.breakpoint(props.theme, 'md', 'down')} {
    margin-top: 6px;
  }
`

export default TagsAndSocial
