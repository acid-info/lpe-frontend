import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { NavBarProps } from '@/components/NavBar/NavBar'
import { PropsWithChildren } from 'react'
import { MainProps } from '../../components/Main/Main'
import { AppBar } from '../../components/NavBar'

interface Props {
  navbarProps?: NavBarProps
  mainProps?: Partial<MainProps>
}

export default function DefaultLayout(props: PropsWithChildren<Props>) {
  const { mainProps = {}, navbarProps = {} } = props

  return (
    <>
      <AppBar
        {...navbarProps}
        defaultState={navbarProps.defaultState ?? { showTitle: true }}
      />
      <Main {...mainProps}>{props.children}</Main>
      <Footer />
    </>
  )
}
