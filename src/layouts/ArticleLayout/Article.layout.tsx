import { AppBar } from '@/components/AppBar'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { useArticleContext } from '@/context/article.context'
import { PropsWithChildren } from 'react'
import { useThemeState } from '../../states/themeState'
import styles from './Article.layout.module.css'

type Props = PropsWithChildren<{
  // onSearch: (query: string, filters: string[]) => void
}>
export default function ArticleLayout({ children }: Props) {
  const themeState = useThemeState()
  const { onSearch, onReset } = useArticleContext()

  return (
    <>
      <header className={styles.header}>
        <AppBar
          isDark={themeState.mode.get() === 'dark'}
          toggle={themeState.toggleMode}
          onSearch={onSearch}
          onReset={onReset}
        />
      </header>
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
