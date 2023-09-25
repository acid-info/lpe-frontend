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
      <LightBox caption={image.alt}>
        <ResponsiveImage data={image} />
      </LightBox>
    </Container>
  )
}

const Container = styled.figure`
  margin: 32px 0 32px 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'down')} {
    margin: 24px 0 24px 0;
  }
`
