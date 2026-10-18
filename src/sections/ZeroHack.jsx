import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ZeroHack.css'

const steps = [
  { num: '#1', label: 'Collaborate with Builders' },
  { num: '#2', label: 'Solve Real Problems' },
  { num: '#3', label: 'Build What Matters' },
]

const tracks = [
  { label: 'Autonomous Onchain Agents', color: 'green' },
  { label: 'Multi-Agent Swarms & A2A', color: 'white' },
  { label: 'Verifiable AI & zkML', color: 'outline' },
  { label: 'Agent Wallets (ERC-4337)', color: 'green' },
]

const vp = { once: false, amount: 0.15, margin: '0px 0px -40px 0px' }

export default function ZeroHack() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="zerohack section" id="hackathons">
      <div className="zerohack__split">
        {/* Left — Large text */}
        <div className="zerohack__left">
          <motion.div
            className="zerohack__big-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>IDEAS</span>
            <span>CODE</span>
            <span className="zerohack__accent">IMPACT</span>
          </motion.div>

          <motion.div
            className="zerohack__left-geo"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />

        </div>

        {/* Right — Content */}
        <div className="zerohack__right">
          <motion.div
            className="label"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            ZERO-HACK #1 // 10 JAN
          </motion.div>

          <motion.h2
            className="zerohack__headline"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Give your agent a wallet, a world, and a reason to act.
          </motion.h2>

          <motion.p
            className="zerohack__desc"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Zero-Hack is a 12-hour high-stakes sprint for engineers, researchers, and
            Web3 builders. Build autonomous software that holds balances, triggers
            smart contracts, negotiates with other agents, and executes onchain.
          </motion.p>

          {/* Tracks */}
          <motion.div
            className="zerohack__tracks"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {tracks.map((t, i) => (
              <span key={i} className={`zerohack__track zerohack__track--${t.color}`}>
                {t.label}
              </span>
            ))}
          </motion.div>

          {/* Steps */}
          <div className="zerohack__steps">
            {steps.map((s, i) => (
              <motion.button
                key={i}
                className={`zerohack__step ${activeStep === i ? 'zerohack__step--active' : ''}`}
                onClick={() => setActiveStep(i)}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ duration: 0.8, delay: 0.35 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="zerohack__step-num">{s.num}</span>
                <span className="zerohack__step-label">{s.label}</span>
                <AnimatePresence>
                  {activeStep === i && (
                    <motion.span
                      className="zerohack__step-bar"
                      layoutId="step-bar"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          <motion.a
            href="#join"
            className="btn-primary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>Read the brief</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
