import useIsDarkState from "@/states/isDarkState/isDarkState";
import { defaultThemes, ThemeProvider } from "@acid-info/lsd-react";
import { css, Global } from "@emotion/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const isDark = useIsDarkState().get();

  return (
    <ThemeProvider theme={isDark ? defaultThemes.dark : defaultThemes.light}>
      <Component {...pageProps} />
      <Global
        styles={css`
          html,
          body {
            background: rgb(var(--lsd-surface-primary));
            margin: 0;
            width: 100%;
            height: 100%;
          }
        `}
      />
    </ThemeProvider>
  );
}
