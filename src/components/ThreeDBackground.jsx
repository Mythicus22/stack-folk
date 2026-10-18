import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeDBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let width = window.innerWidth
    let height = window.innerHeight
    let isMobile = width < 768

    // ── 1. Scene, Camera & WebGL Renderer ──
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(52, width / height, 1, 3000)
    camera.position.set(0, 0, 680)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)

    // ── 2. Binary, Hex & Code Symbol Texture Atlas (No English words) ──
    const SYMBOL_SET = [
      // Binary
      '0', '1', '0', '1', '00', '01', '10', '11', '101', '010', '110', '1001',
      // Hexadecimal
      '0x0', '0x1', '0x7F', '0xFF', '0x2A', '0x42', '7F', 'FF', '2A', 'A3', 'E0', '0x10',
      // Code primitives & symbols
      '//', '::', '<>', '[]', '=>{}', '#0', '*1*', '&&', '||', '>='
    ]

    const textures = []
    const materials = []

    SYMBOL_SET.forEach((symbol) => {
      const c = document.createElement('canvas')
      c.width = 128
      c.height = 128
      const ctx = c.getContext('2d')

      ctx.clearRect(0, 0, 128, 128)
      ctx.font = 'bold 54px "JetBrains Mono", "Courier New", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // High-tech cyber neon styling with subtle glow
      ctx.shadowColor = 'rgba(57, 255, 20, 0.85)'
      ctx.shadowBlur = 12
      ctx.fillStyle = '#39ff14'
      ctx.fillText(symbol, 64, 64)

      // Crisp inner core
      ctx.shadowBlur = 0
      ctx.fillStyle = '#ebffe8'
      ctx.fillText(symbol, 64, 64)

      const texture = new THREE.CanvasTexture(c)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      textures.push(texture)

      const mat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
      materials.push(mat)
    })

    // ── 3. Floating 3D Symbol Particles ──
    const PARTICLE_COUNT = isMobile ? 160 : 320
    const particles = []
    const particleGroup = new THREE.Group()
    scene.add(particleGroup)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const matIndex = i % materials.length
      const material = materials[matIndex].clone()
      const sprite = new THREE.Sprite(material)

      const spreadX = isMobile ? 650 : 1100
      const spreadY = isMobile ? 700 : 900
      const spreadZ = 320

      const baseX = (Math.random() - 0.5) * spreadX
      const baseY = (Math.random() - 0.5) * spreadY
      const baseZ = (Math.random() - 0.5) * spreadZ

      const baseScale = Math.random() * 6 + (isMobile ? 16 : 20)
      sprite.scale.set(baseScale, baseScale, 1)
      sprite.position.set(baseX, baseY, baseZ)
      particleGroup.add(sprite)

      particles.push({
        sprite,
        baseX,
        baseY,
        baseZ,
        currentX: baseX,
        currentY: baseY,
        currentZ: baseZ,
        vy: (Math.random() - 0.5) * 0.28,
        vx: (Math.random() - 0.5) * 0.12,
        baseOpacity: Math.random() * 0.08 + 0.11,
        currentOpacity: 0.12,
        baseScale,
        orbitOffset: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() > 0.5 ? 1 : -1) * (0.01 + Math.random() * 0.008)
      })
    }

    // ── 4. Deep Telemetry Matrix Points ──
    const DOT_COUNT = isMobile ? 200 : 500
    const dotGeometry = new THREE.BufferGeometry()
    const dotPositions = new Float32Array(DOT_COUNT * 3)

    for (let i = 0; i < DOT_COUNT; i++) {
      dotPositions[i * 3] = (Math.random() - 0.5) * 1400
      dotPositions[i * 3 + 1] = (Math.random() - 0.5) * 1400
      dotPositions[i * 3 + 2] = -Math.random() * 500 - 50
    }
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3))

    const dotMaterial = new THREE.PointsMaterial({
      size: 2.0,
      color: 0x39ff14,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const dotPoints = new THREE.Points(dotGeometry, dotMaterial)
    scene.add(dotPoints)

    // ── 5. Mouse Raycasting to 3D World Space (Z=0 Plane) ──
    const raycaster = new THREE.Raycaster()
    const mouseNDC = new THREE.Vector2(-10, -10)
    const targetNDC = new THREE.Vector2(-10, -10)
    const planeZ0 = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const cursorWorld = new THREE.Vector3(9999, 9999, 0)
    let isMouseOnScreen = false

    let targetCameraX = 0
    let targetCameraY = 0
    let scrollY = window.scrollY || 0
    let targetScrollY = scrollY

    const onMouseMove = (e) => {
      isMouseOnScreen = true
      targetNDC.x = (e.clientX / window.innerWidth) * 2 - 1
      targetNDC.y = -(e.clientY / window.innerHeight) * 2 + 1

      targetCameraX = targetNDC.x * 40
      targetCameraY = targetNDC.y * 30
    }

    const onTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        isMouseOnScreen = true
        const touch = e.touches[0]
        targetNDC.x = (touch.clientX / window.innerWidth) * 2 - 1
        targetNDC.y = -(touch.clientY / window.innerHeight) * 2 + 1

        targetCameraX = targetNDC.x * 35
        targetCameraY = targetNDC.y * 25
      }
    }

    const onTouchEnd = () => {
      isMouseOnScreen = false
    }

    const onScroll = () => {
      targetScrollY = window.scrollY || 0
    }

    const onMouseLeave = () => {
      isMouseOnScreen = false
      targetNDC.set(-10, -10)
      targetCameraX = 0
      targetCameraY = 0
    }

    const onResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      isMobile = width < 768
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchstart', onTouchMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', onResize)

    // ── 6. Main Three.js Animation Loop ──
    let animationFrameId

    const animate = () => {
      mouseNDC.x += (targetNDC.x - mouseNDC.x) * 0.1
      mouseNDC.y += (targetNDC.y - mouseNDC.y) * 0.1

      scrollY += (targetScrollY - scrollY) * 0.08

      camera.position.x += (targetCameraX - camera.position.x) * 0.04
      camera.position.y += (targetCameraY - (scrollY * 0.1 % 280) - camera.position.y) * 0.04
      camera.lookAt(0, -(scrollY * 0.1 % 280), 0)

      if (isMouseOnScreen) {
        raycaster.setFromCamera(mouseNDC, camera)
        raycaster.ray.intersectPlane(planeZ0, cursorWorld)
      } else {
        cursorWorld.set(9999, 9999, 0)
      }

      // Proportions of the "0" (zero) ellipse around cursor
      const Rx = isMobile ? 55 : 72
      const Ry = isMobile ? 85 : 115
      const influenceRadius = 2.4

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Natural floating matrix drift
        p.baseY += p.vy
        p.baseX += p.vx
        if (p.baseY > 480) p.baseY = -480
        if (p.baseY < -480) p.baseY = 480
        if (p.baseX > 580) p.baseX = -580
        if (p.baseX < -580) p.baseX = 580

        // Distance from cursor on normalized "0" metric
        const dx = p.currentX - cursorWorld.x
        const dy = p.currentY - cursorWorld.y
        const distEllipse = Math.sqrt((dx / Rx) * (dx / Rx) + (dy / Ry) * (dy / Ry))

        if (isMouseOnScreen && distEllipse < influenceRadius) {
          // DIRECTLY ON CURSOR (center hole of the 0, distEllipse < 0.6):
          // HIDE completely so nothing concentrates or clumps on top of the cursor!
          if (distEllipse < 0.6) {
            p.currentOpacity += (0 - p.currentOpacity) * 0.3
            // Part outward towards the 0 perimeter
            const pushAngle = Math.atan2(dy, dx)
            p.currentX += Math.cos(pushAngle) * 3
            p.currentY += Math.sin(pushAngle) * 3
          } else {
            // ENVELOP INTO THE "0" PERIMETER:
            // Calculate attraction factor toward the perimeter (peak at distEllipse = 1.0)
            const envelopeFactor = Math.max(0, 1.0 - Math.abs(distEllipse - 1.0) / 1.3)

            p.orbitOffset += p.orbitSpeed
            const angle = Math.atan2(dy, dx) + p.orbitOffset * 0.05

            const targetZeroX = cursorWorld.x + Rx * Math.cos(angle)
            const targetZeroY = cursorWorld.y + Ry * Math.sin(angle)
            const targetZeroZ = 15

            // Smoothly draw onto the "0" outline
            p.currentX += (targetZeroX - p.currentX) * (0.14 * envelopeFactor)
            p.currentY += (targetZeroY - p.currentY) * (0.14 * envelopeFactor)
            p.currentZ += (targetZeroZ - p.currentZ) * (0.14 * envelopeFactor)

            // Dynamic glow on the 0 outline!
            const targetOpacity = p.baseOpacity * (1 - envelopeFactor) + 0.75 * envelopeFactor
            p.currentOpacity += (targetOpacity - p.currentOpacity) * 0.16
          }
        } else {
          // Relax back to natural ambient floating position and opacity
          p.currentOpacity += (p.baseOpacity - p.currentOpacity) * 0.06
          p.currentX += (p.baseX - p.currentX) * 0.05
          p.currentY += (p.baseY - p.currentY) * 0.05
          p.currentZ += (p.baseZ - p.currentZ) * 0.05
        }

        p.sprite.position.set(p.currentX, p.currentY, p.currentZ)
        p.sprite.material.opacity = Math.max(0, p.currentOpacity)
      }

      dotPoints.rotation.y += 0.0002
      dotPoints.rotation.x += 0.0001

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // ── 7. Cleanup on Unmount ──
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchstart', onTouchMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)

      textures.forEach((tex) => tex.dispose())
      materials.forEach((mat) => mat.dispose())
      particles.forEach((p) => p.sprite.material.dispose())
      dotGeometry.dispose()
      dotMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="three-d-background-root" aria-hidden="true">
      <canvas ref={canvasRef} className="three-d-canvas" />
      <div className="three-d-vignette" />
    </div>
  )
}
