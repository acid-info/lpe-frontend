import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React from 'react'
import { LPE } from '../../types/lpe.types'

interface Props {
  show: LPE.Podcast.Show
}

export default function PodcastHost({ show }: Props) {
  return (
    <HostedBy>
      <Typography variant="body2">
        Hosted by:
        {show?.hosts?.map((host) => (
          <Host key={host.name} variant="body2">
            {host.name}
          </Host>
        ))}
      </Typography>
    </HostedBy>
  )
}

const HostedBy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const Host = styled(Typography)`
  margin-left: 8px;
  &:not(:last-child) {
    &:after {
      content: '•';
      margin-left: 8px;
      text-decoration: none;
      display: inline-block;
    }
  }
`
