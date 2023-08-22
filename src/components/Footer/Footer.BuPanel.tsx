import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { FooterLink } from '@/components/Footer/Footer.Link'
import { FooterSectionContainer } from '@/components/Footer/Footer.Section'

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
      <Wrapper>
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
      </Wrapper>
    </BusinessUnits>
  )
}

const Row = styled.div`
  display: flex;
  gap: 8px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;

  /* temporary breakpoint */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const SECTION_MARGIN = 50

const BusinessUnits = styled(FooterSectionContainer)`
  margin-top: ${SECTION_MARGIN}px;
  padding: 16px 0 0 0;
`

const SecondLinksContainer = styled.div`
  flex: 2;
`

const ThirdLinksContainer = styled.div`
  flex: 1;
  margin-bottom: ${SECTION_MARGIN}px;

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
