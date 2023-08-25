import { Button } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { FooterOrgPanel } from '@/components/Footer/Footer.OrgPanel'
import { FooterSectionContainer } from '@/components/Footer/Footer.Section'
import { FooterBuPanel } from '@/components/Footer/Footer.BuPanel'

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <FooterSectionContainer>
      <FooterOrgPanel />
      <FooterBuPanel />
      <ScrollToTop size="small" onClick={handleScrollToTop}>
        Back to up ↑
      </ScrollToTop>
    </FooterSectionContainer>
  )
}

const ScrollToTop = styled(Button)`
  width: fit-content;
  position: absolute;
  bottom: 16px;
`
