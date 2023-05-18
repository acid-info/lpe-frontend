import styled from '@emotion/styled'
import { FilterTags } from '@/components/FilterTags'
import { useSearchBarContext } from '@/context/searchbar.context'
import { useRouter } from 'next/router'
import { breakpoints } from '@/configs/ui.configs'

export const NavbarFiller = () => {
  const router = useRouter()
  const { tags } = useSearchBarContext()

  const onTagClick = (tag: string) => {
    router.push(`/search?topics=${tag}`)
  }

  return (
    <NavbarFillerContainer>
      <FilterTags onTagClick={onTagClick} tags={tags} selectedTags={[]} />
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

  @media (max-width: ${breakpoints.mobile}px) {
    margin-block: 16px;
  }
`
