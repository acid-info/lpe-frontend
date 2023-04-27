import { RefObject, useEffect, useRef, useState } from 'react'

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
