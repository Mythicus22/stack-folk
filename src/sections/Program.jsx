import { motion } from 'framer-motion'
import './Program.css'

const programs = [
  {
    num: '01',
    time: '09:00 — 10:00',
    title: 'Kickoff & Team Assembly',
    desc: 'Keynote & problem briefs. Provisioning RPC nodes, agent SDKs, and matching solo builders into agile squads.',
    tag: 'HOUR 01',
  },
  {
    num: '02',
    time: '10:00 — 14:00',
    title: 'Architecture & Agent Loops',
    desc: 'Deep coding sprint. Setting up autonomous decision cycles, tool integrations, and ERC-4337 smart agent wallets.',
    tag: 'HOURS 02–05',
  },
  {
    num: '03',
    time: '14:00 — 18:00',
    title: 'Onchain Swarms & Verification',
    desc: '1-on-1 mentor reviews. Stress-testing multi-agent coordination, zkML inference, and deploying contracts on testnet.',
    tag: 'HOURS 06–09',
  },
  {
    num: '04',
    time: '18:00 — 21:00',
    title: 'Code Freeze & Live Demos',
    desc: 'Repositories locked at 19:00. Every team demonstrates real autonomous transactions live on stage for jury scoring.',
    tag: 'HOURS 10–12',
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
          02 / 12-HOUR HACKATHON SCHEDULE
        </motion.div>

        <div className="program__header">
          <motion.h2
            className="program__headline"
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            12 Hours.
            <br />
            <span className="program__headline--outline">Real Shipped Systems.</span>
          </motion.h2>

          <motion.p
            className="program__sub"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            A high-intensity sprint designed to push beyond slide decks.
            You walk in with an idea at 9 AM and walk out at 9 PM with an autonomous onchain agent.
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
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="program__card-top">
                <span className="program__card-num">{p.time}</span>
                <span className="program__card-tag">{p.tag}</span>
              </div>
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
          <span>ZERO-HACK #1 // 10 JAN — 12 HOURS TO BUILD AUTONOMOUS SYSTEMS.</span>
          <a href="#hackathons" className="program__banner-link">
            Apply now →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
