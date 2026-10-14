import { useEffect, useRef } from 'react'

export default function ThreeDBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let animationFrameId

    // Mouse tracking for 3D tilt
    let targetTiltX = 0
    let targetTiltY = 0
    let currentTiltX = 0
    let currentTiltY = 0

    const handleMouseMove = (e) => {
      targetTiltX = (e.clientX / width - 0.5) * 0.4
      targetTiltY = (e.clientY / height - 0.5) * 0.3
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize)

    // 3D Particles
    const PARTICLE_COUNT = 80
    const particles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 1400,
        z: Math.random() * 1200 + 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
      })
    }

    // 3D Floating Wireframe Objects
    const createCube = (cx, cy, cz, size) => {
      const s = size / 2
      const vertices = [
        [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
        [-s, -s, s],  [s, -s, s],  [s, s, s],  [-s, s, s],
      ]
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // back
        [4, 5], [5, 6], [6, 7], [7, 4], // front
        [0, 4], [1, 5], [2, 6], [3, 7], // connectors
      ]
      return { cx, cy, cz, vertices, edges, rx: 0, ry: 0, rz: 0 }
    }

    const createOctahedron = (cx, cy, cz, size) => {
      const s = size * 0.8
      const vertices = [
        [0, -s, 0], [0, s, 0],
        [-s, 0, 0], [s, 0, 0],
        [0, 0, -s], [0, 0, s]
      ]
      const edges = [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 4], [4, 3], [3, 5], [5, 2]
      ]
      return { cx, cy, cz, vertices, edges, rx: 0, ry: 0, rz: 0 }
    }

    const shapes = [
      createCube(-380, -120, 600, 100),
      createOctahedron(420, -180, 750, 110),
      createCube(340, 220, 500, 80),
      createOctahedron(-420, 260, 700, 90),
    ]

    const rotatePoint = (x, y, z, rx, ry, rz) => {
      // Rotate around X
      let y1 = y * Math.cos(rx) - z * Math.sin(rx)
      let z1 = y * Math.sin(rx) + z * Math.cos(rx)
      // Rotate around Y
      let x2 = x * Math.cos(ry) + z1 * Math.sin(ry)
      let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry)
      // Rotate around Z
      let x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz)
      let y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz)
      return [x3, y3, z2]
    }

    const fov = 500
    let gridOffset = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Smooth tilt interpolation
      currentTiltX += (targetTiltX - currentTiltX) * 0.05
      currentTiltY += (targetTiltY - currentTiltY) * 0.05

      const originX = width / 2 + currentTiltX * 80
      const originY = height / 2 + currentTiltY * 60

      // ── 1. 3D Horizon Perspective Grid ──
      gridOffset = (gridOffset + 0.6) % 60
      const horizonY = height * 0.68 + currentTiltY * 80
      const gridZStart = 100
      const gridZEnd = 1400

      ctx.save()
      ctx.lineWidth = 1

      // Longitudinal lines (perspective converging to horizon center)
      const numLongLines = 26
      for (let i = -numLongLines; i <= numLongLines; i++) {
        const xWorld = i * 75
        // Near point
        const scaleNear = fov / gridZStart
        const xNear = originX + xWorld * scaleNear
        const yNear = originY + 280 * scaleNear

        // Far point
        const scaleFar = fov / gridZEnd
        const xFar = originX + xWorld * scaleFar
        const yFar = originY + 280 * scaleFar

        const alpha = Math.max(0, 0.12 - Math.abs(i) * 0.004)
        ctx.strokeStyle = `rgba(57, 255, 20, ${alpha})`
        ctx.beginPath()
        ctx.moveTo(xNear, yNear)
        ctx.lineTo(xFar, yFar)
        ctx.stroke()
      }

      // Transverse lines (moving towards camera)
      for (let z = gridZStart + (gridOffset % 60); z < gridZEnd; z += 60) {
        const scale = fov / z
        const y = originY + 280 * scale
        if (y < horizonY) continue

        const halfWidthWorld = 1600
        const x1 = originX - halfWidthWorld * scale
        const x2 = originX + halfWidthWorld * scale

        const depthFactor = 1 - (z - gridZStart) / (gridZEnd - gridZStart)
        const alpha = depthFactor * 0.14
        ctx.strokeStyle = `rgba(57, 255, 20, ${alpha})`
        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2, y)
        ctx.stroke()
      }
      ctx.restore()

      // ── 2. 3D Floating Particles ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.z -= 0.6
        p.x += p.vx
        p.y += p.vy

        // Recycle if too close or out of bounds
        if (p.z <= 40) p.z = 1200
        if (Math.abs(p.x) > 1200) p.x = (Math.random() - 0.5) * 800
        if (Math.abs(p.y) > 800) p.y = (Math.random() - 0.5) * 600

        const scale = fov / p.z
        const screenX = originX + p.x * scale
        const screenY = originY + p.y * scale

        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
          const depthAlpha = Math.min(0.7, (1 - p.z / 1200) * 0.8)
          const rad = Math.max(0.6, p.size * scale)
          ctx.beginPath()
          ctx.arc(screenX, screenY, rad, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(57, 255, 20, ${depthAlpha})`
          ctx.fill()
        }
      }

      // ── 3. 3D Floating Geometric Polyhedra ──
      shapes.forEach((s, idx) => {
        // Slow deliberate rotation
        s.rx += 0.005 + idx * 0.001
        s.ry += 0.007 + idx * 0.0015
        s.rz += 0.003

        // Gentle floating bob
        const bobY = s.cy + Math.sin(Date.now() * 0.0012 + idx * 2) * 25
        const bobX = s.cx + Math.cos(Date.now() * 0.0009 + idx) * 15

        // Transform vertices
        const projectedVertices = s.vertices.map(([vx, vy, vz]) => {
          const [rx, ry, rz] = rotatePoint(vx, vy, vz, s.rx, s.ry, s.rz)
          const worldX = bobX + rx
          const worldY = bobY + ry
          const worldZ = s.cz + rz
          const scale = fov / worldZ
          return [originX + worldX * scale, originY + worldY * scale, worldZ]
        })

        // Draw edges
        ctx.save()
        ctx.lineWidth = 1.2
        s.edges.forEach(([v1Idx, v2Idx]) => {
          const v1 = projectedVertices[v1Idx]
          const v2 = projectedVertices[v2Idx]
          const avgZ = (v1[2] + v2[2]) / 2
          const depthAlpha = Math.min(0.45, Math.max(0.1, (1 - avgZ / 1100) * 0.55))

          ctx.strokeStyle = `rgba(57, 255, 20, ${depthAlpha})`
          ctx.beginPath()
          ctx.moveTo(v1[0], v1[1])
          ctx.lineTo(v2[0], v2[1])
          ctx.stroke()
        })

        // Draw glowing vertex nodes
        projectedVertices.forEach(([vx, vy, vz]) => {
          const depthAlpha = Math.min(0.8, Math.max(0.2, (1 - vz / 1100) * 0.9))
          ctx.beginPath()
          ctx.arc(vx, vy, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(245, 245, 240, ${depthAlpha})`
          ctx.fill()
        })
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
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
