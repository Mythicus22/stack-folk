import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const dot = cursorRef.current
    const follower = followerRef.current
    if (!dot || !follower) return

    let mouseX = -100
    let mouseY = -100
    let followerX = -100
    let followerY = -100
    let isVisible = false
    let rafId = null

    // Direct GPU-accelerated update without layout reflow
    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        followerX = mouseX
        followerY = mouseY
        dot.style.opacity = '1'
        follower.style.opacity = '0.6'
      }

      // Dot moves instantly with zero latency
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    }

    // Smooth physics-damped follower ring (factor 0.20 for responsive smoothness without lag)
    const animate = () => {
      if (isVisible) {
        followerX += (mouseX - followerX) * 0.20
        followerY += (mouseY - followerY) * 0.20
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    // Document-level event delegation for hover states — zero missed elements and zero lag
    const onMouseOver = (e) => {
      const interactive = e.target.closest('a, button, .card, [data-cursor], input, textarea, select, .btn-primary, .btn-outline, .faq__question')
      if (interactive) {
        dot.classList.add('cursor--hover')
        follower.classList.add('cursor-follower--hover')
      } else {
        dot.classList.remove('cursor--hover')
        follower.classList.remove('cursor-follower--hover')
      }
    }

    const onMouseDown = () => {
      dot.classList.add('cursor--click')
      follower.classList.add('cursor-follower--click')
    }

    const onMouseUp = () => {
      dot.classList.remove('cursor--click')
      follower.classList.remove('cursor-follower--click')
    }

    const onMouseLeaveDoc = () => {
      isVisible = false
      dot.style.opacity = '0'
      follower.style.opacity = '0'
    }

    const onMouseEnterDoc = () => {
      isVisible = true
      dot.style.opacity = '1'
      follower.style.opacity = '0.6'
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeaveDoc)
    document.addEventListener('mouseenter', onMouseEnterDoc)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeaveDoc)
      document.removeEventListener('mouseenter', onMouseEnterDoc)
    }
  }, [])

  return { cursorRef, followerRef }
}
