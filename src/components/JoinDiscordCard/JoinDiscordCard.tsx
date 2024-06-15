import { Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { FC } from 'react'
import { DiscordIcon } from '../Icons/DiscordIcon'

type JoinDiscordCardProps = React.HTMLAttributes<HTMLDivElement> & {
  discordHref?: string
}

export const JoinDiscordCard: FC<JoinDiscordCardProps> = ({
  discordHref = 'https://discord.gg/logosnetwork',
  ...props
}) => {
  return (
    <JoinDiscordCardContainer {...props}>
      <Typography variant="h3">Join the discussion</Typography>
      <Link
        href={discordHref}
        style={{
          textDecoration: 'none',
        }}
      >
        <Button icon={<DiscordIcon color="primary" />}>
          <Typography variant="body2">Go to Discord</Typography>
        </Button>
      </Link>
    </JoinDiscordCardContainer>
  )
}

const JoinDiscordCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(var(--lsd-border-primary));
  padding: 24px 0px;
  margin-bottom: 24px;
`
