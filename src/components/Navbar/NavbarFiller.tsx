import styled from '@emotion/styled'
import { FilterTags } from '@/components/FilterTags'
import { useSearchBarContext } from '@/context/searchbar.context'
import { useRouter } from 'next/router'

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
  height: var(--lpe-nav-rendered-height);
  margin: auto;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
`
