import { FilterTags } from '@/components/FilterTags'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React from 'react'
import { Tag } from '@acid-info/lsd-react'

export type NavbarFilter = Partial<React.ComponentProps<typeof Container>> & {
  tags?: string[]
}

export const HeroTags: React.FC<NavbarFilter> = ({ tags = [], ...props }) => {
  const router = useRouter()

  const onTagClick = (tag: string) => {
    router.push(`/search?topics=${tag}`)
  }

  return (
    <Container {...props}>
      <Tags>
        {tags.map((tag, index) => (
          <Tag
            size={'small'}
            disabled={false}
            key={index}
            onClick={() => onTagClick(tag)}
            variant={'outlined'}
          >
            {tag}
          </Tag>
        ))}
      </Tags>
    </Container>
  )
}

const Container = styled.div`
  margin: auto;
  width: 100%;
  text-align: center;
  display: flex;
  overflow: hidden;

  @media (max-width: 768px) {
  }
`

const Tags = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  position: relative;
  scroll-snap-type: x mandatory;
  justify-content: center;
  gap: 0 8px;

  padding-top: 16px;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    flex: 0 0 auto;
    span {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm.width}px) {
    justify-content: flex-start;
    padding-left: var(--main-content-padding);
    padding-right: var(--main-content-padding);
  }
`
