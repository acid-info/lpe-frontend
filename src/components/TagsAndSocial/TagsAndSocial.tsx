import styled from '@emotion/styled'
import { useMemo } from 'react'
import { lsdUtils } from '../../utils/lsd.utils'
import { parsePostUrl } from '../../utils/route.utils'
import { ShareButton } from '../ShareButton'
import { Tags } from '../Tags'

export type TagsProps = {
  tags: string[]
  className?: string
}

const TagsAndSocial: React.FC<TagsProps> = ({ tags, className }) => {
  const postUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''

    const link = parsePostUrl(window.location.href)
    if (!link) return window.location.href

    const url = new URL(window.location.href)

    url.hash = ''
    url.searchParams.forEach((_value, key) => {
      url.searchParams.delete(key)
    })

    if (link.id) {
      url.pathname = `/preview`
      url.searchParams.set('id', link.id)
    }

    return url.toString()
  }, [])

  return (
    <Container>
      {tags && <CustomTags tags={tags} className={className} />}
      <VerticalLine />
      <ShareButton url={postUrl} />
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
