import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}

const image = fetch(new URL('public/og.png', import.meta.url)).then((res) =>
  res.arrayBuffer(),
)

// Doc: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-examples#using-a-local-image
export default async function handler() {
  const imageData = await image
  const blob = new Blob([imageData])
  // Doc has type error
  const srcBlob = URL.createObjectURL(blob)

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img width="1200" height="630" src={srcBlob} alt="og-image" />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
