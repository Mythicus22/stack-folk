import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggles inView whenever entering or leaving the viewport!
        // This ensures animations trigger every time you scroll to them.
        setInView(entry.isIntersecting)
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px' // Triggers when the section is visibly 50px inside viewport
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

export function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!start) {
      setCount(0)
      return
    }
    const startTime = performance.now()
    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [end, duration, start])

  return count
}
