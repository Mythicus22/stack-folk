import { useEffect, useRef } from 'react'

export default function ThreeDBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let animationFrameId
    let isMobile = window.innerWidth < 768

    // Interactive Mouse & Inertia Tracking
    let targetTiltX = 0
    let targetTiltY = 0
    let currentTiltX = 0
    let currentTiltY = 0
    let mouseX = width / 2
    let mouseY = height / 2
    let targetMouseX = width / 2
    let targetMouseY = height / 2
    let scrollY = window.scrollY || 0
    let targetScrollY = scrollY

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
      targetTiltX = (e.clientX / width - 0.5) * 0.45
      targetTiltY = (e.clientY / height - 0.5) * 0.35
    }

    const handleScroll = () => {
      targetScrollY = window.scrollY || 0
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      isMobile = window.innerWidth < 768
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    // ── 3D Projection Math ──
    const fov = 520

    const rotateX = (y, z, angle) => [
      y * Math.cos(angle) - z * Math.sin(angle),
      y * Math.sin(angle) + z * Math.cos(angle)
    ]
    const rotateY = (x, z, angle) => [
      x * Math.cos(angle) + z * Math.sin(angle),
      -x * Math.sin(angle) + z * Math.cos(angle)
    ]
    const rotateZ = (x, y, angle) => [
      x * Math.cos(angle) - y * Math.sin(angle),
      x * Math.sin(angle) + y * Math.cos(angle)
    ]

    // ── 3D Polyhedra Generators ──
    // 1. Tesseract (Hypercube in 3D projection)
    const createTesseract = (cx, cy, cz, size) => {
      const s1 = size * 0.55
      const s2 = size * 0.28
      const v = [
        // Outer cube
        [-s1, -s1, -s1], [s1, -s1, -s1], [s1, s1, -s1], [-s1, s1, -s1],
        [-s1, -s1, s1],  [s1, -s1, s1],  [s1, s1, s1],  [-s1, s1, s1],
        // Inner cube
        [-s2, -s2, -s2], [s2, -s2, -s2], [s2, s2, -s2], [-s2, s2, -s2],
        [-s2, -s2, s2],  [s2, -s2, s2],  [s2, s2, s2],  [-s2, s2, s2],
      ]
      const e = [
        // Outer
        [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
        // Inner
        [8, 9], [9, 10], [10, 11], [11, 8], [12, 13], [13, 14], [14, 15], [15, 12],
        [8, 12], [9, 13], [10, 14], [11, 15],
        // Struts connecting outer to inner
        [0, 8], [1, 9], [2, 10], [3, 11], [4, 12], [5, 13], [6, 14], [7, 15]
      ]
      return { cx, cy, cz, initialY: cy, vertices: v, edges: e, rx: 0.2, ry: 0.3, rz: 0.1, spinSpeed: 0.007, label: 'HYPERCUBE // T-01' }
    }

    // 2. Octahedron with Equator Ring
    const createOctahedron = (cx, cy, cz, size) => {
      const s = size * 0.65
      const v = [
        [0, -s * 1.25, 0], [0, s * 1.25, 0],
        [-s, 0, 0], [s, 0, 0],
        [0, 0, -s], [0, 0, s]
      ]
      const e = [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 4], [4, 3], [3, 5], [5, 2]
      ]
      return { cx, cy, cz, initialY: cy, vertices: v, edges: e, rx: 0.4, ry: 0.1, rz: 0.2, spinSpeed: 0.009, label: 'OCTA // AGENT-Z' }
    }

    // 3. Bauhaus Gyroscopic Rings (Multi-axis gimbal)
    const createGyroscope = (cx, cy, cz, radius) => {
      const segments = 16
      const v = []
      const e = []
      // Ring 1 (XY plane)
      for (let i = 0; i < segments; i++) {
        const a = (i / segments) * Math.PI * 2
        v.push([Math.cos(a) * radius, Math.sin(a) * radius, 0])
        e.push([i, (i + 1) % segments])
      }
      // Ring 2 (XZ plane)
      const offset2 = segments
      for (let i = 0; i < segments; i++) {
        const a = (i / segments) * Math.PI * 2
        v.push([Math.cos(a) * radius * 0.8, 0, Math.sin(a) * radius * 0.8])
        e.push([offset2 + i, offset2 + ((i + 1) % segments)])
      }
      return { cx, cy, cz, initialY: cy, vertices: v, edges: e, rx: 0.5, ry: 0.6, rz: 0, spinSpeed: 0.006, label: 'GIMBAL // STACK' }
    }

    // 4. Geodesic Icosahedron
    const createIcosahedron = (cx, cy, cz, size) => {
      const phi = (1 + Math.sqrt(5)) / 2
      const a = (size * 0.5) / Math.sqrt(1 + phi * phi)
      const b = a * phi
      const v = [
        [-a, b, 0], [a, b, 0], [-a, -b, 0], [a, -b, 0],
        [0, -a, b], [0, a, b], [0, -a, -b], [0, a, -b],
        [b, 0, -a], [b, 0, a], [-b, 0, -a], [-b, 0, a]
      ]
      const e = [
        [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
        [1, 5], [1, 9], [1, 8], [1, 7],
        [2, 11], [2, 10], [2, 6], [2, 3], [2, 4],
        [3, 4], [3, 9], [3, 8], [3, 6],
        [4, 11], [4, 5], [4, 9],
        [5, 9],
        [6, 10], [6, 7], [6, 8],
        [7, 8],
        [8, 9],
        [10, 11]
      ]
      return { cx, cy, cz, initialY: cy, vertices: v, edges: e, rx: 0.1, ry: 0.4, rz: 0.3, spinSpeed: 0.008, label: 'ICOS // NODE-0' }
    }

    // Curated polyhedra positioned along the vertical scroll path
    const shapes = isMobile
      ? [
          createTesseract(180, -180, 580, 85),
          createOctahedron(-180, 280, 620, 90),
        ]
      : [
          createTesseract(420, -220, 540, 110),
          createOctahedron(-400, 20, 580, 105),
          createGyroscope(380, 320, 520, 95),
          createIcosahedron(-380, 640, 600, 110),
        ]

    // ── Floating Cyber Motes (3D particles) ──
    const PARTICLE_COUNT = isMobile ? 30 : 65
    const particles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1800,
        y: (Math.random() - 0.5) * 2200,
        z: Math.random() * 1200 + 80,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.6 + 0.8,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // ── Full-Height 3D Perspective Matrix (Floor & Ceiling Planes + Crosses) ──
    // Grid spans the entire screen with interactive mouse repulsion & wave
    const GRID_COLS = isMobile ? 12 : 20
    const GRID_SPACING = isMobile ? 85 : 75
    const GRID_DEPTH_START = 80
    const GRID_DEPTH_END = 1100
    const GRID_DEPTH_STEP = 55
    let gridOffset = 0

    // Main 60-120 FPS Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Smooth interpolation for mouse tilt & coordinates
      currentTiltX += (targetTiltX - currentTiltX) * 0.06
      currentTiltY += (targetTiltY - currentTiltY) * 0.06
      mouseX += (targetMouseX - mouseX) * 0.08
      mouseY += (targetMouseY - mouseY) * 0.08
      scrollY += (targetScrollY - scrollY) * 0.08

      // Screen Vanishing Point with Parallax
      const originX = width / 2 + currentTiltX * 90
      const originY = height / 2 + currentTiltY * 65

      // Scroll-driven camera parallax for polyhedra
      const scrollOffset = (scrollY * 0.35) % 2000

      // ── 1. Cyber Cursor Ambient Light Field (Reacts to Mouse) ──
      const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 340)
      mouseGrad.addColorStop(0, 'rgba(57, 255, 20, 0.12)')
      mouseGrad.addColorStop(0.5, 'rgba(57, 255, 20, 0.03)')
      mouseGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = mouseGrad
      ctx.fillRect(0, 0, width, height)

      // ── 2. Full-Screen 3D Cyber Matrix Planes (Floor + Upper Perspective Grid) ──
      gridOffset = (gridOffset + 0.6) % GRID_DEPTH_STEP
      ctx.save()
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.08)'
      ctx.beginPath()

      // Longitudinal lines spanning full depth
      const numLines = GRID_COLS
      for (let i = -numLines; i <= numLines; i++) {
        const xWorld = i * GRID_SPACING
        const scaleNear = fov / GRID_DEPTH_START
        const scaleFar = fov / GRID_DEPTH_END

        // Lower matrix plane
        const yFloorNear = 280 * scaleNear
        const yFloorFar = 280 * scaleFar
        ctx.moveTo(originX + xWorld * scaleNear, originY + yFloorNear)
        ctx.lineTo(originX + xWorld * scaleFar, originY + yFloorFar)

        // Upper matrix plane (giving full-page 3D room feel)
        const yCeilNear = -280 * scaleNear
        const yCeilFar = -280 * scaleFar
        ctx.moveTo(originX + xWorld * scaleNear, originY + yCeilNear)
        ctx.lineTo(originX + xWorld * scaleFar, originY + yCeilFar)
      }

      // Transverse lines (sweeping forward through depth)
      const halfW = (numLines + 1) * GRID_SPACING
      for (let z = GRID_DEPTH_START + (gridOffset % GRID_DEPTH_STEP); z < GRID_DEPTH_END; z += GRID_DEPTH_STEP) {
        const scale = fov / z
        const yFloor = originY + 280 * scale
        const yCeil = originY - 280 * scale

        // Floor ring
        ctx.moveTo(originX - halfW * scale, yFloor)
        ctx.lineTo(originX + halfW * scale, yFloor)

        // Ceiling ring
        ctx.moveTo(originX - halfW * scale, yCeil)
        ctx.lineTo(originX + halfW * scale, yCeil)
      }
      ctx.stroke()
      ctx.restore()

      // ── 3. Interactive Kinetic Mouse Proximity Grid Ticks ──
      // Near the cursor, render bright neon '+' crosses that deflect slightly with mouse movement
      ctx.save()
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.35)'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      const crossStep = isMobile ? 110 : 80
      for (let gx = -GRID_COLS; gx <= GRID_COLS; gx += 2) {
        for (let gz = GRID_DEPTH_START + 120; gz < 800; gz += crossStep) {
          const scale = fov / gz
          let sx = originX + (gx * GRID_SPACING) * scale
          let sy = originY + 280 * scale

          // Mouse kinetic reaction (warp/repulsion)
          const dx = sx - mouseX
          const dy = sy - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const force = (1 - dist / 180) * 16
            sx += (dx / dist) * force
            sy += (dy / dist) * force
          }

          if (sx > 0 && sx < width && sy > 0 && sy < height) {
            const crossSize = 3.5
            ctx.moveTo(sx - crossSize, sy)
            ctx.lineTo(sx + crossSize, sy)
            ctx.moveTo(sx, sy - crossSize)
            ctx.lineTo(sx, sy + crossSize)
          }
        }
      }
      ctx.stroke()
      ctx.restore()

      // ── 4. Floating 3D Depth Motes (Cyber Dust) ──
      ctx.save()
      ctx.fillStyle = 'rgba(57, 255, 20, 0.55)'
      ctx.beginPath()
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.z -= 0.65
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.03

        if (p.z <= 60) p.z = 1200
        if (Math.abs(p.x) > 1000) p.x = (Math.random() - 0.5) * 800
        if (Math.abs(p.y) > 1200) p.y = (Math.random() - 0.5) * 800

        const scale = fov / p.z
        let sx = originX + p.x * scale
        let sy = originY + (p.y - (scrollY * 0.15)) * scale

        // Wrap vertically
        while (sy < -100) sy += height + 200
        while (sy > height + 100) sy -= height + 200

        // Gentle mouse avoidance
        const dx = sx - mouseX
        const dy = sy - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          sx += (dx / dist) * 8
          sy += (dy / dist) * 8
        }

        const rad = Math.max(0.6, (p.size + Math.sin(p.pulse) * 0.4) * scale)
        ctx.moveTo(sx + rad, sy)
        ctx.arc(sx, sy, rad, 0, Math.PI * 2)
      }
      ctx.fill()
      ctx.restore()

      // ── 5. Bauhaus 3D Polyhedra (Wireframe Solids across the Page) ──
      shapes.forEach((s, idx) => {
        // Continuous rotation + mouse influence
        s.rx += s.spinSpeed
        s.ry += s.spinSpeed * 1.3
        s.rz += s.spinSpeed * 0.5

        // Responsive position tied to scroll & idle bobbing
        const time = Date.now() * 0.001
        const bobY = s.initialY - (scrollOffset * 0.4) + Math.sin(time + idx * 2.2) * 22
        const bobX = s.cx + Math.cos(time * 0.8 + idx) * 16

        // Dynamic 3D rotation with mouse tilt
        const effectiveRx = s.rx + currentTiltY * 0.5
        const effectiveRy = s.ry + currentTiltX * 0.5

        // Project all vertices
        const projected = s.vertices.map(([vx, vy, vz]) => {
          let [y1, z1] = rotateX(vy, vz, effectiveRx)
          let [x2, z2] = rotateY(vx, z1, effectiveRy)
          let [x3, y3] = rotateZ(x2, y1, s.rz)

          const worldX = bobX + x3
          const worldY = bobY + y3
          const worldZ = s.cz + z2

          const scale = fov / Math.max(10, worldZ)
          return [originX + worldX * scale, originY + worldY * scale, worldZ, scale]
        })

        // Draw Wireframe Edges
        ctx.save()
        ctx.lineWidth = 1.2
        ctx.strokeStyle = idx % 2 === 0 ? 'rgba(57, 255, 20, 0.42)' : 'rgba(57, 255, 20, 0.32)'
        ctx.beginPath()
        s.edges.forEach(([i1, i2]) => {
          const v1 = projected[i1]
          const v2 = projected[i2]
          ctx.moveTo(v1[0], v1[1])
          ctx.lineTo(v2[0], v2[1])
        })
        ctx.stroke()
        ctx.restore()

        // Draw Glowing Nodes at Vertices
        ctx.save()
        ctx.fillStyle = 'rgba(57, 255, 20, 0.85)'
        ctx.beginPath()
        projected.forEach(([px, py, pz, pScale]) => {
          const nodeRad = Math.max(1.2, 2.2 * pScale)
          ctx.moveTo(px + nodeRad, py)
          ctx.arc(px, py, nodeRad, 0, Math.PI * 2)
        })
        ctx.fill()
        ctx.restore()

        // Tactical Bauhaus Coordinate Label on Shape Center
        const centerScale = fov / s.cz
        const scX = originX + bobX * centerScale
        const scY = originY + bobY * centerScale
        if (scX > 40 && scX < width - 40 && scY > 40 && scY < height - 40) {
          ctx.save()
          ctx.font = '10px "DM Mono", monospace'
          ctx.fillStyle = 'rgba(57, 255, 20, 0.45)'
          ctx.fillText(`+ ${s.label}`, scX + 22, scY - 14)
          ctx.strokeStyle = 'rgba(57, 255, 20, 0.22)'
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(scX, scY)
          ctx.lineTo(scX + 18, scY - 14)
          ctx.lineTo(scX + 80, scY - 14)
          ctx.stroke()
          ctx.restore()
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="three-d-background-root" aria-hidden="true">
      <canvas ref={canvasRef} className="three-d-canvas" />
      <div className="three-d-ambient-glow" />
      <div className="three-d-vignette" />
    </div>
  )
}
