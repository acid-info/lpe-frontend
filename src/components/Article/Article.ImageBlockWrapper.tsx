import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'
import { lsdUtils } from '@/utils/lsd.utils'

type Props = {
  image: LPE.Image.Document
}

export const ArticleImageBlockWrapper = ({ image }: Props) => {
  return (
    <Container>
      <ResponsiveImage data={image} />
      <figcaption>{image.alt}</figcaption>
    </Container>
  )
}

const Container = styled.figure`
  margin: 0;
  padding: 0;
  figcaption {
    padding-top: 8px;
    ${lsdUtils.typography('body3')}
  }
`
