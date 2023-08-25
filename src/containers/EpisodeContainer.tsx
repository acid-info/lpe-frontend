import EpisodeBody from '@/components/Episode/Episode.Body'
import { Grid, GridItem } from '@/components/Grid/Grid'
import styled from '@emotion/styled'
import { LPE } from '../types/lpe.types'

interface Props {
  episode: LPE.Podcast.Document
  relatedEpisodes: LPE.Podcast.Document[]
}

const EpisodeContainer = (props: Props) => {
  const { episode, relatedEpisodes } = props

  return (
    <EpisodeGrid>
      <GridItem className={'w-4'} />
      <EpisodeBodyContainer className={'w-8'}>
        <EpisodeBody episode={episode} relatedEpisodes={relatedEpisodes} />
      </EpisodeBodyContainer>
      <GridItem className={'w-4'} />
    </EpisodeGrid>
  )
}

const EpisodeBodyContainer = styled(GridItem)``

const EpisodeGrid = styled(Grid)`
  width: 100%;
  margin-top: -47px; // offset for uiConfig.postSectionMargin

  @media (max-width: 768px) {
    margin-top: 32px;
  }
`

export default EpisodeContainer
