import useIsDarkState from '@/states/isDarkState/isDarkState'
import { defaultThemes, ThemeProvider } from '@acid-info/lsd-react'
import { css, Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { uiConfigs } from '@/configs/ui.configs'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { ReactNode } from 'react'
import { NextComponentType, NextPageContext } from 'next'

type NextLayoutComponentType<P = {}> = NextComponentType<
  NextPageContext,
  any,
  P
> & {
  getLayout?: (page: ReactNode) => ReactNode
}

type AppLayoutProps<P = {}> = AppProps & {
  Component: NextLayoutComponentType
}

export default function App({ Component, pageProps }: AppLayoutProps) {
  const isDark = useIsDarkState().get()

  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <ThemeProvider theme={isDark ? defaultThemes.dark : defaultThemes.light}>
      <Head>
        <title>Acid</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta property="og:image" content="https://press.logos.co/api/og" />
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
