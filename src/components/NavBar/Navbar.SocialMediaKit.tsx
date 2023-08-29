import styled from '@emotion/styled'
import Link from 'next/link'
import { DiscordIcon } from '@/components/Icons/DiscordIcon'
import { XIcon } from '@/components/Icons/XIcon'
import { YoutubeIcon } from '@/components/Icons/YTIcon'
import { FooterLinksItems } from '@/configs/data.configs'
import { LPEFooterGroup } from '@/types/ui.types'

const socialLinks = FooterLinksItems.about.find(
  (item) => item.key === 'social',
) as LPEFooterGroup

export const SocialMediaKit = () => {
  return (
    <Container>
      {socialLinks &&
        socialLinks.links.map((link, index) => {
          let Icon = null
          switch (link.key) {
            case 'discord':
              Icon = DiscordIcon
              break
            case 'youtube':
              Icon = YoutubeIcon
              break
            case 'x':
              Icon = XIcon
              break
            default:
              Icon = null
          }
          return (
            Icon && (
              <LinkContainer>
                <Link
                  href={link.href}
                  key={`sm-link-${index}`}
                  title={`Join us on ${link.label}`}
                  target={'_blank'}
                >
                  <Icon />
                </Link>
              </LinkContainer>
            )
          )
        })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    display: flex;
  }
`

const LinkContainer = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm.width}px) {
    width: fit-content;
    display: flex;

    &:not(:last-child) {
      &:after {
        content: '';
        margin-left: 16px;
        border-right: 1px solid rgb(var(--lsd-border-primary));
      }
    }
  }
`
