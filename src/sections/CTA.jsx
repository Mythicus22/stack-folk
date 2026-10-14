import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './CTA.css'

export default function CTA() {
  const { ref, inView } = useInView(0.15)

  return (
    <section className="cta-section" id="join" ref={ref}>
      {/* Glitch text background */}
      <div className="cta__bg-text" aria-hidden>MAKE</div>

      <div className="container cta__container">
        <div className="cta__geo cta__geo--circle" />

        <motion.div
          className="label"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          STACKFOLK / GET STARTED
        </motion.div>

        <motion.h2
          className="cta__headline"
          initial={{ opacity: 0, y: 90 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          MAKE SOMETHING
          <br />
          WORTH SHARING.
        </motion.h2>

        <motion.p
          className="cta__sub"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          The next good idea probably needs a room, a deadline,
          and a few good people.
        </motion.p>

        <motion.div
          className="cta__buttons"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#" className="btn-primary cta__btn-main">
            <span>Join Stackfolk</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#" className="btn-outline">
            <span>Partner with us</span>
          </a>
        </motion.div>

        {/* Animated ring */}
        <motion.div
          className="cta__ring"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </section>
  )
}
