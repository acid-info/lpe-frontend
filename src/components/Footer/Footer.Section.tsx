import { uiConfigs } from '@/configs/ui.configs'
import styled from '@emotion/styled'

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const FooterSectionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 16px 0;
  margin: 200px auto;

  @media (max-width: ${uiConfigs.maxContainerWidth + 32}px) {
    margin-inline: 16px;
  }
`
