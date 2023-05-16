import { uiConfigs } from '@/configs/ui.configs'
import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { useSticky } from '@/utils/ui.utils'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { useSearchBarContext } from '@/context/searchbar.context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

type Props = {
  contents?: UnbodyGraphQl.Fragments.TocItem[]
}

export default function TableOfContents({ contents, ...props }: Props) {
  const { tocId, setTocId } = useArticleContainerContext()
  const dy = uiConfigs.navbarRenderedHeight + 2 * uiConfigs.articleSectionMargin
  const { resultsNumber } = useSearchBarContext()
  const router = useRouter()

  const { sticky, stickyRef, height } = useSticky<HTMLDivElement>(dy)

  useEffect(() => {
    const onHashChangeStart = (url: string) => {
      const hash = url.split('#')[1]
      if (hash) {
        setTocId(hash)
      } else {
        setTocId(null)
      }
    }
    router.events.on('hashChangeStart', onHashChangeStart)
    return () => {
      router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [setTocId, router.events])

  return (
    <Container
      dy={dy}
      height={height}
      ref={stickyRef}
      {...props}
      className={`${resultsNumber !== null ? 'hidden' : ''} ${
        sticky ? 'sticky' : ''
      }`}
    >
      <Title variant="body3" component={'div'}>
        Contents
      </Title>
      <Contents height={height}>
        {contents?.map((content, index) => (
          <TocItem
            href={`${index === 0 ? '#' : content.href}`}
            key={index}
            active={tocId ? content.href.substring(1) === tocId : index === 0}
            className={`level-${content.level}`}
          >
            <Typography variant="label2" genericFontFamily="sans-serif">
              {content.title}
            </Typography>
          </TocItem>
        ))}
      </Contents>
    </Container>
  )
}

const Container = styled.aside<{ dy: number; height: number }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  box-sizing: border-box;
  position: sticky;
  top: ${(p) => `${p.dy}px`};
  padding-bottom: 72px;

  transition: opacity 0.3s ease-in-out;

  &.hidden {
    opacity: 0;
  }

  // temporary breakpoint
  @media (max-width: 1024px) {
    display: none;
  }
`

const Title = styled(Typography)`
  margin-bottom: 24px;
`

const Contents = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  height: calc(
    100vh -
      ${uiConfigs.navbarRenderedHeight + uiConfigs.postSectionMargin + 40}px
  );

  &::-webkit-scrollbar {
    display: none;
  }
`

const TocItem = styled(Link)<{ active: boolean }>`
  display: flex;
  padding: 4px 16px 4px 16px;
  text-decoration: none;
  border-left: ${(p) =>
    p.active
      ? '1px solid rgb(var(--lsd-border-primary))'
      : '1px solid transparent'};
  cursor: pointer;

  label {
    cursor: pointer;
  }

  &.level-1 {
  }

  &.level-2 {
  }

  &.level-3 {
    text-indent: 16px;
  }
`
