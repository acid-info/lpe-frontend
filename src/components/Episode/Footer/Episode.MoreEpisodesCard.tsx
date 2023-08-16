import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Image from 'next/image'

type Props = {
  thumbnail: string
  title: string
  publishedAt: string
}

const MoreEpisodesCard = ({ thumbnail, title, publishedAt }: Props) => {
  const date = new Date(publishedAt)
  return (
    <Container>
      <ImageContainer>
        <Image src={thumbnail} fill alt={thumbnail} />
      </ImageContainer>

      <Row>
        <Typography variant="body3" genericFontFamily="sans-serif">
          PODCAST
        </Typography>
        <Typography variant="body3">•</Typography>
        <Typography variant="body3" genericFontFamily="sans-serif">
          {date &&
            date.toLocaleString('en-GB', {
              day: 'numeric',
              month: 'long', // TODO: Should be uppercase
              year: 'numeric',
            })}
        </Typography>
      </Row>

      <Typography>{title}</Typography>
    </Container>
  )
}

const Container = styled.div`
  margin-block: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 48%;
`

const ImageContainer = styled.div`
  width: 100%;
  height: 190px;
  position: relative;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export default MoreEpisodesCard
