import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { uiConfigs } from '@/configs/ui.configs'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import { AppBar } from '../../components/NavBar'
import styles from './Search.layout.module.css'

export default function SearchLayout(props: PropsWithChildren<any>) {
  return (
    <>
      <header className={styles.header}>
        <AppBar />
      </header>
      <MainContainer className={'search_page'}>{props.children}</MainContainer>
      <Footer />
    </>
  )
}

const MainContainer = styled(Main)`
  &.search_page {
    // margin-top: ${uiConfigs.postSectionMargin}px;
  }

  @media (max-width: 768px) {
    &.search_page {
      margin-top: ${uiConfigs.postSectionMobileMargin * 3}px;
    }
  }
`
