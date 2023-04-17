import { HeaderLayout } from '@/layouts/HeaderLayout'
import Head from 'next/head'
export default function Home() {
  return (
    <>
      <Head>
        <title>Logos Press Engine</title>
        <meta name="description" content="Blog with media written by Logos members" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeaderLayout />
      </main>
    </>
  )
}
