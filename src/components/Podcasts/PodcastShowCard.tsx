import { Tags } from '@/components/Tags'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { LPE } from '../../types/lpe.types'

import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage'
import { LogosCircleIcon } from '../Icons/LogosCircleIcon'

export enum Size {
  SMALL = 'small',
  LARGE = 'large',
}

interface Props {
  show: LPE.Podcast.Show
}

export default function PodcastShowCard({ show }: Props) {
  return (
    <Container>
      <LogosCircleIcon width={73} height={73} />
      <ShowData>
        <Typography variant="h3">{show.title}</Typography>
        <HostedBy>
          <Typography variant="body2">
            Hosted by:
            {show.hosts.map((host) => (
              <Host key={host.name} variant="body2">
                {host.name}
              </Host>
            ))}
          </Typography>
        </HostedBy>
        <Description variant="body2">{show.description}</Description>
      </ShowData>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 68px;
`

const ShowData = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HostedBy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
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

const Description = styled(Typography)`
  margin-top: 16px;
`
