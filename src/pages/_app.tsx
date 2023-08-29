import { GlobalAudioPlayer } from '@/components/GlobalAudioPlayer'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import { uiConfigs } from '@/configs/ui.configs'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { css, Global } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactNode } from 'react'
import { LSDThemeProvider } from '../containers/LSDThemeProvider'
import { useHydrated } from '../utils/useHydrated.util'

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

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppLayoutProps) {
  const hydrated = useHydrated()

  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <LSDThemeProvider>
      <Head>
        <title>Logos Press Engine</title>
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

            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          #__next {
            max-width: ${uiConfigs.maxContainerWidth}px;
            margin-left: auto;
            margin-right: auto;
          }

          :root {
            --lpe-nav-rendered-height: ${uiConfigs.navbarRenderedHeight}px;
            --lpe-article-rendered-margin-top: ${uiConfigs.articleRenderedMT}px;
          }

          a,
          a:visited,
          a:hover,
          a:active,
          a:focus {
            color: rgb(var(--lsd-text-primary));
          }

          .anchor {
            margin-top: calc(-1 * var(--lpe-article-rendered-margin-top));
            padding-bottom: var(--lpe-article-rendered-margin-top);
            margin-bottom: -16px;
            display: block;
            height: 0;
            opacity: 0;
            z-index: -1;
          }

          [data-theme='light'] {
            .light-mode-hidden {
              display: none !important;
            }
          }

          [data-theme='dark'] {
            .dark-mode-hidden {
              display: none !important;
            }
          }

          .lsd-dropdown-menu {
            z-index: 99;
          }
          .lsd-dropdown-item__label {
            text-transform: capitalize;
          }
        `}
      />
      <QueryClientProvider client={queryClient}>
        <ProgressBar />
        {getLayout(<Component {...pageProps} />)}
        {hydrated && <GlobalAudioPlayer />}
      </QueryClientProvider>
    </LSDThemeProvider>
  )
}
