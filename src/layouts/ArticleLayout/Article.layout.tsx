import useIsDarkState from '@/states/isDarkState/isDarkState'
import { PropsWithChildren } from 'react'
import styles from './Article.layout.module.css'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { useArticleContext } from '@/context/article.context'
import { AppBar } from '@/components/AppBar'

type Props = PropsWithChildren<{
  // onSearch: (query: string, filters: string[]) => void
}>
export default function ArticleLayout({ children }: Props) {
  const isDarkState = useIsDarkState()
  const { onSearch, onReset } = useArticleContext()

  return (
    <>
      <header className={styles.header}>
        <AppBar
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
