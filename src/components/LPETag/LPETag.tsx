import Link from 'next/link'
import { Tag } from '@acid-info/lsd-react'
import { formatTagText } from '@/utils/string.utils'
import { TagProps } from '@acid-info/lsd-react/dist/components/Tag/Tag'
import styled from '@emotion/styled'

interface Props {
  tag: string
  LSDProps?: TagProps
}
const LPETag = ({ tag, LSDProps = {} }: Props) => {
  return (
    <Container href={`/search?topic=${tag}`}>
      <Tag size="small" variant={'outlined'} {...LSDProps}>
        {formatTagText(tag)}
      </Tag>
    </Container>
  )
}

const Container = styled(Link)`
  text-decoration: none;
  text-transform: capitalize;
  &:hover {
    text-decoration: underline;
  }
`
export default LPETag
