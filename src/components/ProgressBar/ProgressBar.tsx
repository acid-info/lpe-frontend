import useIsDarkState from '@/states/isDarkState/isDarkState'
import { defaultThemes } from '@acid-info/lsd-react'
import NextNProgress from 'nextjs-progressbar'
import { useEffect, useState } from 'react'

export const ProgressBar = () => {
  const isDark = useIsDarkState().get()

  const getColor = () => {
    if (isDark) {
      return `rgb(${defaultThemes.dark.palette.primary})`
    } else {
      return `rgb(${defaultThemes.dark.palette.secondary})`
    }
  }

  const [color, setColor] = useState(getColor())
  useEffect(() => setColor(getColor()), [isDark])

  return (
    <NextNProgress
      color={color}
      height={1}
      showOnShallow={true}
      options={{
        showSpinner: false,
      }}
    />
  )
}
