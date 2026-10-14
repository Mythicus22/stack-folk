import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const words = ['HACK', 'SHIP', 'LEARN', 'REPEAT']

export default function Hero() {
  const canvasRef = useRef(null)

  // Particle grid effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const cols = Math.floor(canvas.width / 60)
      const rows = Math.floor(canvas.height / 60)
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            x: (i / cols) * canvas.width + 30,
            y: (j / rows) * canvas.height + 30,
            baseX: (i / cols) * canvas.width + 30,
            baseY: (j / rows) * canvas.height + 30,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.05,
            speed: Math.random() * 0.5 + 0.2,
            offset: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    let t = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.008
      particles.forEach(p => {
        p.x = p.baseX + Math.sin(t * p.speed + p.offset) * 8
        p.y = p.baseY + Math.cos(t * p.speed * 0.7 + p.offset) * 5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(57, 255, 20, ${p.opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } }
  }

  const lineVariants = {
    hidden: { y: 140, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } }
  }

  const fadeUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <section className="hero" id="hero">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* Geometric decorations */}
      <motion.div
        className="hero__geo hero__geo--ring"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="hero__geo hero__geo--square"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 45, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
      <motion.div
        className="hero__geo hero__geo--dot"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container hero__container">
        {/* Label */}
        <motion.div
          className="label hero__label"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          STACKFOLK / COMMUNITY FOR BUILDERS
        </motion.div>

        {/* Main headline */}
        <motion.div
          className="hero__headline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero__headline-line">
            <motion.span variants={lineVariants}>BUILD</motion.span>
          </div>
          <div className="hero__headline-line hero__headline-line--accent">
            <motion.span variants={lineVariants}>WHAT'S</motion.span>
          </div>
          <div className="hero__headline-line">
            <motion.span variants={lineVariants}>NEXT.</motion.span>
          </div>
        </motion.div>

        {/* Sub-content row */}
        <div className="hero__sub">
          <motion.div
            className="hero__description"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
          >
            <p>
              A community for people who turn ambitious ideas into things that work —
              through focused hackathons, honest feedback, and the right people in the room.
            </p>
            <p className="hero__sub-note">Open to developers, designers, founders, and curious minds.</p>
            <div className="hero__buttons">
              <a href="#join" className="btn-primary">
                <span>Explore Zero-Hack</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#community" className="btn-outline">
                <span>Meet the Community</span>
              </a>
            </div>
          </motion.div>

          {/* Event card */}
          <motion.div
            className="hero__event-card"
            initial={{ opacity: 0, x: 80, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__event-header">
              <span className="hero__event-tag">UP NEXT / HACKATHON #1</span>
              <div className="hero__event-live">
                <span className="hero__event-live-dot" />
                LIVE
              </div>
            </div>
            <div className="hero__event-title">ZERO-HACK</div>
            <div className="hero__event-subtitle">Agentic AI × Web3</div>

            <div className="hero__event-badge">
              <div className="hero__event-badge-inner">
                <span>ZERO</span>
                <span>APPLICATIONS</span>
                <span>OPEN</span>
              </div>
            </div>

            <p className="hero__event-desc">
              Build agents that act, own, and coordinate onchain.
            </p>

            <div className="hero__event-details">
              <div className="hero__event-detail">
                <span className="hero__event-detail-label">FORMAT</span>
                <span>48-hour build sprint</span>
              </div>
              <div className="hero__event-detail">
                <span className="hero__event-detail-label">TRACK</span>
                <span>Agentic systems + Web3 primitives</span>
              </div>
              <div className="hero__event-detail">
                <span className="hero__event-detail-label">WHO</span>
                <span>Solo builders + teams</span>
              </div>
            </div>

            <a href="#join" className="hero__event-cta">
              Apply for Zero-Hack
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
