import useIsDarkState from '@/states/isDarkState/isDarkState'
import { defaultThemes, ThemeProvider } from '@acid-info/lsd-react'
import { css, Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { uiConfigs } from '@/configs/ui.configs'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function App({ Component, pageProps }: AppProps) {
  const isDark = useIsDarkState().get()

  //TODO: fix this
  //@ts-ignore
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <ThemeProvider theme={isDark ? defaultThemes.dark : defaultThemes.light}>
      <Head>
        <title>Acid</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Global
        styles={css`
          html,
          body {
            background: rgb(var(--lsd-surface-primary));
            margin: 0;
            width: 100%;
            height: 100%;
          }
          :root {
            --lpe-nav-rendered-height: ${uiConfigs.navbarRenderedHeight}px;
          }
        `}
      />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}
