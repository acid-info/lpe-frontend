import { SunIcon } from '@/components/Icons/SunIcon'
import { MoonIcon } from '@/components/Icons/MoonIcon'
import { Button, IconButton } from '@acid-info/lsd-react'
import React from 'react'
import { ThemeState } from '@/states/themeState'
interface Props {
  toggle: () => void
  mode?: ThemeState['mode']
}

export const ThemeSwitch = ({ toggle, mode }: Props) => {
  return (
    <IconButton size="small" onClick={() => toggle()}>
      {mode === 'light' ? (
        <MoonIcon color="primary" />
      ) : (
        <SunIcon color="primary" />
      )}
    </IconButton>
  )
}
export const ThemeSwitchWithLabel = ({ toggle, mode }: Props) => {
  return (
    <Button
      icon={
        mode === 'light' ? (
          <MoonIcon color="primary" />
        ) : (
          <SunIcon color="primary" />
        )
      }
      size="small"
      variant="outlined"
      onClick={toggle}
    >
      {mode === 'light' ? 'Dark mode' : 'Light mode'}
    </Button>
  )
}
