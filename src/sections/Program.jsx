import { motion } from 'framer-motion'
import './Program.css'

const programs = [
  {
    num: '01',
    title: 'Hackathons',
    desc: 'Focused challenges with real constraints. 24–48 hour sprints that force you to ship.',
    tag: 'FLAGSHIP',
    icon: '⚡',
  },
  {
    num: '02',
    title: 'Build Nights',
    desc: 'Low-pressure sessions to get unstuck. Show your WIP, get feedback, keep moving.',
    tag: 'MONTHLY',
    icon: '🌙',
  },
  {
    num: '03',
    title: 'Demo Rooms',
    desc: 'A sharp stage for useful work, not theatre. Show what you built, to people who get it.',
    tag: 'COMMUNITY',
    icon: '🎯',
  },
]

const vp = { once: false, amount: 0.15, margin: '0px 0px -40px 0px' }

export default function Program() {
  return (
    <section className="program section" id="program">
      {/* Background accent */}
      <div className="program__bg" />

      <div className="container">
        <motion.div
          className="label"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          02 / THE PROGRAM
        </motion.div>

        <div className="program__header">
          <motion.h2
            className="program__headline"
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Short sprints.
            <br />
            <span className="program__headline--outline">Serious outcomes.</span>
          </motion.h2>

          <motion.p
            className="program__sub"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Every format is designed to push you past the planning stage
            and into the thing that actually exists.
          </motion.p>
        </div>

        <div className="program__cards">
          {programs.map((p, i) => (
            <motion.div
              key={p.num}
              className="program__card"
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 1.0, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, transition: { duration: 0.35 } }}
            >
              <div className="program__card-top">
                <span className="program__card-num">{p.num}</span>
                <span className="program__card-tag">{p.tag}</span>
              </div>
              <div className="program__card-icon">{p.icon}</div>
              <h3 className="program__card-title">{p.title}</h3>
              <p className="program__card-desc">{p.desc}</p>
              <div className="program__card-corner" />
            </motion.div>
          ))}
        </div>

        {/* Banner strip */}
        <motion.div
          className="program__banner"
          initial={{ opacity: 0, scaleX: 0.9 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={vp}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>ZERO-HACK IS WHERE WE START.</span>
          <a href="#join" className="program__banner-link">
            Apply now →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
