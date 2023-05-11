import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

type Props = {
  title: string
  author: string
}

const ContentBlockBody = ({ title, author }: Props) => {
  return (
    <BlockBodyContainer>
      <Typography variant="body1" component="div" genericFontFamily="serif">
        {title}
      </Typography>
      <Typography
        variant="body3"
        component="div"
        genericFontFamily="sans-serif"
      >
        {author}
      </Typography>
    </BlockBodyContainer>
  )
}

const BlockBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default ContentBlockBody
