import { hookstate, State, useHookstate } from '@hookstate/core'
import { useRef } from 'react'
import { copyConfigs } from '../../configs/copy.configs'

export type NavbarState = {
  title: string
  showTitle: boolean
  showSearchButton: boolean
  onSearch: (() => void) | null
}

export const defaultNavbarState: NavbarState = {
  showTitle: true,
  title: copyConfigs.navbar.title,
  onSearch: null,
  showSearchButton: true,
}

const navbarState = hookstate<NavbarState>(defaultNavbarState)

const wrapThemeState = (state: State<NavbarState>) => ({
  state,
  title: state.title,
  showTitle: state.showTitle,
  onSearch: state.get({ noproxy: true }).onSearch,
  showSearchButton: state.showSearchButton,
  setShowTitle: (value: boolean) => state.showTitle.set(value),
  setShowSearchButton: (value: boolean) => state.showSearchButton.set(value),
  setOnSearchCallback: (callback: (() => void) | null) =>
    state.set((current) => ({ ...current, onSearch: callback })),
})

export const useNavbarState = (defaultState?: Partial<NavbarState>) => {
  const initialized = useRef<boolean>(false)
  const state = useHookstate(navbarState)

  if (defaultState && !initialized.current) {
    state.set((value) => ({
      ...value,
      ...(defaultState ?? {}),
    }))
    initialized.current = true
  }

  return wrapThemeState(state)
}

export default useNavbarState
