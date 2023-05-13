import styled from '@emotion/styled'
import { uiConfigs } from '@/configs/ui.configs'
import { useIsScrolling, useOutsideClick, useSticky } from '@/utils/ui.utils'
import { PropsWithChildren, useEffect } from 'react'
import { nope } from '@/utils/general.utils'

type Props = PropsWithChildren<{
  onUnfocus?: () => void
}>

export function SearchbarContainer({ children, onUnfocus = nope }: Props) {
  const { sticky, stickyRef, height } = useSticky<HTMLDivElement>(
    uiConfigs.navbarRenderedHeight,
  )
  const { isOutside } = useOutsideClick<HTMLDivElement>(stickyRef)
  const isScrolling = useIsScrolling()

  useEffect(() => {
    if (isOutside && onUnfocus) {
      onUnfocus()
    }
    if (isScrolling && onUnfocus) {
      onUnfocus()
    }
  }, [isOutside, stickyRef, isScrolling, onUnfocus])

  return (
    <>
      <SearchBarWrapper ref={stickyRef} className={sticky ? 'sticky' : ''}>
        {children}
      </SearchBarWrapper>
      <div
        style={{
          height: `${height}px`,
        }}
      />
    </>
  )
}

const SearchBarWrapper = styled.div<Props>`
  display: block;
  width: calc(100% - 16px);
  background: rgb(var(--lsd-surface-primary));
  border-bottom: 1px solid rgb(var(--lsd-border-primary));
  border-top: 1px solid rgb(var(--lsd-border-primary));
  transition: top 0.2s ease-in-out;
  position: relative;

  overflow: hidden;

  &.sticky {
    position: fixed;
    top: ${uiConfigs.navbarRenderedHeight - 1}px;
    z-index: 100;
  }
`