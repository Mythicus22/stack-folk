import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    // Disable custom cursor on touch devices or small screens
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
      return
    }

    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = -100
    let mouseY = -100
    let isVisible = false

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        cursor.style.opacity = '1'
      }

      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    }

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, .card, input, select, textarea, [data-cursor], .clickable, .faq__question, .program__card, .why__pillar')
      if (target) {
        cursor.classList.add('cursor-circle--hover')
      } else {
        cursor.classList.remove('cursor-circle--hover')
      }
    }

    const onMouseLeaveDoc = () => {
      isVisible = false
      cursor.style.opacity = '0'
    }

    const onMouseEnterDoc = () => {
      isVisible = true
      cursor.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseleave', onMouseLeaveDoc)
    document.addEventListener('mouseenter', onMouseEnterDoc)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseleave', onMouseLeaveDoc)
      document.removeEventListener('mouseenter', onMouseEnterDoc)
    }
  }, [])

  return { cursorRef }
}

