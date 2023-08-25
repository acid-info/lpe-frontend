import styled from '@emotion/styled'
import { LPE } from '../../types/lpe.types'
import { ArrowDownIcon, Badge, Button, Typography } from '@acid-info/lsd-react'
import Link from 'next/link'
import Image from 'next/image'
import { Grid, GridItem } from '../Grid/Grid'

interface Props {
  shows: LPE.Podcast.Show[]
}

export default function PodcastsLists({ shows }: Props) {
  return (
    <PodcastListsContainer>
      {shows &&
        shows.map((show) => (
          <ShowCardContainer key={show.id} className="w-8">
            <ShowCard>
              <Top>
                <ShowInfoContainer>
                  <Image
                    src={show.logo.url}
                    width={38}
                    height={38}
                    alt={show.logo.alt}
                  />
                  <ShowInfo>
                    <Typography variant="body2">{show.title}</Typography>
                    <Typography variant="body3">
                      {show.numberOfEpisodes} EP
                    </Typography>
                  </ShowInfo>
                </ShowInfoContainer>
                <ShowButtonLink href={`/podcasts/${show.slug}`}>
                  <ShowButton>
                    <ShowButtonText variant="body3">
                      Podcast page
                    </ShowButtonText>
                    <ArrowDownIcon />
                  </ShowButton>
                </ShowButtonLink>
              </Top>
              <Bottom>
                <Description
                  dangerouslySetInnerHTML={{ __html: show.description }}
                />
                {/* @ts-ignore */}
                {shows?.tags && (
                  <BadgeContainer>
                    {/* @ts-ignore */}
                    {show.tags.map((tag) => (
                      <Badge key={tag} size="small">
                        {tag}
                      </Badge>
                    ))}
                  </BadgeContainer>
                )}
              </Bottom>
            </ShowCard>
          </ShowCardContainer>
        ))}
    </PodcastListsContainer>
  )
}

const PodcastListsContainer = styled(Grid)`
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px 16px;
  }
`

const ShowCardContainer = styled(GridItem)``

const ShowCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid rgb(var(--lsd-text-primary));
`

const ShowInfoContainer = styled.div`
  display: flex;
  gap: 8px;
`

const ShowInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const Row = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`

const Top = styled(Row)`
  justify-content: space-between;
`

const Bottom = styled.div`
  margin-top: 88px;

  @media (max-width: 768px) {
    margin-top: 64px;
  }
`

const Description = styled(Typography)`
  font-size: var(--lsd-h6-fontSize);

  @media (max-width: 768px) {
    font-size: var(--lsd-body1-fontSize);
  }
`

const ShowButtonLink = styled(Link)`
  text-decoration: none;
`

const ShowButton = styled(Button)`
  display: flex;
  align-items: center;
  padding: 6px 10px 6px 12px;
  width: 122px;
  height: 28px;
  gap: 12px;

  > span {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  svg {
    transform: rotate(-90deg);
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    padding: 7px;
  }
`

const ShowButtonText = styled(Typography)`
  @media (max-width: 768px) {
    display: none;
  }
`

const BadgeContainer = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 8px;
`
