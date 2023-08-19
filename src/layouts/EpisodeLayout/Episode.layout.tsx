import { AppBar } from '@/components/AppBar'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { useEpisodeContext } from '@/context/episode.context'
import { PropsWithChildren } from 'react'
import { useThemeState } from '../../states/themeState'
import styles from './Episode.layout.module.css'

type Props = PropsWithChildren<{
  // onSearch: (query: string, filters: string[]) => void
}>
export default function EpisodeLayout({ children }: Props) {
  const themeState = useThemeState()
  const { onSearch, onReset } = useEpisodeContext()

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
