import styled from '@emotion/styled'

type Props = {
  top?: number
  bottom?: number
}

const EpisodeDivider = ({ top = 32, bottom = 32 }: Props) => {
  return <Divder top={top} bottom={bottom} />
}

const Divder = styled.hr<{ top: number; bottom: number }>`
  margin-top: ${({ top }) => top}px;
  margin-bottom: ${({ bottom }) => bottom}px;
  height: 1px;
  width: 100%;
  color: rgb(var(--lsd-border-primary));
`

export default EpisodeDivider
