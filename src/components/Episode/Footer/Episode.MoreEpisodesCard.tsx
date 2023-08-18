import { LPE } from '@/types/lpe.types'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  coverImage: LPE.Image.Document
  title: string
  publishedAt: string
  slug: string
}

const MoreEpisodesCard = ({ coverImage, title, publishedAt, slug }: Props) => {
  const date = new Date(publishedAt)

  return (
    <Container>
      {coverImage?.url && (
        <CustomLink href={`/podcasts/${slug}`}>
          <ImageContainer>
            <Image src={coverImage.url} fill alt={coverImage.alt} />
          </ImageContainer>
        </CustomLink>
      )}

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
      <CustomLink href={`/podcasts/${slug}`}>
        <Typography variant="h6" genericFontFamily="serif">
          {title}
        </Typography>
      </CustomLink>
    </Container>
  )
}

const Container = styled.div`
  margin-block: 24px;
  display: flex;
  flex-direction: column;
  width: 48%;
`

const ImageContainer = styled.div`
  width: 100%;
  height: 190px;
  position: relative;
  margin-bottom: 16px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`

const CustomLink = styled(Link)`
  text-decoration: none;
`

export default MoreEpisodesCard
