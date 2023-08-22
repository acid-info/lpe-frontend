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
  margin-top: 200px;
  padding: 16px;
  border-top: 1px solid rgb(var(--lsd-border-primary));
`
