import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LogoScrollSequence from '../components/LogoScrollSequence'
import './Hero.css'

const TOTAL_FRAMES = 50

export default function Hero() {
  const [frame, setFrame] = useState(1)
  const frameRef = useRef(1)

  // ── Scroll Lock: Keeps user on Hero until 3D animation completes ──
  useEffect(() => {
    let accumulatedDelta = 0
    const SENSITIVITY = 30 // smooth scroll step

    const handleWheel = (e) => {
      const scrollY = window.scrollY || window.pageYOffset || 0

      // Only lock when the user is at the top on the Hero section
      if (scrollY > 10) return

      // Scrolling downwards: advance 3D frames 1 -> 50
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
      // Scrolling upwards at top: scrub frames 50 -> 1
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

    // Touch support for mobile / touchpads
    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      const scrollY = window.scrollY || window.pageYOffset || 0
      if (scrollY > 10) return

      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY

      if (deltaY > 15 && frameRef.current < TOTAL_FRAMES) {
        if (e.cancelable) e.preventDefault()
        touchStartY = touchY
        frameRef.current = Math.min(TOTAL_FRAMES, frameRef.current + 2)
        setFrame(frameRef.current)
      } else if (deltaY < -15 && scrollY <= 0 && frameRef.current > 1) {
        if (e.cancelable) e.preventDefault()
        touchStartY = touchY
        frameRef.current = Math.max(1, frameRef.current - 2)
        setFrame(frameRef.current)
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
      <div className="container hero__container">
        <div className="hero__split-grid">
          {/* ── LEFT COLUMN: Big Stackfolk Logo, Tagline & Mission ── */}
          <div className="hero__left">
            <motion.div
              className="hero__status-badge"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="hero__status-dot" />
              <span>STACKFOLK // FOR BUILDERS &amp; FOUNDERS</span>
            </motion.div>

            {/* Enlarged Stackfolk Logo with Cyber Glow & Animation (No Black Background) */}
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

            {/* Tagline & Mission */}
            <motion.div
              className="hero__tagline-group"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero__tagline-text">
                BUILD WHAT&apos;S <span className="hero__tagline-accent">NEXT.</span>
              </h1>

              <p className="hero__description">
                A community for people who turn ambitious ideas into things that work —
                through focused hackathons, honest feedback, and the right people in the room.
              </p>

              <div className="hero__actions">
                <a href="#join" className="btn-primary">
                  <span>Explore Zero-Hack</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#community" className="btn-outline">
                  <span>Meet Community</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: 3D Video Frame Animation + Zero-Hack Event Card ── */}
          <div className="hero__right">
            {/* Frameless, Background-Free 3D Animation */}
            <div className="hero__3d-container">
              <LogoScrollSequence frameIndex={frame} />
            </div>

            {/* The Beautiful Zero-Hack Event Card */}
            <motion.div
              className="hero__event-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
      </div>
    </section>
  )
}
