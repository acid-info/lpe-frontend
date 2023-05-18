import styled from '@emotion/styled'
import { breakpoints, uiConfigs } from '@/configs/ui.configs'
import { useIsScrolling, useOutsideClick, useSticky } from '@/utils/ui.utils'
import { PropsWithChildren, useEffect } from 'react'
import { nope } from '@/utils/general.utils'

type Props = PropsWithChildren<{
  onUnfocus?: () => void
  style?: any
  className?: string
  beSticky?: boolean
}>

export function SearchbarContainer({
  children,
  onUnfocus = nope,
  style = {},
  className,
  beSticky = false,
}: Props) {
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
      <SearchBarWrapper
        style={style}
        ref={stickyRef}
        className={`${className} ${beSticky && sticky ? 'sticky' : ''}`}
      >
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
  position: relative;
  display: block;
  width: 100%;

  background: rgb(var(--lsd-surface-primary));
  border-bottom: 1px solid rgb(var(--lsd-border-primary));
  transition: top 0.2s ease-in-out;

  box-sizing: border-box;
  overflow: hidden;
  max-width: ${uiConfigs.maxContainerWidth}px;

  min-height: 40px;

  &.sticky {
    position: fixed;

    top: ${uiConfigs.navbarRenderedHeight - 1}px;
    z-index: 100;
    max-width: ${uiConfigs.maxContainerWidth}px;
    border-top: none;
  }

  @media (max-width: ${uiConfigs.maxContainerWidth}px) {
    &.sticky {
      width: calc(100% - 32px);
      left: 16px;
    }
  }

  @media (max-width: ${breakpoints.mobile}px) {
    &.sticky {
      width: 100%;
      left: 0;
      top: 0;
    }
  }
`
