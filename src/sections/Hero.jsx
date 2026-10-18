import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LogoScrollSequence from '../components/LogoScrollSequence'
import './Hero.css'

const TOTAL_FRAMES = 50

export default function Hero() {
  const [frame, setFrame] = useState(1)
  const frameRef = useRef(1)

  // ── Scroll Lock: Keeps user on Hero until 3D animation completes ──
  // Works on desktop wheel & mobile touch
  useEffect(() => {
    let accumulatedDelta = 0
    const SENSITIVITY = 25

    const handleWheel = (e) => {
      const scrollY = window.scrollY || window.pageYOffset || 0

      // Only lock when the user is at the top of the page on Hero
      if (scrollY > 15) return

      // Downward scroll: advance 3D frames 1 -> 50
      if (e.deltaY > 0 && frameRef.current < TOTAL_FRAMES) {
        e.preventDefault()
        accumulatedDelta += e.deltaY
        const steps = Math.floor(accumulatedDelta / SENSITIVITY)
        if (steps > 0) {
          accumulatedDelta %= SENSITIVITY
          frameRef.current = Math.min(TOTAL_FRAMES, frameRef.current + steps)
          setFrame(frameRef.current)
        }
      }
      // Upward scroll at top: scrub frames backwards 50 -> 1
      else if (e.deltaY < 0 && scrollY <= 0 && frameRef.current > 1) {
        e.preventDefault()
        accumulatedDelta += e.deltaY
        const steps = Math.floor(Math.abs(accumulatedDelta) / SENSITIVITY)
        if (steps > 0) {
          accumulatedDelta %= SENSITIVITY
          frameRef.current = Math.max(1, frameRef.current - steps)
          setFrame(frameRef.current)
        }
      }
    }

    // ── Touch support for mobile devices ──
    let touchStartY = 0
    let touchAccum = 0

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
      touchAccum = 0
    }

    const handleTouchMove = (e) => {
      const scrollY = window.scrollY || window.pageYOffset || 0
      if (scrollY > 15) return

      const currentY = e.touches[0].clientY
      const deltaY = touchStartY - currentY

      if (deltaY > 0 && frameRef.current < TOTAL_FRAMES) {
        if (e.cancelable) e.preventDefault()
        touchAccum += deltaY
        touchStartY = currentY
        const steps = Math.floor(touchAccum / 12)
        if (steps > 0) {
          touchAccum %= 12
          frameRef.current = Math.min(TOTAL_FRAMES, frameRef.current + steps)
          setFrame(frameRef.current)
        }
      } else if (deltaY < 0 && scrollY <= 0 && frameRef.current > 1) {
        if (e.cancelable) e.preventDefault()
        touchAccum += Math.abs(deltaY)
        touchStartY = currentY
        const steps = Math.floor(touchAccum / 12)
        if (steps > 0) {
          touchAccum %= 12
          frameRef.current = Math.max(1, frameRef.current - steps)
          setFrame(frameRef.current)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <section className="hero" id="hero">
      {/* ── 1. MAIN HERO: Big Stackfolk Logo + Description + Buttons on Left | Very Very Big 3D on Right ── */}
      <div className="container hero__main-container">
        <div className="hero__split-grid">
          {/* Left Column */}
          <div className="hero__left-content">
            <motion.div
              className="hero__status-badge"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="hero__status-dot" />
              <span>STACKFOLK COMMUNITY // ZERO-HACK #1</span>
            </motion.div>

            {/* Big Stackfolk Logo */}
            <motion.div
              className="hero__logo-wrapper"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero__logo-aura" aria-hidden="true" />
              <img
                src="/logo.png"
                alt="Stackfolk"
                className="hero__stackfolk-logo"
              />
            </motion.div>

            {/* Paragraph Description */}
            <motion.p
              className="hero__description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A community for people who turn ambitious ideas into things that work — through focused hackathons, honest feedback, and the right people in the room.
            </motion.p>

            {/* 2 Buttons */}
            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <a href="#hackathons" className="btn-primary">
                <span>Explore Zero-Hack</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#program" className="btn-outline">
                <span>12-Hour Format</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Very Very Big 3D Animation */}
          <div className="hero__right-3d">
            <div className="hero__3d-wrapper">
              <LogoScrollSequence frameIndex={frame} />
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. BELOW HERO: Bauhaus Section (Build What's Next in 3 Lines on Left | Zero-Hack Card on Right) ── */}
      <div className="hero__bauhaus-section">
        <div className="container hero__bauhaus-container">
          {/* Left: BUILD WHAT'S NEXT in 3 Lines */}
          <div className="hero__bauhaus-left">
            <div className="label hero__bauhaus-label">STACKFOLK / MANIFESTO</div>
            <div className="hero__bauhaus-headline">
              <motion.div
                className="hero__bauhaus-line"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                BUILD
              </motion.div>
              <motion.div
                className="hero__bauhaus-line hero__bauhaus-line--accent"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.12 }}
              >
                WHAT&apos;S
              </motion.div>
              <motion.div
                className="hero__bauhaus-line"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.24 }}
              >
                NEXT.
              </motion.div>
            </div>
          </div>

          {/* Right: Zero-Hack Event Card following Bauhaus Design */}
          <div className="hero__bauhaus-right">
            <motion.div
              className="hero__event-card"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.2 }}
            >
              <div className="hero__event-header">
                <span className="hero__event-tag">COMMUNITY ORGANISES // 10 JAN</span>
                <div className="hero__event-live">
                  <span className="hero__event-live-dot" />
                  APPLICATIONS OPEN
                </div>
              </div>

              <div className="hero__event-title">ZEROHACK</div>
              <div className="hero__event-subtitle">Agentic AI × Web3 // 12-Hour Sprint</div>

              <div className="hero__event-badge">
                <div className="hero__event-badge-inner">
                  <span>10 JAN</span>
                  <span>12 HOURS</span>
                  <span>SPRINT</span>
                </div>
              </div>

              <p className="hero__event-desc">
                A 12-hour hackathon to build real solutions, together. Turn ideas into code and code into impact.
              </p>

              <div className="hero__event-details">
                <div className="hero__event-detail">
                  <span className="hero__event-detail-label">DATE &amp; TIME</span>
                  <span>10 JAN // 09:00 — 21:00</span>
                </div>
                <div className="hero__event-detail">
                  <span className="hero__event-detail-label">FORMAT</span>
                  <span>12-Hour High-Intensity Build Sprint</span>
                </div>
                <div className="hero__event-detail">
                  <span className="hero__event-detail-label">THEME</span>
                  <span>Autonomous Onchain Agents &amp; Swarms</span>
                </div>
                <div className="hero__event-detail">
                  <span className="hero__event-detail-label">WHO</span>
                  <span>AI Researchers, Web3 Devs &amp; Solo Builders</span>
                </div>
              </div>

              <a href="#join" className="hero__event-cta">
                Apply for Zero-Hack
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
