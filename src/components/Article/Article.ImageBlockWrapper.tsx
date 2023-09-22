import { lsdUtils } from '@/utils/lsd.utils'
import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { LightBox } from '../LightBox'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'

type Props = {
  image: LPE.Image.Document
  order: number
}

export const ArticleImageBlockWrapper = ({ image, order }: Props) => {
  return (
    <Container id={`i-${order}`}>
      <LightBox>
        <ResponsiveImage data={image} />
      </LightBox>
      <figcaption>{image.alt}</figcaption>
    </Container>
  )
}

const Container = styled.figure`
  margin: 32px 0 32px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  figcaption {
    padding-top: 8px;
    ${lsdUtils.typography('body3')}
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'down')} {
    margin: 24px 0 24px 0;
  }
`
