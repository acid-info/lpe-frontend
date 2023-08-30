import { LPE } from '@/types/lpe.types'
import { ImageResponse } from '@vercel/og'
import { handleMethodNotAllowedResponse } from 'next/dist/server/future/route-modules/helpers/response-handlers'
import { NextRequest } from 'next/server'
import { siteConfigs } from '@/configs/site.configs'

export const config = {
  runtime: 'edge',
}

// Doc: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-examples#using-a-local-image
// Font: https://vercel.com/docs/functions/edge-functions/og-image-generation/og-image-examples#using-a-custom-font
export default async function handler(request: NextRequest) {
  const { href } = request.nextUrl

  const lora = await fetch(
    new URL('../../../assets/Lora-Regular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  const inter = await fetch(
    new URL('../../../assets/Inter-Regular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  const searchParams = new URL(href).searchParams
  const contentType = searchParams.get('contentType')
  const title =
    contentType == null ? 'LOGOS→PRESS ENGINE' : searchParams.get('title')
  const image = searchParams.get('image') || ''
  const alt = searchParams.get('alt') || ''
  const pagePath = searchParams.get('pagePath') || 'press.logos.co'
  const date = searchParams.get('date')

  const imgSrc = image
  const hasImage = !!imgSrc?.length

  const day = date && new Date(date).getUTCDate()
  const month =
    date && new Date(date).toLocaleString('default', { month: 'short' })
  const year = date && new Date(date).getUTCFullYear()

  const titleMaxLength = 66

  return new ImageResponse(
    contentType === LPE.PostTypes.Podcast ? (
      <img
        src={imgSrc}
        alt={alt}
        style={{
          width: '1200px',
          height: '630px',
          objectFit: 'contain',
          backgroundColor: '#000',
        }}
      />
    ) : (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          backgroundColor: '#000',
          color: '#fff',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: hasImage ? '600px' : '100%',
            padding: '48px',
            justifyContent: 'space-between',
            height: '100%',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex' }}>
            <svg
              width="35"
              height="40"
              viewBox="0 0 35 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', top: '0px', left: '0px' }}
            >
              <path
                d="M34.5255 40H0V19.2558H34.4929L34.5255 40ZM17.2247 20.92C14.2778 20.923 11.3773 21.6347 8.78061 22.992C6.18391 24.3493 3.97138 26.3101 2.33942 28.7004C2.12351 28.9432 2.00466 29.2537 2.00466 29.5749C2.00466 29.8961 2.12351 30.2066 2.33942 30.4494C3.98188 32.8287 6.19861 34.779 8.79515 36.1292C11.3917 37.4794 14.2887 38.1882 17.232 38.1934C20.1753 38.1986 23.0749 37.5001 25.6765 36.1592C28.2781 34.8183 30.5021 32.8759 32.1535 30.5024C32.389 30.2459 32.5192 29.9138 32.5192 29.5696C32.5192 29.2254 32.389 28.8933 32.1535 28.6368C30.5066 26.2562 28.2829 24.3077 25.6791 22.9636C23.0752 21.6195 20.1715 20.9213 17.2247 20.9306V20.92Z"
                fill="white"
              />
              <path
                d="M17.3226 17.316C14.3946 17.3103 11.5117 16.6129 8.92106 15.2837C6.33041 13.9544 4.10934 12.033 2.44826 9.68399C2.1713 9.39698 2.01711 9.0179 2.01711 8.62399C2.01711 8.23008 2.1713 7.85099 2.44826 7.56399C4.10841 5.21927 6.33096 3.30472 8.92295 1.9866C11.5149 0.668479 14.398 -0.0133796 17.3219 0.000198897C20.2458 0.0137774 23.122 0.722393 25.701 2.06453C28.28 3.40666 30.4837 5.34173 32.1208 7.70176C32.3556 7.95657 32.4854 8.28688 32.4854 8.62926C32.4854 8.97164 32.3556 9.30195 32.1208 9.55676C30.4857 11.9228 28.284 13.8656 25.7058 15.2175C23.1276 16.5693 20.2504 17.2895 17.3226 17.316ZM23.7642 8.72996C23.7945 7.46617 23.4375 6.22226 22.7388 5.15702C22.04 4.09179 21.0313 3.25359 19.8413 2.74938C18.6514 2.24517 17.3342 2.09784 16.0579 2.32623C14.7816 2.55461 13.6041 3.14835 12.6757 4.03161C11.7474 4.91488 11.1103 6.04761 10.8458 7.28521C10.5813 8.5228 10.7014 9.8091 11.1907 10.9799C11.6801 12.1507 12.5165 13.1529 13.5931 13.8585C14.6698 14.5642 15.9379 14.9412 17.2356 14.9416C18.941 14.942 20.5789 14.2924 21.799 13.1315C23.0191 11.9707 23.7244 10.3909 23.7642 8.72996Z"
                fill="white"
              />
              <path
                d="M17.2571 35.834C15.9917 35.8131 14.761 35.4284 13.7194 34.7281C12.6779 34.0279 11.872 33.0434 11.4031 31.8983C10.9342 30.7533 10.8231 29.4987 11.0838 28.2924C11.3446 27.086 11.9655 25.9816 12.8686 25.118C13.7717 24.2543 14.9167 23.67 16.1596 23.4383C17.4026 23.2067 18.6881 23.3381 19.8547 23.816C21.0212 24.2939 22.0167 25.0971 22.7161 26.1245C23.4156 27.1519 23.7876 28.3578 23.7857 29.5906C23.7829 30.4196 23.6113 31.2398 23.2807 32.0037C22.9501 32.7676 22.4672 33.4599 21.8599 34.0407C21.2527 34.6214 20.5332 35.079 19.743 35.3868C18.9529 35.6946 18.1079 35.8466 17.2571 35.834Z"
                fill="white"
              />
            </svg>
            {contentType === 'article' && (
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Lora',
                  fontSize: '40px',
                  whiteSpace: 'pre-wrap',
                  paddingLeft: '40px',
                  textTransform: 'uppercase',
                }}
              >
                {siteConfigs.title.replace('Logos', '')}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Lora',
                fontSize: '64px',
                lineHeight: '115%',
                whiteSpace: 'pre-wrap',
              }}
            >
              {title && title.length < titleMaxLength
                ? title
                : title?.substring(0, titleMaxLength) + '...'}
            </div>
            <div
              style={{
                display: 'flex',
                gap: '24px',
                fontSize: '36px',
                alignItems: 'center',
                textTransform: 'capitalize',
                fontFamily: 'Inter',
              }}
            >
              <p>
                {contentType ??
                  pagePath.replace(/^\/+/, '').replace(/\/+/, ' | ')}
              </p>
              {date && <p>∙</p>}
              {date && <p>{`${day} ${month} ${year}`}</p>}
            </div>
          </div>
        </div>
        {imgSrc && (
          <div style={{ display: 'flex', width: '600px', height: '630px' }}>
            <img
              src={imgSrc}
              alt={alt}
              style={{
                filter: 'grayscale(100%)',
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Lora',
          data: lora,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: inter,
          style: 'normal',
        },
      ],
    },
  )
}
handleMethodNotAllowedResponse()
