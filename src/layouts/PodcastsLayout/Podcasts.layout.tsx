import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { PropsWithChildren } from 'react'
import { AppBar } from '../../components/NavBar'
import styles from './Podcasts.layout.module.css'

type Props = PropsWithChildren

export default function PodcastsLayout({ children }: Props) {
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
