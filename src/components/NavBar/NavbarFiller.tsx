import { FilterTags } from '@/components/FilterTags'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React from 'react'

export type NavbarFilter = Partial<
  React.ComponentProps<typeof NavbarFillerContainer>
> & {
  tags?: string[]
}

export const NavbarFiller: React.FC<NavbarFilter> = ({
  tags = [],
  ...props
}) => {
  const router = useRouter()

  const onTagClick = (tag: string) => {
    router.push(`/search?topics=${tag}`)
  }

  return (
    <NavbarFillerContainer {...props}>
      <FilterTags
        size="large"
        onTagClick={onTagClick}
        tags={tags}
        selectedTags={[]}
      />
    </NavbarFillerContainer>
  )
}

export const NavbarFillerContainer = styled.div`
  margin: auto;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-block: 16px;
  }
`
