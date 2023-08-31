import { ArrowDownIcon, Button, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import { LPE } from '../../types/lpe.types'
import { getPostLink } from '../../utils/route.utils'
import { Grid, GridItem } from '../Grid/Grid'
import PodcastHost from './Podcast.Host'

interface Props {
  shows: LPE.Podcast.Show[]
}

export default function PodcastsLists({ shows }: Props) {
  return (
    <PodcastListsContainer>
      {shows &&
        shows.map((show, idx) => {
          const isEven = idx % 2 === 0
          return (
            <ShowCardContainer key={show.id} className="w-8">
              <ShowCard isEven={isEven}>
                <div>
                  <Top>
                    <ShowInfoContainer>
                      <Image
                        src={show.logo.url}
                        width={38}
                        height={38}
                        alt={show.logo.alt}
                      />
                      <ShowInfo>
                        <ColoredText isEven={isEven} variant="body2">
                          {show.title}
                        </ColoredText>
                        <ColoredText isEven={isEven} variant="body3">
                          {show.numberOfEpisodes} EP
                        </ColoredText>
                      </ShowInfo>
                    </ShowInfoContainer>
                  </Top>
                  <ShowData isEven={isEven}>
                    <Description
                      dangerouslySetInnerHTML={{ __html: show.description }}
                    />
                    <PodcastHost show={show} />
                  </ShowData>
                </div>
                <ShowButtonLink
                  href={getPostLink('podcast', { showSlug: show.slug })}
                >
                  <ShowButton isEven={isEven}>
                    <ColoredText isEven={isEven} variant="body3">
                      Podcast page
                    </ColoredText>
                    <ArrowDownIcon color={isEven ? 'secondary' : 'primary'} />
                  </ShowButton>
                </ShowButtonLink>
              </ShowCard>
            </ShowCardContainer>
          )
        })}
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

const ShowCard = styled.div<{ isEven: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  border: 1px solid rgb(var(--lsd-text-primary));
  box-sizing: border-box;
  height: 516px;
  background-color: ${(props) =>
    props.isEven
      ? 'rgb(var(--lsd-surface-secondary))'
      : 'rgb(var(--lsd-surface-primary))'};

  @media (max-width: 768px) {
    height: 374px;
  }
`

const ShowInfoContainer = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`

const ShowInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const Row = styled.div`
  display: flex;
  gap: 8px;
`

const Top = styled(Row)`
  justify-content: space-between;
`

const ShowData = styled.div<{ isEven: boolean }>`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  p,
  span {
    color: ${(props) =>
      props.isEven
        ? 'rgb(var(--lsd-text-secondary))'
        : 'rgb(var(--lsd-text-primary))'};
  }

  @media (max-width: 768px) {
    margin-top: 57px;
  }
`

const ColoredText = styled(Typography)<{ isEven: boolean }>`
  color: ${(props) =>
    props.isEven
      ? 'rgb(var(--lsd-text-secondary))'
      : 'rgb(var(--lsd-text-primary))'};
`

const Description = styled(Typography)`
  font-size: var(--lsd-h4-fontSize);
  line-height: var(--lsd-h4-lineHeight);

  @media (max-width: 768px) {
    font-size: var(--lsd-h6-fontSize);
    line-height: var(--lsd-h6-lineHeight);
  }
`

const ShowButtonLink = styled(Link)`
  text-decoration: none;
  width: fit-content;
`

const ShowButton = styled(Button)<{ isEven: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 10px 0 12px;
  width: 122px;
  height: 28px;
  gap: 12px;
  border: 1px solid
    ${(props) =>
      props.isEven
        ? 'rgb(var(--lsd-border-secondary))'
        : 'rgb(var(--lsd-border-primary))'};

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
    padding: 7px;
  }
`
