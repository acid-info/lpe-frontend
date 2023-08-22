import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { PropsWithChildren } from 'react'
import { AppBar } from '../../components/NavBar'
import { NavBarProps } from '@/components/NavBar/NavBar'

interface Props {
  navbarProps?: NavBarProps
}

export default function DefaultLayout(props: PropsWithChildren<Props>) {
  const { navbarProps = {} } = props
  return (
    <>
      <AppBar {...navbarProps} />
      <Main>{props.children}</Main>
      <Footer />
    </>
  )
}
