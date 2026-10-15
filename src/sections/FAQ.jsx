import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import './FAQ.css'

const faqs = [
  {
    q: 'Who is Stackfolk for?',
    a: 'Anyone who builds — developers, designers, technical founders, and curious people who want to make real things. If you write code, design systems, or prototype ideas, you\'re the right person.'
  },
  {
    q: 'Can I join without a team?',
    a: 'Absolutely. Many of our best participants came solo and found their team at the event. We have structured team formation sessions before every hackathon to help people connect.'
  },
  {
    q: 'How do I partner with Zero-Hack?',
    a: 'Reach out to us via the contact form or join our Discord and ping us directly. We offer founding, ecosystem, community, and tools partnership tiers with different involvement levels.'
  },
  {
    q: 'What can I build at Zero-Hack?',
    a: 'Zero-Hack is focused on Agentic AI and Web3. Think: autonomous agents that transact onchain, AI systems that use wallets, multi-agent coordination, and human-machine hybrid teams.'
  },
  {
    q: 'Is there a cost to participate?',
    a: 'Hackathons are free to enter. Community membership is open and free. We believe access shouldn\'t be a barrier to building.'
  },
]

const vp = { once: false, amount: 0.15, margin: '0px 0px -40px 0px' }

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="faq section">
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
