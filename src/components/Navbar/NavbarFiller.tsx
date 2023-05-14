import styled from '@emotion/styled'
import { FilterTags } from '@/components/FilterTags'
import { useSearchBarContext } from '@/context/searchbar.context'

export const NavbarFiller = () => {
  const { tags } = useSearchBarContext()
  return (
    <NavbarFillerContainer>
      <FilterTags tags={tags} selectedTags={[]} />
    </NavbarFillerContainer>
  )
}
export const NavbarFillerContainer = styled.div`
  height: var(--lpe-nav-rendered-height);
  margin: auto;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
`
