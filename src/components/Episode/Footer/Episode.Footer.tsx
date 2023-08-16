import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'
import EpisodeCredits from './Episode.Credits'
import RelatedEpisodes from './Episode.RelatedEpisodes'
import { useMemo } from 'react'
import EpisodeFootnotes from './Episode.Footnotes'

const TEMP_MORE_EPISODES = [
  {
    id: 1,
    thumbnail:
      'https://images.cdn.unbody.io/00f8908f-9dff-456e-9640-13defd9ae433/image/a04e5542-d027-44d5-b914-bd4cadf17d25_image1.png',
    publishedAt: '2023-07-11T20:30:00.000Z',
    title: 'Title 1',
  },
  {
    id: 2,
    thumbnail:
      'https://images.cdn.unbody.io/00f8908f-9dff-456e-9640-13defd9ae433/image/a04e5542-d027-44d5-b914-bd4cadf17d25_image1.png',
    publishedAt: '2023-07-12T20:30:00.000Z',
    title: 'Title 2',
  },
  {
    id: 3,
    thumbnail:
      'https://images.cdn.unbody.io/00f8908f-9dff-456e-9640-13defd9ae433/image/a04e5542-d027-44d5-b914-bd4cadf17d25_image1.png',
    publishedAt: '2023-07-13T20:30:00.000Z',
    title: 'Title 3',
  },
  {
    id: 4,
    thumbnail:
      'https://images.cdn.unbody.io/00f8908f-9dff-456e-9640-13defd9ae433/image/a04e5542-d027-44d5-b914-bd4cadf17d25_image1.png',
    publishedAt: '2023-07-14T20:30:00.000Z',
    title: 'Title 4',
  },
  {
    id: 5,
    thumbnail:
      'https://images.cdn.unbody.io/00f8908f-9dff-456e-9640-13defd9ae433/image/a04e5542-d027-44d5-b914-bd4cadf17d25_image1.png',
    publishedAt: '2023-07-14T20:30:00.000Z',
    title: 'Title 5',
  },
  {
    id: 6,
    thumbnail:
      'https://images.cdn.unbody.io/00f8908f-9dff-456e-9640-13defd9ae433/image/a04e5542-d027-44d5-b914-bd4cadf17d25_image1.png',
    publishedAt: '2023-07-14T20:30:00.000Z',
    title: 'Title 6',
  },
]

const EpisodeFooter = ({ data }: { data: LPE.Podcast.Document }) => {
  const footnotes = useMemo(() => {
    return (
      data.credits &&
      data.credits
        .filter((b) => b.footnotes.length)
        .map((b) => b.footnotes)
        .flat()
    )
  }, [data])

  return (
    <EpisodeFooterContainer>
      {footnotes?.length && <EpisodeFootnotes footnotes={footnotes} />}
      {data?.credits?.length && <EpisodeCredits credits={data.credits} />}
      <RelatedEpisodes relatedEpisodes={TEMP_MORE_EPISODES} />
    </EpisodeFooterContainer>
  )
}

const EpisodeFooterContainer = styled.div`
  margin-top: 56px;

  & > div:not(:first-child) > div > button,
  & > div:not(:first-child) > div {
    border-top: none;
  }

  @media (max-width: 768px) {
    margin-top: 72px;
  }
`

export default EpisodeFooter
