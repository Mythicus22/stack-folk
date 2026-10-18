/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import './LogoScrollSequence.css'

const TOTAL_FRAMES = 50

export default function LogoScrollSequence({ frameIndex = 1 }) {
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const currentRenderedFrameRef = useRef(1)

  // ── 1. Preload all 50 transparent frames from /frames-transparent ──
  useEffect(() => {
    const images = []

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const paddedIndex = String(i).padStart(3, '0')
      img.src = `/frames-transparent/frame-${paddedIndex}.webp`
      if (i === 1) {
        img.onload = () => {
          const canvas = canvasRef.current
          if (!canvas) return
          const ctx = canvas.getContext('2d', { alpha: true })
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          }
        }
      }
      images.push(img)
    }

    imagesRef.current = images
  }, [])

  // ── 2. Render loop with smooth interpolation for 120 FPS playback ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId

    const targetFrame = Math.min(TOTAL_FRAMES, Math.max(1, frameIndex))

    const render = () => {
      const diff = targetFrame - currentRenderedFrameRef.current
      if (Math.abs(diff) > 0.05) {
        currentRenderedFrameRef.current += diff * 0.32
      } else {
        currentRenderedFrameRef.current = targetFrame
      }

      const activeIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentRenderedFrameRef.current)))
      const img = imagesRef.current[activeIndex - 1]

      if (img && img.complete && img.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [frameIndex])

  return (
    <div className="logo-3d-wrapper">
      <canvas
        ref={canvasRef}
        width={960}
        height={540}
        className="logo-3d-canvas"
      />
    </div>
  )
}
