import React, { useState } from 'react'
import Image from 'next/image'
import { UnbodyImageBlock } from '@/lib/unbody/unbody.types'
import Imgix from 'react-imgix'
import styled from '@emotion/styled'
import { Blurhash } from 'react-blurhash'

type Props = {
  data: UnbodyImageBlock
  height?: number | string
}

export const ResponsiveImage = ({ data, height = '100%' }: Props) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Container
      style={{
        paddingTop: `calc(${data.height / data.width} * ${height})`,
      }}
    >
      <img src={`${data.url}?blur=10&w=10`} />
      {/*<Blurhash*/}
      {/*    hash={`e8I#x__3~qD%IU~q%MRQRjtQWB%M9FxuxuNG%MWBoLayof%Mt7Rj-;`}*/}
      {/*    width={"100%"}*/}
      {/*    height={"100%"}*/}
      {/*/>*/}
      <Imgix imgixParams={{ fit: 'clip' }} src={data.url} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  object-fit: cover;

  filter: grayscale(100%);
  transition: filter 0.1s ease-in-out;

  :hover {
    filter: grayscale(0%);
  }

  > * {
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    &:last-of-type {
      //opacity: 0.5;
      //&.loaded{
      //  opacity: 1;
      //}
    }
  }
`
