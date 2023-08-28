import { LPEFooterGroup } from '@/types/ui.types'
import { DiscordIcon } from '@/components/Icons/DiscordIcon'
import { YoutubeIcon } from '@/components/Icons/YTIcon'
import { XIcon } from '@/components/Icons/XIcon'

export const ArticleBlocksOrders = {
  title: 0,
  subtitle: 1,
  summary: 2,
  tags: 3,
  mentions: 4,
  cover: 5,
}

export const NavLinksItems = [
  { label: 'Articles', href: '/search?type=article' },
  { label: 'Podcasts', href: '/podcasts' },
  { label: 'About', href: '/about' },
]

export const FooterLinksItems: {
  org: LPEFooterGroup[]
  about: LPEFooterGroup[]
} = {
  org: [
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
  ],

  about: [
    {
      title: null,
      key: 'social',
      links: [
        { label: 'X', href: 'https://twitter.com/Logos_state', key: 'x' },
        {
          label: 'Discord',
          href: 'https://discord.gg/logos-state',
          key: 'discord',
        },
        {
          label: 'Github',
          href: 'https://github.com/acid-info',
          key: 'github',
        },
        { label: 'Youtube', href: 'https://www.youtube.com', key: 'youtube' },
      ],
    },
    {
      title: null,
      key: 'info',
      links: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'about', href: '/about' },
      ],
    },
  ],
}
