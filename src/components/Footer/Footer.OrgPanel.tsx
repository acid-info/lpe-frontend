import styled from '@emotion/styled'
import { FooterSection } from '@/components/Footer/Footer.Section'
import { FooterLink } from '@/components/Footer/Footer.Link'
import { FooterCopyright } from '@/components/Footer/Footer.Copyright'
import { FooterLinksItems } from '@/configs/data.configs'

export const FooterOrgPanel = () => {
  return (
    <Wrapper>
      <FooterCopyright />
      <Links>
        {FooterLinksItems.about.map(({ key, links }, idx) => (
          <Group key={key}>
            {links.map(({ label, href }, idx) => (
              <FooterLink
                key={'first-group' + idx}
                component="a"
                href={href}
                genericFontFamily="sans-serif"
                variant="body2"
              >
                {label}
              </FooterLink>
            ))}
          </Group>
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

const Group = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`

const Links = styled(FooterSection)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 72px;
`
