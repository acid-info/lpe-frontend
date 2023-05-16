import useIsDarkState from '@/states/isDarkState/isDarkState'
import { PropsWithChildren } from 'react'
import styles from './Search.layout.module.css'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { AppBar } from '@/components/AppBar'
import styled from '@emotion/styled'
import { uiConfigs } from '@/configs/ui.configs'

export default function SearchLayout(props: PropsWithChildren<any>) {
  const isDarkState = useIsDarkState()
  return (
    <>
      <header className={styles.header}>
        <AppBar isDark={isDarkState.get()} toggle={isDarkState.toggle} />
      </header>
      <MainContainer className={'search_page'}>{props.children}</MainContainer>
      <Footer />
    </>
  )
}

const MainContainer = styled(Main)`
  &.search_page {
    margin-top: ${uiConfigs.postSectionMargin * 1.7}px;
  }

  @media (max-width: 768px) {
    &.search_page {
      margin-top: ${uiConfigs.postSectionMobileMargin * 3}px;
    }
  }
`
