import EpisodeBody from '@/components/Episode/Episode.Body'
import { Grid, GridItem } from '@/components/Grid/Grid'
import styled from '@emotion/styled'
import { LPE } from '../types/lpe.types'

interface Props {
  data: LPE.Podcast.Document
}

const EpisodeContainer = (props: Props) => {
  const { data } = props

  return (
    <EpisodeGrid>
      <Gap className={'w-1'} />
      <EpisodeBodyContainer className={'w-8'}>
        <EpisodeBody data={data} />
      </EpisodeBodyContainer>
    </EpisodeGrid>
  )
}

const EpisodeBodyContainer = styled(GridItem)`
  @media (min-width: 768px) and (max-width: 1200px) {
    grid-column: span 10 !important;
  }
`

const EpisodeGrid = styled(Grid)`
  width: 100%;
  @media (min-width: 768px) and (max-width: 1200px) {
  }
`

const Gap = styled(GridItem)`
  @media (max-width: 550px) {
    display: none;
  }
`

export default EpisodeContainer
