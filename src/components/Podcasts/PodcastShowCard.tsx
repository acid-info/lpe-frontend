import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React from 'react'
import { LPE } from '../../types/lpe.types'

import { LogosCircleIcon } from '../Icons/LogosCircleIcon'
import PodcastHost from './Podcast.Host'

export enum Size {
  SMALL = 'small',
  LARGE = 'large',
}

export type PodcastShowCardProps = React.ComponentProps<typeof Container> & {
  show: LPE.Podcast.Show
}

export default function PodcastShowCard({
  show,
  ...props
}: PodcastShowCardProps) {
  return (
    <Container {...props}>
      <LogosCircleIcon width={74} height={74} />
      <ShowData>
        <Title variant="h3">{show.title}</Title>
        <PodcastHost show={show} />
        <Description
          variant="body2"
          dangerouslySetInnerHTML={{ __html: show.description }}
        />
      </ShowData>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled(Typography)`
  margin-bottom: 16px;
`

const ShowData = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Description = styled(Typography)`
  margin-top: 16px;

  @media (min-width: 768px) and (max-width: 1200px) {
    margin-top: 12px;
  }

  @media (max-width: 768px) {
    text-align: center;
    margin-top: 8px;
  }
`
