import { Navbar } from '@/components/Navbar'
import useIsDarkState from '@/states/isDarkState/isDarkState'
import { PropsWithChildren } from 'react'
import { NavbarFiller } from '@/components/Navbar/NavbarFiller'
import { Searchbar } from '@/components/Searchbar'
import { ESearchScope } from '@/types/ui.types'
import styles from './Article.layout.module.css'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { useArticleContext } from '@/context/article.context'

type Props = PropsWithChildren<{
  // onSearch: (query: string, filters: string[]) => void
}>
export default function ArticleLayout({ children }: Props) {
  const isDarkState = useIsDarkState()
  const { onSearch, onReset } = useArticleContext()

  return (
    <>
      <header className={styles.header}>
        <Navbar
          isDark={isDarkState.get()}
          toggle={isDarkState.toggle}
          onSearch={onSearch}
          onReset={onReset}
        />
      </header>
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
