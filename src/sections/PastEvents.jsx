import { motion } from 'framer-motion'
import './PastEvents.css'

const eventGlimpses = [
  {
    id: 'group',
    tag: 'SUMMIT 2026 // 60+ FOUNDERS & VCs',
    image: '/events/event-group.jpg',
    span: 'large',
  },
  {
    id: 'audience',
    tag: 'LIVE AUDIENCE // CREATE HALL',
    image: '/events/event-audience.jpg',
    span: 'tall',
  },
  {
    id: 'masters-union',
    tag: 'MASTERS’ UNION // FIRESIDE SESSION',
    image: '/events/event-masters-union.jpg',
    span: 'medium',
  },
  {
    id: 'panel',
    tag: 'PANEL // STARTUP TO SCALE-UP',
    image: '/events/event-panel.jpg',
    span: 'medium',
  },
]

const vp = { once: false, amount: 0.15, margin: '0px 0px -40px 0px' }

export default function PastEvents() {
  return (
    <section className="past-events section" id="past-events">
      <div className="container">
        {/* Header */}
        <div className="past-events__header">
          <div>
            <motion.div
              className="label"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              04 / PAST EDITIONS
            </motion.div>

            <motion.h2
              className="past-events__headline"
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Glimpses of
              <br />
              <span className="past-events__accent">past events.</span>
            </motion.h2>
          </div>

          <motion.p
            className="past-events__desc"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Where bold ideas turn into working solutions and talented builders connect beyond boundaries.
          </motion.p>
        </div>

        {/* Bento Grid — 100% Opaque, Rich Hover Animations, Minimal Clean Badges */}
        <div className="past-events__grid">
          {eventGlimpses.map((item, i) => (
            <motion.div
              key={item.id}
              className={`past-events__card past-events__card--${item.span}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.85, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="past-events__image-wrapper">
                <img
                  src={item.image}
                  alt={item.tag}
                  className="past-events__image"
                  loading="lazy"
                />
                {/* Sleek Floating Bauhaus Tag */}
                <div className="past-events__tag-badge">
                  <span className="past-events__tag-dot" />
                  <span>{item.tag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
