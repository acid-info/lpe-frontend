import { Navbar } from '@/components/Navbar'
import useIsDarkState from '@/states/isDarkState/isDarkState'
import { PropsWithChildren } from 'react'
import { Hero } from '@/components/Hero'
import { NavbarFiller } from '@/components/Navbar/NavbarFiller'
import { Searchbar } from '@/components/Searchbar'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { uiConfigs } from '@/configs/ui.configs'

export default function DefaultLayout(props: PropsWithChildren<any>) {
  const isDarkState = useIsDarkState()

  return (
    <>
      <header
        style={{
          textAlign: 'center',
          marginBlock: `${uiConfigs.navbarRenderedHeight}px`,
        }}
      >
        <Navbar isDark={isDarkState.get()} toggle={isDarkState.toggle} />
        <Hero />
        <NavbarFiller />
        <Searchbar />
      </header>
      <Main>{props.children}</Main>
      <Footer />
    </>
  )
}
