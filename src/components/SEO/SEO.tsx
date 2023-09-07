import Head from 'next/head'
import { siteConfigs } from '../../configs/site.configs'
import { LPE } from '../../types/lpe.types'

type Metadata = {
  title?: string
  description?: string
  type?: string
  locale?: string
  site_name?: string
  pageURL?: string
  imageUrl?: string
  image?: LPE.Image.Document | null
  tags?: string[]
  pagePath?: string
  date?: string | null
  contentType?: LPE.PostType
  noIndex?: boolean
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://press.logos.co'

export default function SEO({
  title: _title,
  description: _description,
  type,
  locale,
  site_name,
  pageURL,
  imageUrl = `${SITE_URL}/api/og`,
  image,
  tags = siteConfigs.keywords,
  pagePath = '',
  date,
  contentType,
  noIndex = false,
}: Metadata) {
  const ogSearchParams = new URLSearchParams()

  const title =
    _title && _title.length
      ? `${_title} - ${siteConfigs.title}`
      : siteConfigs.title
  const description = _description || siteConfigs.description

  title && ogSearchParams.set('title', title)
  image?.url && ogSearchParams.set('image', image?.url || '')
  image?.alt && ogSearchParams.set('alt', image?.alt || '')
  contentType && ogSearchParams.set('contentType', contentType)
  date && ogSearchParams.set('date', date || '')
  pagePath && ogSearchParams.set('pagePath', pagePath || '')

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
      <meta property="og:site_name" content={site_name ?? siteConfigs.title} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:image" content={ogUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageURL ?? `${SITE_URL}${pagePath}`} />
      <meta name="twitter:site" content={`@${siteConfigs.xHandle}`} />
      <meta property="twitter:image" content={ogUrl} />
      <link rel="canonical" href={`${SITE_URL}${pagePath}`} />
      {noIndex && (
        <>
          <meta name="robots" content="noindex, nofollow" />
        </>
      )}
    </Head>
  )
}
