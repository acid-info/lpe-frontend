import React from 'react'
import Image from 'next/image'
import { UnbodyImageBlock } from '@/lib/unbody/unbody.types'
import Imgix from 'react-imgix'

type Props = {
  data: UnbodyImageBlock
}

export const ResponsiveImage = ({ data }: Props) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: `${(data.height / data.width) * 100}%`,
      }}
    >
      <Imgix src={data.url} />
    </div>
  )
}
