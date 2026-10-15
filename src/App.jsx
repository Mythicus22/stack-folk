import { useCursor } from './hooks/useCursor'

import ThreeDBackground from './components/ThreeDBackground'
import Navbar from './components/Navbar'
import Marquee from './components/Marquee'
import Footer from './components/Footer'

import Hero from './sections/Hero'
import WhyStackfolk from './sections/WhyStackfolk'
import Program from './sections/Program'
import ZeroHack from './sections/ZeroHack'
import Sponsors from './sections/Sponsors'
import Community from './sections/Community'
import FAQ from './sections/FAQ'
import CTA from './sections/CTA'

export default function App() {
  const { cursorRef, followerRef } = useCursor()

  return (
    <>
      {/* Precision Cyber Reticle Cursor */}
      <div ref={cursorRef} className="cursor-dot" aria-hidden="true" />
      <div ref={followerRef} className="cursor-reticle" aria-hidden="true">
        <span className="reticle-corner reticle-corner--tl" />
        <span className="reticle-corner reticle-corner--tr" />
        <span className="reticle-corner reticle-corner--bl" />
        <span className="reticle-corner reticle-corner--br" />
      </div>

      {/* Whole-page 3D Background */}
      <ThreeDBackground />

      {/* Subtle Bauhaus Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Page Sections */}
      <main>
        <Hero />
        <Marquee />
        <WhyStackfolk />
        <Program />
        <ZeroHack />
        <Sponsors />
        <Community />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  )
}
