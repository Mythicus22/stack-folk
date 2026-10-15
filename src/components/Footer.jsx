import './Footer.css'

const footerLinks = {
  'Hackathons': ['Zero-Hack', 'Schedule', 'Apply', 'Prize Pool'],
  'Community': ['Discord', 'X / Twitter', 'GitHub', 'Luma'],
  'Company': ['About', 'Sponsors', 'Contact', 'Sitemap'],
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
            <p className="footer__tagline">A community for ambitious builders.</p>
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
                    <a href="#" className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <span>© 2025 Stackfolk. All rights reserved.</span>
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
