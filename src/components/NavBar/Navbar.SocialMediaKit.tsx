import styled from '@emotion/styled'
import Link from 'next/link'
import { DiscordIcon } from '@/components/Icons/DiscordIcon'
import { XIcon } from '@/components/Icons/XIcon'
import { YoutubeIcon } from '@/components/Icons/YTIcon'

export const SocialMediaKit = () => {
  return (
    <Container>
      <Link href={'https://discord.cc'}>
        <DiscordIcon />
      </Link>
      <Link href={'https://youtube.com'}>
        <YoutubeIcon />
      </Link>
      <Link href={'https://x.com'}>
        <XIcon />
      </Link>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  a {
    display: flex;
  }
`
