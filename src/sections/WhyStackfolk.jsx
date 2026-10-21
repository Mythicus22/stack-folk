import { motion } from 'framer-motion'
import './WhyStackfolk.css'

const pillars = [
  {
    num: '01',
    title: 'Collaborate with Builders',
    desc: 'Teams form around curiosity, code, and conviction. No credentials required — your commit history is your handshake.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 10h2M10 14v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    num: '02',
    title: 'Solve Real Problems',
    desc: 'No toy prototypes. Every track addresses high-leverage bottlenecks across AI Agents, Web3, IoT, Cybersecurity, and Open Innovation.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="2" width="10" height="10" stroke="currentColor" strokeWidth="1.5" />
        <rect x="16" y="2" width="10" height="10" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="16" width="10" height="10" stroke="currentColor" strokeWidth="1.5" />
        <rect x="16" y="16" width="10" height="10" fill="currentColor" />
      </svg>
    )
  },
  {
    num: '03',
    title: 'Build What Matters',
    desc: 'From ideas to impact. Walk away with deployed contracts, live testnet transactions, and systems that endure beyond the hackathon.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L12 8l6 8 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="6" r="3" fill="currentColor" />
      </svg>
    )
  },
]

const vp = { once: false, amount: 0.15, margin: '0px 0px -40px 0px' }

export default function WhyStackfolk() {
  return (
    <section className="why section" id="community">
      <div className="container">
        <div className="why__grid">
          <div className="why__left">
            <motion.div
              className="label"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              01 / WHY STACKFOLK
            </motion.div>

            <motion.h2
              className="why__headline"
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              The stack is better when the builders are.
            </motion.h2>

            <motion.p
              className="why__desc"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Stackfolk is a community for builders turning ambitious ideas into things that work.
              We bring together 120 aspiring developers, innovators, and problem-solvers across AI Agents, Web3, IoT, Cybersecurity, and Open Innovation to build, experiment, and collaborate on real-world challenges.
            </motion.p>

            {/* Stats */}
            <div className="why__stats">
              {[['120', 'Builders'], ['5', 'Tracks'], ['12h', 'Sprint Focus']].map(([num, label], i) => (
                <motion.div
                  key={label}
                  className="why__stat"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="why__stat-num">{num}</div>
                  <div className="why__stat-label">{label}</div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#hackathons"
              className="why__cta-circle"
              initial={{ scale: 0, rotate: -25 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={vp}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.14, rotate: 8, transition: { duration: 0.3 } }}
            >
              <span>JOIN</span>
              <span>NOW</span>
            </motion.a>
          </div>

          <div className="why__right">
            {pillars.map((p, i) => (
              <motion.div
                key={p.num}
                className="why__pillar card"
                initial={{ opacity: 0, x: 45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
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
