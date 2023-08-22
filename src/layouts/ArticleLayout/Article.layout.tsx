import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { PropsWithChildren } from 'react'
import { AppBar } from '../../components/NavBar'
import styles from './Article.layout.module.css'

type Props = PropsWithChildren<{
  // onSearch: (query: string, filters: string[]) => void
}>
export default function ArticleLayout({ children }: Props) {
  return (
    <>
      <header className={styles.header}>
        <AppBar />
      </header>
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
