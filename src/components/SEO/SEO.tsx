import Head from 'next/head'
import { LPE } from '../../types/lpe.types'

type Metadata = {
  title: string
  description: string
  type?: string
  locale?: string
  site_name?: string
  pageURL?: string
  imageUrl?: string
  image?: LPE.Image.Document | null
  tags?: string[]
  pagePath?: string
  date?: string | null
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://press.logos.co'

export default function SEO({
  title,
  description,
  type,
  locale,
  site_name,
  pageURL,
  imageUrl = `${SITE_URL}/api/og`,
  image,
  tags = ['Logos Press Engine', 'Logos Press', 'Logos'],
  pagePath = '',
  date,
}: Metadata) {
  const ogSearchParams = new URLSearchParams()

  title && ogSearchParams.set('title', title)
  image?.url && ogSearchParams.set('image', image?.url || '')
  image?.alt && ogSearchParams.set('alt', image?.alt || '')
  type && ogSearchParams.set('type', type || 'article')
  date && ogSearchParams.set('date', date || '')

  const ogUrl = `${imageUrl}?${ogSearchParams.toString()}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:locale" content={locale ?? 'en-US'} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type ?? 'website'} />
      <meta property="og:url" content={pageURL ?? `${SITE_URL}${pagePath}`} />
      <meta property="keywords" content={tags.join(', ')} />
      <meta
        property="og:site_name"
        content={site_name ?? 'Logos Press Engine'}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image ? (
        <meta property="og:image" content={ogUrl} />
      ) : (
        <meta property="og:image" content={ogUrl} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageURL ?? `${SITE_URL}${pagePath}`} />
      <meta name="twitter:site" content="@TWITTERHANDLE" />
      {image ? (
        <meta name="twitter:image" content={image.url} />
      ) : (
        <meta property="twitter:image" content={imageUrl} />
      )}
      <link rel="canonical" href={`${SITE_URL}${pagePath}`} />
    </Head>
  )
}
