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

  const emptyGridItem = (
    <GridItem xs={{ cols: 0 }} sm={{ cols: 2 }} lg={{ cols: 4 }} />
  )

  return (
    <EpisodeGrid cols={16} xs={{ cols: 1 }} sm={{ cols: 12 }} lg={{ cols: 16 }}>
      {emptyGridItem}
      <EpisodeBodyContainer cols={8} xs={{ cols: 1 }} sm={{ cols: 8 }}>
        <EpisodeBody episode={episode} relatedEpisodes={relatedEpisodes} />
      </EpisodeBodyContainer>
      {emptyGridItem}
    </EpisodeGrid>
  )
}

const EpisodeBodyContainer = styled(GridItem)``

const EpisodeGrid = styled(Grid)`
  width: 100%;
`

export default EpisodeContainer
