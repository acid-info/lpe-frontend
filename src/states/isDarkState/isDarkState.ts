import { State, hookstate, useHookstate } from "@hookstate/core";

const isDarkState = hookstate(false);

const wrapIsDarkState = (state: State<boolean>) => ({
  get: () => state.value,
  toggle: () => state.set((value) => !value),
});

export const useIsDarkState = () => wrapIsDarkState(useHookstate(isDarkState))

export default useIsDarkState;