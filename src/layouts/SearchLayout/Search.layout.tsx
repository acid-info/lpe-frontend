import { AppBar } from '@/components/AppBar'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { uiConfigs } from '@/configs/ui.configs'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import { useThemeState } from '../../states/themeState'
import styles from './Search.layout.module.css'

export default function SearchLayout(props: PropsWithChildren<any>) {
  const themeState = useThemeState()

  return (
    <>
      <header className={styles.header}>
        <AppBar
          isDark={themeState.mode.get() === 'dark'}
          toggle={themeState.toggleMode}
        />
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
