import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { useEpisodeContext } from '@/context/episode.context'
import { PropsWithChildren } from 'react'
import { AppBar } from '../../components/NavBar'
import styles from './Episode.layout.module.css'

type Props = PropsWithChildren<{
  // onSearch: (query: string, filters: string[]) => void
}>
export default function EpisodeLayout({ children }: Props) {
  const { onSearch, onReset } = useEpisodeContext()

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
