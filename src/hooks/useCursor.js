import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef(null)
  const reticleRef = useRef(null)

  useEffect(() => {
    // Disable custom cursor entirely on touch devices / mobile screens
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
      return
    }

    const dot = cursorRef.current
    const reticle = reticleRef.current
    if (!dot || !reticle) return

    let mouseX = -100
    let mouseY = -100
    let reticleX = -100
    let reticleY = -100
    let isVisible = false
    let isHovering = false
    let rafId = null

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        reticleX = mouseX
        reticleY = mouseY
        dot.style.opacity = '1'
        reticle.style.opacity = '1'
      }

      // Zero-lag dot positioning
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    }

    // Smooth physics damping for the reticle
    const animate = () => {
      if (isVisible) {
        const factor = isHovering ? 0.35 : 0.22
        reticleX += (mouseX - reticleX) * factor
        reticleY += (mouseY - reticleY) * factor
        reticle.style.transform = `translate3d(${reticleX}px, ${reticleY}px, 0)`
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    // Interactive target lock-on on hover
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, .card, input, select, textarea, [data-cursor], .clickable, .faq__question, .program__card, .why__pillar')
      if (target) {
        isHovering = true
        dot.classList.add('cursor--lock')
        reticle.classList.add('reticle--lock')
      } else {
        isHovering = false
        dot.classList.remove('cursor--lock')
        reticle.classList.remove('reticle--lock')
      }
    }

    const onMouseDown = () => {
      reticle.classList.add('reticle--active')
    }

    const onMouseUp = () => {
      reticle.classList.remove('reticle--active')
    }

    const onMouseLeaveDoc = () => {
      isVisible = false
      dot.style.opacity = '0'
      reticle.style.opacity = '0'
    }

    const onMouseEnterDoc = () => {
      isVisible = true
      dot.style.opacity = '1'
      reticle.style.opacity = '1'
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

  return { cursorRef, followerRef: reticleRef }
}
