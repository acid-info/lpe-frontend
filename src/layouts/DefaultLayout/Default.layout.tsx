import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Main } from '@/components/Main'
import { Searchbar } from '@/components/Searchbar'
import { uiConfigs } from '@/configs/ui.configs'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import { AppBar } from '../../components/AppBar'
import { useThemeState } from '../../states/themeState'

export default function DefaultLayout(props: PropsWithChildren<any>) {
  const themeState = useThemeState()

  return (
    <>
      <HeaderContainer
        style={{
          textAlign: 'center',
          marginBlock: `${uiConfigs.navbarRenderedHeight}px`,
        }}
      >
        <div>
          <AppBar
            isDark={themeState.mode.get() === 'dark'}
            toggle={themeState.toggleMode}
          />
          <Hero />
        </div>
        <Searchbar withFilterTags={false} beSticky={true} />
      </HeaderContainer>
      <Main>{props.children}</Main>
      <Footer />
    </>
  )
}

const HeaderContainer = styled.header`
  @media (min-width: 776px) and (max-width: ${uiConfigs.maxContainerWidth}px) {
    padding: 0 16px;
  }
`
