import { motion } from 'framer-motion'
import './Sponsors.css'

const vp = { once: false, amount: 0.15, margin: '0px 0px -40px 0px' }

export default function Sponsors() {
  return (
    <section className="sponsors section" id="sponsors">
      <div className="container">
        <motion.div
          className="label"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          03 / PROTOCOL PARTNERS
        </motion.div>

        <motion.h2
          className="sponsors__headline"
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Built with teams
          <br />
          backing autonomous agents.
        </motion.h2>

        <motion.p
          className="sponsors__sub"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Zero-Hack is backed by premier Web3 networks, compute providers, and account abstraction protocols
          providing developer bounties, grants, and direct API access.
        </motion.p>

        {/* To Be Announced Soon Showcase */}
        <motion.div
          className="sponsors__tba-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="sponsors__tba-top">
            <div className="sponsors__tba-status">
              <span className="sponsors__tba-pulse" />
              <span>OFFICIAL PARTNER ROSTER</span>
            </div>
            <div className="sponsors__tba-badge">ZERO-HACK // 10 JAN</div>
          </div>

          <div className="sponsors__tba-content">
            <h3 className="sponsors__tba-title">To Be Announced Soon</h3>
            <p className="sponsors__tba-description">
              Our line-up of foundation sponsors, prize bounties, compute credits, and mentoring
              protocols is being finalized and will be revealed ahead of the hackathon.
            </p>
          </div>

          <div className="sponsors__tba-footer">
            <span className="sponsors__tba-meta">Want to support builders with bounties or compute?</span>
            <a
              href="mailto:contact@stackfolk.com?subject=Zero-Hack%20Sponsorship%20Inquiry"
              className="btn-primary sponsors__tba-btn"
            >
              <span>Partner with us</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
