import { AppBar } from '@/components/AppBar'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { PropsWithChildren } from 'react'
import { useThemeState } from '../../states/themeState'
import styles from './Podcasts.layout.module.css'

type Props = PropsWithChildren

export default function PodcastsLayout({ children }: Props) {
  const themeState = useThemeState()

  return (
    <>
      <header className={styles.header}>
        <AppBar
          isDark={themeState.mode.get() === 'dark'}
          toggle={themeState.toggleMode}
        />
      </header>
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
