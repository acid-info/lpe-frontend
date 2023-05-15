import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'

const FIRST_LINK_GRUOP = [
  { label: 'Twitter', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Contact us', href: '#' },
  { label: 'Work with us', href: '#' },
]

const SECOND_LINK_GROUP = [
  {
    title: 'Research',
    links: [
      { label: 'VacP2P', href: '#' },
      { label: 'AFAIK', href: '#' },
      { label: 'Institute', href: '#' },
    ],
  },
  {
    title: 'Infrastructure',
    links: [
      { label: 'Waku', href: '#' },
      { label: 'Nimbus', href: '#' },
      { label: 'Codex', href: '#' },
      { label: 'Nomos', href: '#' },
    ],
  },
  {
    title: 'Creative Studio',
    links: [{ label: 'Acid.info', href: '#' }],
  },
]

const THIRD_LINKS_GROUP = [
  {
    title: 'Movement',
    links: [{ label: 'Logos', href: '#' }],
  },
  {
    title: 'User-facing / Products',
    links: [
      { label: 'Status', href: '#' },
      { label: 'Keycard', href: '#' },
    ],
  },
]

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Container>
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
            <Link
              key={'first-grouop' + idx}
              component="a"
              href={href}
              genericFontFamily="sans-serif"
              variant="body2"
            >
              {label}
            </Link>
          ))}
        </Links>
      </Wrapper>
      <BusinessUnits>
        <Wrapper>
          <OrgInfo>
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
          </OrgInfo>
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
                    <Link
                      key={'second-group-link' + idx}
                      component="a"
                      href={href}
                      genericFontFamily="sans-serif"
                      variant="body2"
                    >
                      {label}
                    </Link>
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
                    <Link
                      key={'third-group-link' + idx}
                      component="a"
                      href={href}
                      genericFontFamily="sans-serif"
                      variant="body2"
                    >
                      {label}
                    </Link>
                  ))}
                </Row>
              </LinkGroup>
            ))}
          </ThirdLinksContainer>
        </Wrapper>
      </BusinessUnits>
      <ScrollToTop size="small" onClick={handleScrollToTop}>
        Back to up ↑
      </ScrollToTop>
    </Container>
  )
}

const SECTION_MARGIN = 50

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 200px;
  padding: 16px;
  border-top: 1px solid rgb(var(--lsd-border-primary));
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const OrgInfo = styled(Section)`
  @media (max-width: 768px) {
    margin-bottom: 76px;
  }
`

const Links = styled(Section)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const Link = styled(Typography)`
  width: fit-content;
  &:not(:last-child) {
    &:after {
      content: '•';
      margin-left: 8px;
      text-decoration: none;
      display: inline-block;
    }
  }
`

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

const BusinessUnits = styled(Container)`
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

const ScrollToTop = styled(Button)`
  width: fit-content;
  position: absolute;
  bottom: 16px;
  left: 16px;
`
