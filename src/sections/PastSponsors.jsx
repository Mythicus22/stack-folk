import { motion } from 'framer-motion'
import './PastSponsors.css'

const track1 = [
  { name: 'IDFC FIRST Bank', logo: '/sponsors/hd/idfc-first-bank.svg', category: 'Banking Partner' },
  { name: "Masters' Union", logo: '/sponsors/hd/masters-union.png', category: 'Academic Partner' },
  { name: 'for STARTUPS (Zoho)', logo: '/sponsors/hd/zoho-for-startups.svg', category: 'Cloud Partner' },
  { name: 'AbhiBus', logo: '/sponsors/hd/abhibus.png', category: 'Travel Partner' },
  { name: 'Tracxn', logo: '/sponsors/hd/tracxn.png', category: 'Market Intelligence' },
  { name: 'Headstart', logo: '/sponsors/hd/headstart.png', category: 'Ecosystem Partner' },
  { name: 'Cravova', logo: '/sponsors/hd/cravova.png', category: 'Beverage Partner' },
  { name: 'KaroStartup', logo: '/sponsors/hd/karostartup.png', category: 'Media Partner' },
  { name: 'StartupNews.fyi', logo: '/sponsors/hd/startupnews.png', category: 'Media Partner' },
  { name: 'Bizsity', logo: '/sponsors/hd/bizsity.svg', category: 'Digital Solutions' },
  { name: 'Delhi Angels', logo: '/sponsors/hd/delhi-angels.jpeg', category: 'Angel Network' },
  { name: 'Tablon', logo: '/sponsors/hd/tablon.svg', category: 'Tech Partner' },
]

const track2 = [
  { name: 'OFIS Square', logo: '/sponsors/hd/ofis-square.png', category: 'Coworking Partner' },
  { name: 'eChai Ventures', logo: '/sponsors/hd/echai-ventures.png', category: 'Founder Community' },
  { name: 'PW IOI', logo: '/sponsors/hd/pw-ioi.png', category: 'Institute of Innovation' },
  { name: "Cheero's", logo: '/sponsors/hd/cheeros.svg', category: 'Snack Partner' },
  { name: 'WORCOZ', logo: '/sponsors/hd/worcoz.png', category: 'Workplace Partner' },
  { name: 'CEDAT Dynamic Nexus', logo: '/sponsors/hd/cedat.png', category: 'Innovation Hub' },
  { name: 'Global AI Community', logo: '/sponsors/hd/global-ai-community.svg', category: 'AI Developers' },
  { name: 'Oritic.in', logo: '/sponsors/hd/oritic.png', category: 'Tech Partner' },
  { name: 'Collabify Growth Labs', logo: '/sponsors/hd/collabify.svg', category: 'Growth Partner' },
  { name: 'Hubooze', logo: '/sponsors/hd/hubooze.svg', category: 'Investor Connect' },
  { name: 'Scentiments Global', logo: '/sponsors/hd/scentiments-global.svg', category: 'Gifting Partner' },
  { name: 'Global Startups Club', logo: '/sponsors/hd/global-startups-club.png', category: 'Startup Network' },
]

const track3 = [
  { name: 'PDI Creators Hub', logo: '/sponsors/hd/pdi-creators-hub.svg', category: 'Creator Hub' },
  { name: 'AIS Signature', logo: '/sponsors/hd/ais-signature.svg', category: 'Premium Events' },
  { name: 'Startups & Life', logo: '/sponsors/hd/startups-and-life.svg', category: 'Media & Newsletter' },
  { name: 'HulChul', logo: '/sponsors/hd/hulchul.svg', category: 'Media Partner' },
  { name: 'Matyaj', logo: '/sponsors/hd/matyaj.svg', category: 'Lifestyle Partner' },
  { name: 'Crispino', logo: '/sponsors/hd/crispino.svg', category: 'Snack Partner' },
  { name: 'BEYOND', logo: '/sponsors/hd/beyond.svg', category: 'Innovation Hub' },
  { name: 'Startup Unplugged', logo: '/sponsors/hd/startup-unplugged.svg', category: 'Podcast & Media' },
  { name: 'AI Nexus', logo: '/sponsors/hd/ai-nexus.svg', category: 'AI Ecosystem' },
  { name: 'LinkedInspire', logo: '/sponsors/hd/linkedinspire.svg', category: 'Growth Community' },
  { name: 'Easy Knowledge Club', logo: '/sponsors/hd/easy-knowledge-club.svg', category: 'Knowledge Partner' },
  { name: 'Guftagu', logo: '/sponsors/hd/guftagu.svg', category: 'Community Partner' },
  { name: 'B-Monogram', logo: '/sponsors/hd/b-monogram.svg', category: 'Brand Partner' },
]

const vp = { once: false, amount: 0.15, margin: '0px 0px -40px 0px' }

export default function PastSponsors() {
  return (
    <section className="past-sponsors section" id="past-sponsors">
      <div className="container">
        {/* Header */}
        <div className="past-sponsors__header">
          <motion.div
            className="label"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            05 / PAST SPONSORS &amp; SUPPORTERS
          </motion.div>

          <motion.h2
            className="past-sponsors__headline"
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Backed by forward-thinking
            <br />
            <span className="past-sponsors__accent">partners &amp; sponsors.</span>
          </motion.h2>

          <motion.p
            className="past-sponsors__sub"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            A proven track record of collaborating with leading financial institutions, tech enterprises,
            venture capital firms, and innovation hubs across India.
          </motion.p>
        </div>
      </div>

      {/* ── Continuous Display Hoarding — Flowing Left to Right with Faster Pace ── */}
      <div className="past-sponsors__hoarding-viewport">
        {/* Track 1 */}
        <div className="past-sponsors__hoarding-track past-sponsors__hoarding-track--speed1">
          {[...track1, ...track1].map((s, idx) => (
            <div key={`t1-${idx}`} className="past-sponsors__hoarding-card">
              <div className="past-sponsors__card-canvas">
                <img
                  src={s.logo}
                  alt={s.name}
                  className="past-sponsors__hoarding-img"
                  loading="lazy"
                />
              </div>
              <div className="past-sponsors__card-footer">
                <span className="past-sponsors__card-name">{s.name}</span>
                <span className="past-sponsors__card-tag">{s.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Track 2 */}
        <div className="past-sponsors__hoarding-track past-sponsors__hoarding-track--speed2">
          {[...track2, ...track2].map((s, idx) => (
            <div key={`t2-${idx}`} className="past-sponsors__hoarding-card">
              <div className="past-sponsors__card-canvas">
                <img
                  src={s.logo}
                  alt={s.name}
                  className="past-sponsors__hoarding-img"
                  loading="lazy"
                />
              </div>
              <div className="past-sponsors__card-footer">
                <span className="past-sponsors__card-name">{s.name}</span>
                <span className="past-sponsors__card-tag">{s.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Track 3 */}
        <div className="past-sponsors__hoarding-track past-sponsors__hoarding-track--speed3">
          {[...track3, ...track3].map((s, idx) => (
            <div key={`t3-${idx}`} className="past-sponsors__hoarding-card">
              <div className="past-sponsors__card-canvas">
                <img
                  src={s.logo}
                  alt={s.name}
                  className="past-sponsors__hoarding-img"
                  loading="lazy"
                />
              </div>
              <div className="past-sponsors__card-footer">
                <span className="past-sponsors__card-name">{s.name}</span>
                <span className="past-sponsors__card-tag">{s.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Box */}
      <div className="container" style={{ marginTop: '48px' }}>
        <motion.div
          className="past-sponsors__cta-box"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="past-sponsors__cta-left">
            <span className="past-sponsors__cta-badge">ZERO-HACK PARTNERSHIPS</span>
            <p className="past-sponsors__cta-title">Want to sponsor or partner with Zero-Hack?</p>
          </div>
          <a
            href="mailto:contact@stackfolk.com?subject=Zero-Hack%20Partner%20Inquiry"
            className="btn-primary"
          >
            <span>Partner with us</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
