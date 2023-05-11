import { Navbar } from '@/components/Navbar'
import useIsDarkState from '@/states/isDarkState/isDarkState'
import { PropsWithChildren } from 'react'
import { NavbarFiller } from '@/components/Navbar/NavbarFiller'
import { Searchbar } from '@/components/Searchbar'
import { ESearchScope } from '@/types/ui.types'
import styles from './Search.layout.module.css'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'

export default function SearchLayout(props: PropsWithChildren<any>) {
  const isDarkState = useIsDarkState()
  return (
    <>
      <header className={styles.header}>
        <Navbar isDark={isDarkState.get()} toggle={isDarkState.toggle} />
        <NavbarFiller />
        <Searchbar searchScope={ESearchScope.ARTICLE} />
      </header>
      <Main>{props.children}</Main>
      <Footer />
    </>
  )
}
