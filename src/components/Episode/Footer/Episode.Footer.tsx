import styled from '@emotion/styled'
import { LPE } from '../../../types/lpe.types'
import EpisodeCredits from './Episode.Credits'

const EpisodeFooter = ({ data }: { data: LPE.Podcast.Document }) => {
  return (
    <EpisodeFooterContainer>
      <EpisodeCredits credits={data.credits} />
    </EpisodeFooterContainer>
  )
}

const EpisodeFooterContainer = styled.div`
  margin-top: 16px;

  & > div:not(:first-child) > div > button,
  & > div:not(:first-child) > div {
    border-top: none;
  }

  @media (max-width: 768px) {
    margin-top: 72px;
  }
`

export default EpisodeFooter
