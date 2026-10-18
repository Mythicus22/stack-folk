import { motion } from 'framer-motion'
import './CTA.css'

const vp = { once: false, amount: 0.15, margin: '0px 0px -40px 0px' }

export default function CTA() {
  return (
    <section className="cta-section" id="join">
      <div className="container cta__container">
        <motion.div
          className="label"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          ZERO-HACK // 10 JAN
        </motion.div>

        <motion.h2
          className="cta__headline"
          initial={{ opacity: 0, y: 65 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          FROM IDEAS
          <br />
          <span style={{ color: 'var(--green)' }}>TO IMPACT.</span>
        </motion.h2>

        <motion.p
          className="cta__sub"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          12 hours to build autonomous systems that act, own, and coordinate onchain.
          Join the sprint on 10 JAN and build real solutions, together.
        </motion.p>

        <motion.div
          className="cta__buttons"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#hackathons" className="btn-primary cta__btn-main">
            <span>Apply for Zero-Hack</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#sponsors" className="btn-outline">
            <span>Partner with us</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
