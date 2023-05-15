import styled from '@emotion/styled'
import { FilterTags } from '@/components/FilterTags'
import { useSearchBarContext } from '@/context/searchbar.context'
import { useRouter } from 'next/router'

export const NavbarFiller = () => {
  const { tags } = useSearchBarContext()

  return (
    <NavbarFillerContainer>
      <FilterTags onTagClick={() => {}} tags={tags} selectedTags={[]} />
    </NavbarFillerContainer>
  )
}

export const NavbarFillerContainer = styled.div`
  margin: auto;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-block: 24px;

  @media (max-width: 768px) {
    margin-block: 16px;
  }
`
