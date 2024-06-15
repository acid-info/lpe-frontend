import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Image from 'next/image'
import React from 'react'
import { LPE } from '../../types/lpe.types'
import { lsdUtils } from '../../utils/lsd.utils'
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
      <Logo
        src={show.logo.url}
        alt={show.logo.alt}
        width={show.logo.width}
        height={show.logo.height}
      />
      <ShowData>
        <Title variant="h2" genericFontFamily="serif">
          {show.title}
        </Title>
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

  ${(props) => lsdUtils.breakpoint(props.theme, 'md', 'down')} {
    margin-top: 32px;
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'down')} {
    margin-top: 24px;
  }
`

const Description = styled(Typography)`
  margin-top: 16px;
  max-width: 518px;
  text-align: center;

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'exact')} {
    margin-top: 12px;
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'md', 'exact')} {
    margin-top: 12px;
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    text-align: center;
    margin-top: 8px;
  }
`

const Logo = styled(Image)`
  width: 74px;
  height: 74px;

  ${(props) => lsdUtils.breakpoint(props.theme, 'md', 'down')} {
    width: 64px;
    height: 64px;
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'down')} {
    width: 56px;
    height: 56px;
  }
`
