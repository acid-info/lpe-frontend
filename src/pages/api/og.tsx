import { siteConfigs } from '@/configs/site.configs'
import { LPE } from '@/types/lpe.types'
import { ImageResponse } from '@vercel/og'
import { handleMethodNotAllowedResponse } from 'next/dist/server/future/route-modules/helpers/response-handlers'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

// Doc: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-examples#using-a-local-image
// Font: https://vercel.com/docs/functions/edge-functions/og-image-generation/og-image-examples#using-a-custom-font
export default async function handler(request: NextRequest) {
  const lora = await fetch(
    new URL('../../../assets/Lora-Regular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  const inter = await fetch(
    new URL('../../../assets/Inter-Regular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  const searchParams = new URLSearchParams(
    decodeURIComponent(request.nextUrl.searchParams.get('q') || ''),
  )
  const contentType = searchParams.get('contentType')
  const title =
    contentType == null
      ? siteConfigs.heroTitle.join('')
      : searchParams.get('title')
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

  const isArticle = contentType === 'article'
  const titleFontSize = isArticle && hasImage ? '54px' : '64px'
  const subtitleFontSize = isArticle && hasImage ? '32px' : '36px'
  const subtitleGap = isArticle && hasImage ? '16px' : '24px'
  const subtitleMargin = isArticle && hasImage ? '24px' : '40px'

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
          alignItems: 'center',
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
            padding: '56px 48px',
            justifyContent: 'space-between',
            height: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              gap: '0',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isArticle ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M31.5672 32.3016H8.88892V18.5133H31.5458L31.5672 32.3016ZM20.203 19.6195C18.2674 19.6214 16.3622 20.0945 14.6565 20.9967C12.9509 21.8988 11.4975 23.2022 10.4256 24.791C10.2838 24.9524 10.2057 25.1587 10.2057 25.3722C10.2057 25.5857 10.2838 25.7921 10.4256 25.9535C11.5044 27.535 12.9605 28.8313 14.6661 29.7287C16.3716 30.6262 18.2745 31.0973 20.2078 31.1008C22.1411 31.1043 24.0458 30.64 25.7547 29.7487C27.4635 28.8574 28.9244 27.5663 30.0091 25.9887C30.1638 25.8182 30.2493 25.5975 30.2493 25.3687C30.2493 25.1399 30.1638 24.9192 30.0091 24.7487C28.9273 23.1664 27.4667 21.8712 25.7564 20.9778C24.046 20.0844 22.1387 19.6203 20.203 19.6265V19.6195Z"
                  fill="white"
                />
                <path
                  d="M20.2674 17.2239C18.3441 17.2201 16.4504 16.7566 14.7488 15.8731C13.0471 14.9895 11.5882 13.7124 10.4971 12.1511C10.3151 11.9603 10.2139 11.7083 10.2139 11.4465C10.2139 11.1847 10.3151 10.9327 10.4971 10.7419C11.5875 9.18345 13.0474 7.91088 14.75 7.03475C16.4526 6.15862 18.3463 5.7054 20.2669 5.71443C22.1874 5.72345 24.0768 6.19446 25.7708 7.08655C27.4648 7.97864 28.9123 9.26485 29.9877 10.8335C30.1419 11.0029 30.2271 11.2224 30.2271 11.45C30.2271 11.6776 30.1419 11.8971 29.9877 12.0665C28.9136 13.6392 27.4674 14.9305 25.7739 15.8291C24.0804 16.7276 22.1905 17.2063 20.2674 17.2239ZM24.4986 11.5169C24.5184 10.6769 24.2839 9.85012 23.825 9.14208C23.366 8.43404 22.7034 7.8769 21.9218 7.54176C21.1402 7.20662 20.2749 7.10869 19.4366 7.2605C18.5983 7.4123 17.8248 7.80695 17.215 8.39404C16.6052 8.98113 16.1868 9.73404 16.013 10.5566C15.8393 11.3793 15.9182 12.2342 16.2396 13.0124C16.561 13.7907 17.1104 14.4568 17.8176 14.9258C18.5249 15.3948 19.3578 15.6455 20.2102 15.6457C21.3304 15.646 22.4063 15.2142 23.2077 14.4426C24.0091 13.671 24.4724 12.6209 24.4986 11.5169Z"
                  fill="white"
                />
                <path
                  d="M20.2243 29.5325C19.3932 29.5187 18.5847 29.2629 17.9006 28.7975C17.2164 28.332 16.6871 27.6777 16.3791 26.9166C16.0711 26.1554 15.9981 25.3216 16.1694 24.5197C16.3406 23.7179 16.7485 22.9838 17.3417 22.4098C17.9349 21.8357 18.687 21.4473 19.5034 21.2933C20.3199 21.1394 21.1643 21.2267 21.9305 21.5444C22.6968 21.862 23.3507 22.3959 23.8101 23.0788C24.2695 23.7617 24.514 24.5632 24.5127 25.3827C24.5108 25.9337 24.3981 26.4788 24.181 26.9866C23.9638 27.4943 23.6466 27.9545 23.2477 28.3405C22.8489 28.7265 22.3762 29.0307 21.8572 29.2353C21.3382 29.4399 20.7832 29.5409 20.2243 29.5325Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                width="35"
                height="40"
                viewBox="0 0 35 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
            )}
            {contentType === 'article' && (
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Lora',
                  fontSize: '40px',
                  whiteSpace: 'pre-wrap',
                  textTransform: 'uppercase',
                  paddingLeft: '13px',
                }}
              >
                <span>{siteConfigs.title.replace('Logos ', '')}</span>
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              gap: subtitleMargin,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Lora',
                fontSize: titleFontSize,
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
                gap: subtitleGap,
                fontSize: subtitleFontSize,
                alignItems: 'center',
                textTransform: 'capitalize',
                fontFamily: 'Inter',
              }}
            >
              <span>
                {contentType ??
                  pagePath.replace(/^\/+/, '').replace(/\/+/, ' | ')}
              </span>
              {date && <span>∙</span>}
              {date && <span>{`${day} ${month} ${year}`}</span>}
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
