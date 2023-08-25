import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { FooterLink } from '@/components/Footer/Footer.Link'
import {
  FooterSection,
  FooterSectionContainer,
} from '@/components/Footer/Footer.Section'

const SECOND_LINK_GROUP = [
  {
    title: 'Research',
    links: [
      { label: 'VacP2P', href: 'https://vac.dev/' },
      { label: 'AFAIK', href: 'https://afaik.institute/' },
    ],
  },
  {
    title: 'Infrastructure',
    links: [
      { label: 'Waku', href: 'https://waku.org/' },
      { label: 'Nimbus', href: 'https://nimbus.team/' },
      { label: 'Codex', href: 'https://codex.storage/' },
      { label: 'Nomos', href: 'https://nomos.tech/' },
    ],
  },
  {
    title: 'Creative Studio',
    links: [{ label: 'Acid.info', href: 'https://acid.info/' }],
  },
]

const THIRD_LINKS_GROUP = [
  {
    title: 'Movement',
    links: [{ label: 'Logos', href: 'https://logos.co/' }],
  },
  {
    title: 'User-facing Products',
    links: [
      { label: 'Status', href: 'https://status.im/' },
      { label: 'Keycard', href: 'https://keycard.tech/' },
    ],
  },
]
export const FooterBuPanel = () => {
  return (
    <BusinessUnits>
      <BUInfo>
        <Typography
          component="div"
          genericFontFamily="sans-serif"
          variant="body2"
        >
          Logos
        </Typography>
        <Typography
          component="div"
          genericFontFamily="sans-serif"
          variant="body2"
        >
          Business Units:
        </Typography>
      </BUInfo>
      <BUs>
        <SecondLinksContainer>
          {SECOND_LINK_GROUP.map(({ title, links }, idx) => (
            <LinkGroup key={'second-group' + idx}>
              <div>
                <Typography
                  component="div"
                  genericFontFamily="sans-serif"
                  variant="body2"
                >
                  {title}:
                </Typography>
              </div>
              <Row>
                {links.map(({ label, href }, idx) => (
                  <FooterLink
                    key={'second-group-link' + idx}
                    component="a"
                    href={href}
                    genericFontFamily="sans-serif"
                    variant="body2"
                  >
                    {label}
                  </FooterLink>
                ))}
              </Row>
            </LinkGroup>
          ))}
        </SecondLinksContainer>
        <ThirdLinksContainer>
          {THIRD_LINKS_GROUP.map(({ title, links }, idx) => (
            <LinkGroup key={'third-group' + idx}>
              <div>
                <Typography
                  component="div"
                  genericFontFamily="sans-serif"
                  variant="body2"
                >
                  {title}:
                </Typography>
              </div>
              <Row>
                {links.map(({ label, href }, idx) => (
                  <FooterLink
                    key={'third-group-link' + idx}
                    component="a"
                    href={href}
                    genericFontFamily="sans-serif"
                    variant="body2"
                  >
                    {label}
                  </FooterLink>
                ))}
              </Row>
            </LinkGroup>
          ))}
        </ThirdLinksContainer>
      </BUs>
    </BusinessUnits>
  )
}

const BusinessUnits = styled.div`
  margin-top: 50px;
  padding-top: 16px;
  border-top: 1px solid rgb(var(--lsd-border-primary));

  display: flex;
  align-items: baseline;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 72px;
  }
`

const BUInfo = styled(FooterSection)`
  @media (max-width: 768px) {
    margin-bottom: 76px;
  }
`

const BUs = styled(FooterSection)`
  display: flex;
  flex-direction: row;
  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Row = styled.div`
  display: flex;
  gap: 8px;
`

const SecondLinksContainer = styled.div`
  flex: 2;
`

const ThirdLinksContainer = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    margin-bottom: 80px;
  }
`

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 34px;
  gap: 4px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`
