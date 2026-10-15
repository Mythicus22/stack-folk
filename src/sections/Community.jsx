import { motion } from 'framer-motion'
import './Community.css'

const channels = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M18.6 4.8C17.2 4.1 15.7 3.6 14.1 3.3c-.2.3-.4.7-.5 1-1.7-.2-3.4-.2-5.1 0C8.4 4 8.2 3.6 8 3.3 6.4 3.6 4.9 4.1 3.5 4.8 1 8.7.3 12.5 1 16.2c1.7 1.3 3.4 2 5 2.5.4-.5.8-1.1 1.1-1.7-.6-.2-1.2-.5-1.7-.8l.4-.3c3.3 1.5 6.9 1.5 10.2 0l.4.3c-.5.3-1.1.6-1.7.8.3.6.7 1.2 1.1 1.7 1.6-.5 3.3-1.2 5-2.5.8-4.3-.1-8.1-2.2-11.4zM8.3 14c-.9 0-1.7-.8-1.7-1.8s.7-1.8 1.7-1.8 1.7.8 1.7 1.8-.7 1.8-1.7 1.8zm5.4 0c-.9 0-1.7-.8-1.7-1.8s.7-1.8 1.7-1.8 1.7.8 1.7 1.8-.7 1.8-1.7 1.8z" fill="currentColor"/>
      </svg>
    ),
    label: 'Discord',
    sublabel: 'Daily conversation',
    count: '2.4k',
    link: '#',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M17.5 2.5h-13A2 2 0 002.5 4.5v13a2 2 0 002 2h13a2 2 0 002-2v-13a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.5 10v5M11 7.5V15M14.5 12.5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'X / Twitter',
    sublabel: 'Announcements + notes',
    count: '5.1k',
    link: '#',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2.5" y="2.5" width="17" height="17" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 11h8M11 7v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Luma',
    sublabel: 'Events + rooms',
    count: '180',
    link: '#',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2C6 2 2 6 2 11c0 4 2.6 7.4 6.2 8.6.5.1.6-.2.6-.4v-1.5c-2.6.6-3.1-1.2-3.1-1.2-.4-1.1-1-1.4-1-1.4-.9-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9.3 9.3 0 015 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.6-2.2 4.4-4.3 4.6.3.3.6.9.6 1.8v2.7c0 .2.2.5.6.4C17.4 18.4 20 15 20 11c0-5-4-9-9-9z" fill="currentColor"/>
      </svg>
    ),
    label: 'GitHub',
    sublabel: 'Builds in public',
    count: '340',
    link: '#',
  },
]

const vp = { once: false, amount: 0.15, margin: '0px 0px -40px 0px' }

export default function Community() {
  return (
    <section className="community section" id="about">
      <div className="container">
        <div className="community__grid">
          {/* Left */}
          <div className="community__left">
            <motion.div
              className="label"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              04 / JOIN THE SIGNAL
            </motion.div>

            <motion.h2
              className="community__headline"
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              No spectators.
              <br />
              <span className="community__headline--accent">Just participants.</span>
            </motion.h2>

            <motion.p
              className="community__desc"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Join the signal: find collaborators, share work-in-progress, get
              feedback, and show up for the next build.
            </motion.p>

            {/* Participation tags */}
            <motion.div
              className="community__tags"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {['Developers', 'Designers', 'Founders', 'Curious Minds'].map((tag) => (
                <span key={tag} className="community__tag">{tag}</span>
              ))}
            </motion.div>
          </div>

          {/* Right — Channel grid */}
          <div className="community__channels">
            {channels.map((ch, i) => (
              <motion.a
                key={ch.label}
                href={ch.link}
                className="community__channel card"
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.03, y: -6, transition: { duration: 0.3 } }}
              >
                <div className="community__channel-top">
                  <div className="community__channel-icon">{ch.icon}</div>
                  <div className="community__channel-count">{ch.count}</div>
                </div>
                <div className="community__channel-label">{ch.label}</div>
                <div className="community__channel-sub">{ch.sublabel}</div>
                <div className="community__channel-arrow">→</div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
