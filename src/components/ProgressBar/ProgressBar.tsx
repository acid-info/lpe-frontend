import useIsDarkState from '@/states/isDarkState/isDarkState'
import { defaultThemes } from '@acid-info/lsd-react'
import NextNProgress from 'nextjs-progressbar'
import { useCallback, useEffect, useState } from 'react'

export const ProgressBar = () => {
  const isDark = useIsDarkState().get()

  const getColor = useCallback(() => {
    if (isDark) {
      return `rgb(${defaultThemes.dark.palette.primary})`
    } else {
      return `rgb(${defaultThemes.dark.palette.secondary})`
    }
  }, [isDark])

  const [color, setColor] = useState(getColor())
  useEffect(() => setColor(getColor()), [isDark, getColor])

  return (
    <NextNProgress
      color={color}
      height={1}
      options={{
        showSpinner: false,
      }}
    />
  )
}
