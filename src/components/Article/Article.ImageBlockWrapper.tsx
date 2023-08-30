import { lsdUtils } from '@/utils/lsd.utils'
import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'

type Props = {
  image: LPE.Image.Document
  order: number
}

export const ArticleImageBlockWrapper = ({ image, order }: Props) => {
  return (
    <Container id={`i-${order}`}>
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
