import { motion } from 'framer-motion'
import './Hero.css'

const words = ['HACK', 'SHIP', 'LEARN', 'REPEAT']

export default function Hero() {
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
