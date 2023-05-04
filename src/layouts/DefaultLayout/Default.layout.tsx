import { Navbar } from '@/components/Navbar'
import useIsDarkState from '@/states/isDarkState/isDarkState'
import { PropsWithChildren } from 'react'
import { Hero } from '@/components/Hero'
import { NavbarFiller } from '@/components/Navbar/NavbarFiller'
import { Searchbar } from '@/components/Searchbar'

export default function DefaultLayout(props: PropsWithChildren<any>) {
  const isDarkState = useIsDarkState()

  return (
    <>
      <header>
        <Navbar isDark={isDarkState.get()} toggle={isDarkState.toggle} />
        <NavbarFiller />
        <Hero />
        <Searchbar />
      </header>
      <main>{props.children}</main>
    </>
  )
}
