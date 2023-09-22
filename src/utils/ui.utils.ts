import { useTheme } from '@emotion/react'
import React, {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

export const useSticky = <T extends HTMLElement>(dy: number = 0) => {
  const stickyRef = useRef<T>(null)
  const [sticky, setSticky] = useState(false)
  const [offset, setOffset] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!stickyRef.current) {
      return
    }
    setOffset(stickyRef.current.offsetTop)
    setHeight(stickyRef.current.clientHeight)
  }, [stickyRef, setOffset])

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) {
        return
      }
      setSticky(window.scrollY > offset - dy)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dy, setSticky, stickyRef, offset])

  return { stickyRef, sticky, height: sticky ? height : 0 }
}

export const useOutsideClick = <T extends HTMLDivElement = HTMLDivElement>(
  ref: RefObject<T>,
) => {
  const [isOutside, setIsOutside] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: any) {
      const isOutside = !!(ref.current && !ref.current.contains(event.target))
      setIsOutside(isOutside)
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return { isOutside }
}

export const useIsScrolling = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  useEffect(() => {
    let timeout: NodeJS.Timeout
    function handleScroll() {
      setIsScrolling(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setIsScrolling(false), 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setIsScrolling])
  return isScrolling
}

export type HeadingElementsRef = MutableRefObject<{
  [key: string]: HTMLHeadingElement | null
}>

export function useIntersectionObserver(
  setActiveId: (id: string) => void,
): HeadingElementsRef {
  const headingElementsRef: HeadingElementsRef = useRef({})

  useEffect(() => {
    const callback = (headings: IntersectionObserverEntry[]) => {
      headings.forEach((heading) => {
        if (heading.isIntersecting && heading.target instanceof HTMLElement) {
          const targetId = heading.target.getAttribute('id')
          if (targetId) setActiveId(targetId)
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -80% 0px',
    })

    const current = headingElementsRef.current
    Object.values(current).forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => {
      Object.values(current).forEach((element) => {
        if (element) observer.unobserve(element)
      })
    }
  }, [setActiveId])

  return headingElementsRef
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const { width, height } = windowSize
  return {
    width,
    height,
  }
}

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<string | null>(null)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up'

    setLastScrollTop(scrollTop)
    setScrollDirection(scrollDirection)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollTop])

  return scrollDirection
}

export const useIsMobile = () => {
  const theme = useTheme()
  const windowSize = useWindowSize()

  const smWidth = theme.breakpoints.sm.width

  return windowSize.width < smWidth
}

export default useWindowSize
