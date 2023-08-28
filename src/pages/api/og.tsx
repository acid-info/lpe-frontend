import { ImageResponse } from '@vercel/og'
import { handleMethodNotAllowedResponse } from 'next/dist/server/future/route-modules/helpers/response-handlers'

export const config = {
  runtime: 'edge',
}

// Doc: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-examples#using-a-local-image
export default async function handler() {
  const image = fetch(new URL('public/og.png', import.meta.url)).then((res) =>
    res.arrayBuffer(),
  )

  const imageData = await image

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
        <img
          width="1200"
          height="630"
          alt="og-image"
          src={imageData as any as string}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
handleMethodNotAllowedResponse()
