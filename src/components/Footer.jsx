import './Footer.css'

const footerLinks = {
  'Zero-Hack': ['10 JAN Sprint', 'Agentic AI Tracks', '12H Schedule', 'Apply Now'],
  'Community': ['Discord', 'X / Twitter', 'GitHub', 'Luma'],
  'Ecosystem': ['Partners', 'Mentors', 'FAQ', 'Manifesto'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        {/* Top */}
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#" className="footer__logo">
              <img src="/logo.png" alt="Stackfolk" className="footer__logo-img" />
            </a>
            <p className="footer__tagline">IDEAS / CODE / IMPACT. A 12-hour hackathon to build real solutions, together.</p>
            <div className="footer__social">
              {['D', 'X', 'G', 'L'].map((s, i) => (
                <a key={i} href="#" className="footer__social-link">{s}</a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="footer__col">
              <div className="footer__col-title">{section}</div>
              <ul className="footer__links">
                {links.map(link => (
                  <li key={link}>
                    <a href={link === 'Apply Now' ? '#hackathons' : link === '12H Schedule' ? '#program' : link === 'FAQ' ? '#faq' : link === 'Partners' ? '#sponsors' : '#'} className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <span>Organised by Stackfolk // Zero-Hack #1 (10 JAN). All rights reserved.</span>
          </div>
          <div className="footer__bottom-right">
            <div className="footer__lets-build">
              <span className="footer__lets-build-text">LET&apos;S BUILD</span>
              <div className="footer__lets-build-dot" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
