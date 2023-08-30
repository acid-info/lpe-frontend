import { MoonIcon } from '@/components/Icons/MoonIcon'
import { SunIcon } from '@/components/Icons/SunIcon'
import { ThemeState } from '@/states/themeState'
import { Button, IconButton } from '@acid-info/lsd-react'
interface Props {
  toggle: () => void
  mode?: ThemeState['mode']
}

export const ThemeSwitch = ({ toggle, mode }: Props) => {
  return (
    <IconButton size="small" onClick={() => toggle()}>
      <MoonIcon color="primary" className="dark-mode-hidden" />
      <SunIcon color="primary" className="light-mode-hidden" />
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
