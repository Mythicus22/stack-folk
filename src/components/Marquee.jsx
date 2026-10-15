import './Marquee.css'

const items = ['HACK', 'SHIP', 'LEARN', 'REPEAT']

export default function MarqueeSection() {
  const all = [...items, ...items, ...items, ...items, ...items, ...items]

  return (
    <div className="marquee-section">
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {all.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
