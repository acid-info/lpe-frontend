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

interface Props {
  show: LPE.Podcast.Show
}

export default function PodcastShowCard({ show }: Props) {
  return (
    <Container>
      <LogosCircleIcon width={73} height={73} />
      <ShowData>
        <Typography variant="h3">{show.title}</Typography>
        <PodcastHost show={show} />
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

const Description = styled(Typography)`
  margin-top: 16px;
`
