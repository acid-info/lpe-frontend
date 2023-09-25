import { uiConfigs } from '@/configs/ui.configs'
import { lsdUtils } from '@/utils/lsd.utils'
import { useIsMobile, useOnWindowResize } from '@/utils/ui.utils'
import { IconButton } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom'
import { useWindowScroll } from 'react-use'
import { ExitFullscreenIcon } from '../Icons/ExitFullscreenIcon'
import { FullscreenIcon } from '../Icons/FullscreenIcon'

type UseLightBoxReturnType = {
  getDisplayedStyle: (element: HTMLElement | null) => React.CSSProperties
  close: () => void
  display: (element: HTMLElement) => void
  isDisplayedElement: (el: HTMLElement) => boolean
  isActive: boolean
  isMobile: boolean
}

// Main logic was taken from:
// https://github.com/acid-info/logos-docusaurus-plugins/blob/964bf92263cf6eb61527c92c83c73ab6ba74e36d/packages/logos-docusaurus-theme/src/client/containers/LightBox/LightBox.tsx
export const useLightBox = (): UseLightBoxReturnType => {
  const { y: scrollY } = useWindowScroll()
  const [displayedElement, setDisplayedElement] = useState<HTMLElement | null>(
    null,
  )
  const [displayedStyle, setDisplayedStyle] = useState<CSSProperties>({
    opacity: '0.5',
  })
  const isMobile = useIsMobile()

  const defaultStyle: CSSProperties = {
    opacity: 1,
    transform: 'translate(0px, 0px)',
    width: '100%',
    height: '100%',
  }

  const display = (element: HTMLElement) => {
    setDisplayedElement(element)

    const vw = document.body.clientWidth
    const vh = window.innerHeight

    const maxWidth = isMobile ? vw - 32 : vw * 0.9375
    const maxHeight = vh - 160

    const rect = element.getBoundingClientRect()

    // Calculate the scaling factor for both dimensions
    const widthScale = maxWidth / rect.width
    const heightScale = maxHeight / rect.height

    // Pick the smaller scale factor to ensure the image fits within maxWidth and maxHeight
    const scale = Math.min(widthScale, heightScale)

    // Calculate the new dimensions of the image
    const newWidth = rect.width * scale
    const newHeight = rect.height * scale

    // Compute the translation to center the image
    const centerX = (vw - newWidth) / 2
    const centerY = (vh - newHeight) / 2

    const translateX = centerX - rect.left
    const translateY = centerY - rect.top

    setDisplayedStyle({
      zIndex: 202,
      width: `${newWidth}px`,
      height: `${newHeight}px`,
      transform: `translate(${translateX}px, ${translateY}px)`,
      position: 'relative',
    })
  }

  const close = useCallback(() => {
    setDisplayedElement(null)
  }, [])

  // When the window is resized, close the lightbox.
  useOnWindowResize(close)

  // If the user scrolls, close the lightbox.
  useEffect(() => {
    // On mobile, this is not needed: even if the user attempts to scroll, lightbox stays open.
    if (isMobile) return

    if (displayedElement) close()
  }, [scrollY])

  // Only for mobile - toggle the whole page's overflow when the lightbox is displayed.
  useEffect(() => {
    const html = document.querySelector('html')!
    html.style.overflow = isMobile && displayedElement ? 'hidden' : 'initial'
  }, [isMobile, displayedElement])

  return {
    getDisplayedStyle: (element: HTMLElement | null) => ({
      ...defaultStyle,
      ...(element === displayedElement ? displayedStyle : {}),
    }),
    close,
    display,
    isDisplayedElement: (el: HTMLElement) => displayedElement === el,
    isActive: !!displayedElement,
    isMobile,
  }
}

type OnUpdateParams = {
  x: number
  y: number
  scale: number
}

type LightBoxProps = {
  children: React.ReactNode
  caption: string
}

export const LightBox = ({ children, caption }: LightBoxProps) => {
  const {
    getDisplayedStyle,
    display,
    isDisplayedElement,
    isActive,
    close,
    isMobile,
  } = useLightBox()
  const ref = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLElement>(null)
  const displayedStyle = getDisplayedStyle(ref.current)

  const handleUpdate = useCallback(({ x, y, scale }: OnUpdateParams) => {
    const img = childRef.current
    if (img) {
      const transformValue = make3dTransformValue({ x, y, scale })
      img.style.transform = transformValue
    }

    // Hide / show the captions when pinch zooming.
    if (captionRef.current && scale > 1) {
      captionRef.current.style.opacity = '0'
    }

    if (captionRef.current && scale <= 1) {
      captionRef.current.style.opacity = '1'
    }
  }, [])

  const lightBoxContent =
    isMobile && ref.current && isDisplayedElement(ref.current) ? (
      <QuickPinchZoom
        onUpdate={handleUpdate}
        doubleTapZoomOutOnMaxScale
        maxZoom={3}
      >
        <div ref={childRef}>{children}</div>
      </QuickPinchZoom>
    ) : (
      <>
        {children}

        <FullscreenIconButton
          size="medium"
          className={isActive ? '' : 'fullscreen-button'}
          onClick={() => display(ref.current!)}
        >
          <FullscreenIcon color="primary" width="16" height="16" />
        </FullscreenIconButton>
      </>
    )

  return (
    <>
      {isActive && (
        // When the lighbox is active: show a backdrop, and a header with an ExitFullscreenIcon.
        <>
          <Backdrop />

          <Header>
            <ExitFullscreenIconButton size="small" onClick={() => close()}>
              <ExitFullscreenIcon color="primary" width="18" height="18" />
            </ExitFullscreenIconButton>
          </Header>
        </>
      )}

      <LightboxMediaContainer
        ref={ref}
        style={displayedStyle}
        isActive={isActive}
      >
        {lightBoxContent}
      </LightboxMediaContainer>

      <LightBoxCaption
        isActive={isActive}
        style={{
          transform: displayedStyle.transform,
          width: displayedStyle.width,
        }}
        ref={captionRef}
      >
        {caption}
      </LightBoxCaption>
    </>
  )
}

const LightBoxCaption = styled.figcaption<{ isActive?: boolean }>`
  padding-top: 8px;
  ${lsdUtils.typography('body3')}
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.isActive &&
    `
    ${lsdUtils.typography('body1')}
    z-index: 202;

    // The following will prevent very large captions from overflowing / being cut off.
    height: 72px;
    overflow: auto;
    `}

  // Edge case: when users are pinch zooming and press exit fullscreen - opacity will be 0. 
  ${(props) => !props.isActive && `opacity: 1 !important;`}
`

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(var(--lsd-surface-primary));
  z-index: 201;
  opacity: 1;
`

const FullscreenIconButton = styled(IconButton)`
  display: flex;
  transition: opacity 0.4s;
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgb(var(--lsd-text-secondary));

  ${(props) => lsdUtils.breakpoint(props.theme, 'sm', 'up')} {
    // If we're not in mobile mode, hide the button. Only show it when hovering over the container.
    opacity: 0;
    pointer-events: none;
  }
`

const ExitFullscreenIconButton = styled(IconButton)`
  margin-right: 16px;
`

const LightboxMediaContainer = styled.div<{ isActive?: boolean }>`
  transition: all 0.3s ease-in-out;

  // Show the fullscreen button when users hover over the container.
  &:hover .fullscreen-button {
    opacity: 1;
    pointer-events: auto;
  }

  // The following allows for greater mobile pinch zoom.
  ${(props) => lsdUtils.breakpoint(props.theme, 'lg', 'down')} {
    & > div {
      overflow: visible !important;
    }
  }

  // When the lightbox is active and showing media - removes any filters from said media.
  ${(props) =>
    props.isActive &&
    `
  div {
    filter: none;
  }
`}
`

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: ${uiConfigs.navbarRenderedHeight - 1}px;

  z-index: 1000;

  background-color: rgb(var(--lsd-surface-primary));
  transition: top 0.2s;
`
