import {
  createTheme,
  CreateThemeProps,
  defaultThemes,
  Theme,
} from '@acid-info/lsd-react'
import { css } from '@emotion/react'
import { useMemo } from 'react'
import { useThemeState } from '../../states/themeState/theme.state'

const baseThemes = defaultThemes

const useThemeCssVars = (theme: Theme, colorMode: string) =>
  useMemo(
    () => css`
      [data-theme=${colorMode}] {
        ${theme.cssVars}
      }

      [data-font-family='sans-serif'] {
        --lsd-typography-generic-font-family: sans-serif;
      }

      [data-font-family='serif'] {
        --lsd-typography-generic-font-family: serif;
      }

      [data-font-family='monospace'] {
        --lsd-typography-generic-font-family: monospace;
      }
    `,
    [theme],
  )

export const useLSDTheme = () => {
  const { genericFontFamily, mode } = useThemeState().get()

  const themes = useMemo(() => {
    const options: CreateThemeProps = {
      breakpoints: {
        sm: {
          width: 768,
        },
        md: {
          width: 1024,
        },
        lg: {
          width: 1280,
        },
        xl: {
          width: 1440,
        },
      },
      palette: {},
      typography: {},
      typographyGlobal: {
        genericFontFamily: genericFontFamily,
      },
    }

    return {
      light: createTheme(options, baseThemes.light),
      dark: createTheme(options, baseThemes.dark),
    }
  }, [baseThemes, genericFontFamily])

  return {
    dark: themes.dark,
    light: themes.light,
    current: themes[mode],
    lightCssVars: useThemeCssVars(themes.light, 'light'),
    darkCssVars: useThemeCssVars(themes.dark, 'dark'),
  }
}
