import { Main } from '@/components/Main'
import { NavBarProps } from '@/components/NavBar/NavBar'
import { PropsWithChildren, useMemo } from 'react'
import { MainProps } from '../../components/Main/Main'
import { AppBar } from '../../components/NavBar'

interface Props {
  navbarProps?: NavBarProps
  mainProps?: Partial<MainProps>
}

export default function DefaultLayout(props: PropsWithChildren<Props>) {
  const { mainProps = {}, navbarProps = {} } = props
  const navbarDefaultState = useMemo(
    () => navbarProps.defaultState ?? { showTitle: true },
    [navbarProps],
  )

  return (
    <>
      <AppBar {...navbarProps} defaultState={navbarDefaultState} />
      <Main {...mainProps}>{props.children}</Main>
    </>
  )
}
