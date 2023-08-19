import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'

type Props = {
  image: LPE.Image.Document
}

export const ArticleImageBlockWrapper = ({ image }: Props) => {
  return (
    <Container>
      <ResponsiveImage data={image} />
    </Container>
  )
}

const Container = styled.div``
