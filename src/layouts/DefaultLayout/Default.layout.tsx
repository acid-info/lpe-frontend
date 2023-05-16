import { AppBar } from '../../components/AppBar'
import useIsDarkState from '@/states/isDarkState/isDarkState'
import { PropsWithChildren } from 'react'
import { Hero } from '@/components/Hero'
import { NavbarFiller } from '@/components/AppBar/NavbarFiller'
import { Searchbar } from '@/components/Searchbar'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { uiConfigs } from '@/configs/ui.configs'
import { useRouter } from 'next/router'
import { defaultThemes } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

export default function DefaultLayout(props: PropsWithChildren<any>) {
  const isDarkState = useIsDarkState()

  return (
    <>
      <HeaderContainer
        style={{
          textAlign: 'center',
          marginBlock: `${uiConfigs.navbarRenderedHeight}px`,
        }}
      >
        <div>
          <AppBar isDark={isDarkState.get()} toggle={isDarkState.toggle} />
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
