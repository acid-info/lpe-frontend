import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { FooterSection } from '@/components/Footer/Footer.Section'
import { FooterLink } from '@/components/Footer/Footer.Link'

const FIRST_LINK_GRUOP = [
  { label: 'Twitter', href: 'https://twitter.com/Logos_State' },
  { label: 'Terms & Conditions', href: 'https://logos.co/terms/' },
  { label: 'Work with us', href: 'https://jobs.status.im/' },
]

export const FooterOrgPanel = () => {
  return (
    <Wrapper>
      <OrgInfo>
        <Typography
          component="div"
          genericFontFamily="sans-serif"
          variant="body2"
        >
          Logos Press Engine ©{new Date().getFullYear()}
        </Typography>
        <Typography
          component="div"
          genericFontFamily="sans-serif"
          variant="body2"
        >
          All rights reserved.
        </Typography>
      </OrgInfo>
      <Links>
        {FIRST_LINK_GRUOP.map(({ label, href }, idx) => (
          <FooterLink
            key={'first-grouop' + idx}
            component="a"
            href={href}
            genericFontFamily="sans-serif"
            variant="body2"
          >
            {label}
          </FooterLink>
        ))}
      </Links>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  border-top: 1px solid rgb(var(--lsd-theme-primary));
  padding-top: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const OrgInfo = styled(FooterSection)`
  @media (max-width: 768px) {
    margin-bottom: 72px;
  }
`

const Links = styled(FooterSection)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: calc(72px + 28px + 16px);
`
