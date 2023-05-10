import Head from 'next/head'

type Metadata = {
  title: string
  description: string
  type?: string
  locale?: string
  site_name?: string
  pageURL?: string
  imageUrl?: string
}

export default function SEO({
  title,
  description,
  type,
  locale,
  site_name,
  pageURL,
  imageUrl,
}: Metadata) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:locale" content={locale ?? 'en-US'} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type ?? 'website'} />
      <meta property="og:url" content={pageURL ?? 'https://press.logos.co'} />
      <meta
        property="og:site_name"
        content={site_name ?? 'Logos Press Engine'}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://press.logos.co" />
      <meta name="twitter:site" content="@TWITTERHANDLE" />
      {imageUrl && <meta property="twitter:image" content={imageUrl} />}
    </Head>
  )
}
