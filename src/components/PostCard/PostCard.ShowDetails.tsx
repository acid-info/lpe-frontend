import { LPE } from '@/types/lpe.types'
import { Typography } from '@acid-info/lsd-react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

export type PostCardShowDetailsProps = Partial<
  React.ComponentProps<typeof CustomLink>
> & {
  title: string
  slug: string
  episodeNumber: number
  logo?: LPE.Image.Document
  podcast: LPE.Podcast.Show
  size?: 'small' | 'medium'
}

// TODO
export const PostCardShowDetails = ({
  slug,
  episodeNumber,
  podcast,
  size = 'medium',
  ...props
}: PostCardShowDetailsProps) => {
  return (
    <CustomLink {...props} href={`/podcasts/${slug}`}>
      <Container>
        {podcast && (
          <>
            <Logo
              src={podcast?.logo?.url}
              width={size === 'medium' ? 38 : 28}
              height={size === 'medium' ? 38 : 28}
              alt={podcast.logo.alt}
            />
            <PodcastInfo>
              <Typography variant="body2">{podcast.title}</Typography>
              {size !== 'small' && (
                <Typography variant="body3">{episodeNumber} EP</Typography>
              )}
            </PodcastInfo>
          </>
        )}
      </Container>
    </CustomLink>
  )
}

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const PodcastInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const CustomLink = styled(Link)`
  text-decoration: none;
`

const Logo = styled(Image)`
  border-radius: 100%;
`
