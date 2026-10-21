import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import './FAQ.css'

const faqs = [
  {
    q: 'What is Zero-Hack?',
    a: 'ZeroHack is a 12-hour hackathon by StackFolk, bringing together 120 aspiring developers, innovators, and problem-solvers to build, experiment, and collaborate on real-world challenges. Spanning five tracks—AI Agents, Web3, IoT, Cybersecurity, and Open Innovation—the event aims to create an environment where bold ideas turn into working solutions and talented builders connect beyond boundaries.'
  },
  {
    q: 'How does the 12-hour format work?',
    a: '12 high-intensity hours from 09:00 to 21:00. Kickoff and challenge briefing at 9 AM, followed by two focused build sprints with mentor reviews. Repositories freeze at 19:00, followed by live on-stage demonstrations and awards across the 5 tracks.'
  },
  {
    q: 'Can I join solo or without a team?',
    a: 'Absolutely! Solo builders are warmly welcome. We run a structured team formation session during the first hour (09:00 - 10:00) to help you connect with 120 talented builders across AI Agents, Web3, IoT, Cybersecurity, and Open Innovation.'
  },
  {
    q: 'What can I build at Zero-Hack?',
    a: 'Projects can be built within any of our 5 official tracks: AI Agents (autonomous workflows, swarms, intelligent agents), Web3 (smart contracts, DeFi, decentralized apps), IoT (connected hardware, sensor intelligence), Cybersecurity (threat defense, verifiable systems), and Open Innovation (interdisciplinary solutions).'
  },
  {
    q: 'Is there a cost to participate?',
    a: 'Zero-Hack is completely free for all 120 accepted builders. Food, drinks, compute credits, testnet resources, and mentor access are fully provided.'
  },
  {
    q: 'How are projects evaluated?',
    a: 'Judging follows our core motto: Ideas (novel agentic architecture), Code (technical depth & onchain execution), and Impact (real utility and live testnet verification). Pre-recorded videos are not allowed — live agent execution is mandatory.'
  },
]

const vp = { once: false, amount: 0.15, margin: '0px 0px -40px 0px' }

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <div className="faq__grid">
          <div className="faq__left">
            <motion.div
              className="label"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              05 / FAQ
            </motion.div>
            <motion.h2
              className="faq__headline"
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Questions?
              <br />
              <span className="faq__headline--green">Good ones.</span>
            </motion.h2>
          </div>

          <div className="faq__list">
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                className={`faq__item ${open === i ? 'faq__item--open' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.8, delay: 0.12 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  className="faq__question"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <div className="faq__icon">
                    {open === i ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      className="faq__answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
