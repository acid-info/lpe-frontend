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
  return (
    <>
      <AppBar />
      <Main>{props.children}</Main>
      <Footer />
    </>
  )
}
