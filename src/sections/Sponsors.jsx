import { motion } from 'framer-motion'
import './Sponsors.css'

const sponsorTiers = [
  {
    tier: 'Founding Partner',
    sponsors: [
      { name: 'TechVault', abbr: 'TV' },
      { name: 'NexLayer', abbr: 'NL' },
    ]
  },
  {
    tier: 'Ecosystem Partner',
    sponsors: [
      { name: 'Chainform', abbr: 'CF' },
      { name: 'BuildOS', abbr: 'BO' },
    ]
  },
  {
    tier: 'Community Partner',
    sponsors: [
      { name: 'DevPulse', abbr: 'DP' },
      { name: 'AgentLabs', abbr: 'AL' },
    ]
  },
  {
    tier: 'Tools Partner',
    sponsors: [
      { name: 'StackKit', abbr: 'SK' },
      { name: 'OpenMesh', abbr: 'OM' },
    ]
  },
]

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
          03 / PARTNERS
        </motion.div>

        <motion.h2
          className="sponsors__headline"
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Built with people
          <br />
          who back builders.
        </motion.h2>

        <motion.p
          className="sponsors__sub"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          We partner with ecosystems, studios, and teams who want to help ambitious work get made.
        </motion.p>

        {/* Sponsors grid */}
        <div className="sponsors__grid">
          {sponsorTiers.map((tier, ti) => (
            <div key={tier.tier} className="sponsors__tier">
              <motion.div
                className="sponsors__tier-label"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={vp}
                transition={{ duration: 0.8, delay: 0.15 + ti * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {tier.tier}
              </motion.div>
              {tier.sponsors.map((s, si) => (
                <motion.div
                  key={s.name}
                  className="sponsors__slot"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.8, delay: 0.2 + (ti * 2 + si) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ borderColor: 'rgba(57,255,20,0.5)', y: -6, transition: { duration: 0.3 } }}
                >
                  <div className="sponsors__slot-abbr">{s.abbr}</div>
                  <div className="sponsors__slot-name">{s.name}</div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        <motion.a
          href="#contact"
          className="sponsors__cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Become a sponsor →
        </motion.a>
      </div>
    </section>
  )
}
