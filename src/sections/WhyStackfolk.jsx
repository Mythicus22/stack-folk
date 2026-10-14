import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import './WhyStackfolk.css'

const pillars = [
  {
    num: '01',
    title: 'Make in public',
    desc: 'Build with clarity and show the work. No stealth mode, just shipped products.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="2" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="16" y="2" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="16" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="16" y="16" width="10" height="10" fill="currentColor"/>
      </svg>
    )
  },
  {
    num: '02',
    title: 'Find your people',
    desc: 'Teams form around curiosity, not credentials. Your stack is your handshake.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="18" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 10h2M10 14v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    num: '03',
    title: 'Leave with momentum',
    desc: 'A prototype is the start, not the finish. Ship something real, every time.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L12 8l6 8 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="6" r="3" fill="currentColor"/>
      </svg>
    )
  },
]

export default function WhyStackfolk() {
  const { ref, inView } = useInView(0.1)

  return (
    <section className="why section" id="community" ref={ref}>
      <div className="container">
        <div className="why__grid">
          <div className="why__left">
            <motion.div
              className="label"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              01 / WHY STACKFOLK
            </motion.div>

            <motion.h2
              className="why__headline"
              initial={{ opacity: 0, y: 70 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              The stack is better when the people are.
            </motion.h2>

            <motion.p
              className="why__desc"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Stackfolk is where technical talent meets momentum. We create spaces to make,
              share, challenge, and keep going — long after the demo ends.
            </motion.p>

            {/* Stats */}
            <div className="why__stats">
              {[['500+', 'Builders'], ['12', 'Countries'], ['3', 'Hackathons']].map(([num, label], i) => (
                <motion.div
                  key={label}
                  className="why__stat"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="why__stat-num">{num}</div>
                  <div className="why__stat-label">{label}</div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#join"
              className="why__cta-circle"
              initial={{ scale: 0, rotate: -30 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.14, rotate: 8, transition: { duration: 0.3 } }}
            >
              <span>JOIN</span>
              <span>NOW</span>
              <div className="why__cta-arrow">↗</div>
            </motion.a>
          </div>

          <div className="why__right">
            {pillars.map((p, i) => (
              <motion.div
                key={p.num}
                className="why__pillar card"
                initial={{ opacity: 0, x: 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 6, transition: { duration: 0.3 } }}
              >
                <div className="why__pillar-top">
                  <span className="why__pillar-num">{p.num}</span>
                  <div className="why__pillar-icon">{p.icon}</div>
                </div>
                <div className="why__pillar-divider" />
                <h3 className="why__pillar-title">{p.title}</h3>
                <p className="why__pillar-desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
