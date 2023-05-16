import { State, hookstate, useHookstate } from '@hookstate/core'

const isDarkState = hookstate(false)

const wrapIsDarkState = (state: State<boolean>) => ({
  get: () => state.value,
  set: (value: boolean) => state.set(value),
  toggle: () => state.set((value) => !value),
})

export const useIsDarkState = () => wrapIsDarkState(useHookstate(isDarkState))

export default useIsDarkState
