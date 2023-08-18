import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'
import EpisodeCredits from './Episode.Credits'
import RelatedEpisodes from './Episode.RelatedEpisodes'
import { useMemo } from 'react'
import EpisodeFootnotes from './Episode.Footnotes'

type Props = {
  episode: LPE.Podcast.Document
  relatedEpisodes: LPE.Podcast.Document[]
}

const EpisodeFooter = ({ episode, relatedEpisodes }: Props) => {
  const footnotes = useMemo(() => {
    return (
      episode.credits &&
      episode.credits
        .filter((b) => b.footnotes.length)
        .map((b) => b.footnotes)
        .flat()
    )
  }, [episode])

  return (
    <EpisodeFooterContainer>
      {!!footnotes && <EpisodeFootnotes footnotes={footnotes} />}
      {!!episode?.credits && <EpisodeCredits credits={episode.credits} />}
      {!!relatedEpisodes && (
        <RelatedEpisodes
          podcastSlug={episode.show?.slug as string}
          relatedEpisodes={relatedEpisodes}
        />
      )}
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
