import './Marquee.css'

const items = [
  'IDEAS / CODE / IMPACT',
  '12-HOUR SPRINT',
  'AGENTIC AI × WEB3',
  'COLLABORATE WITH BUILDERS',
  'SOLVE REAL PROBLEMS',
  'BUILD WHAT MATTERS',
  'FROM IDEAS TO IMPACT',
  '10 JAN'
]

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
