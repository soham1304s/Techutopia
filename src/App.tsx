import { useRef } from 'react'
import { useScroll, useSpring } from 'framer-motion'
import ToonhubHero from './components/ToonhubHero'
import AboutSection from './components/AboutSection'
import QuestSection from './components/QuestSection'
import './App.css'

function App() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  })

  // Smooth responsive spring physics: eliminates sluggish lag on mobile while maintaining cinematic smoothness
  const smoothScrollProgress = useSpring(rawScrollProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.15,
    restDelta: 0.0001,
  })

  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-clip selection:bg-red-600 selection:text-white">
      {/* 
        SCENE CONTROLLER:
        Provides the scroll runway for:
        1. Fixed Hero (z-1)
        2. Slide-up About Section (z-10) with 3 sliding character cards
        3. Quest Section (z-20) descending from top with Noomo-style 3D floating horizontal scroll cards
      */}
      <div id="hero-about-scene" ref={sceneRef} className="relative w-full h-[850vh] sm:h-[950vh]">
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden">
          {/* Layer 1: Fixed Hero (z-1) - Remains fixed in place */}
          <div className="absolute inset-0 z-1 pointer-events-auto">
            <ToonhubHero />
          </div>

          {/* Layer 2: Slide-Up About Overlay (z-10) - Rises from 100vh to resting position, slides 3 cards */}
          <AboutSection scrollYProgress={smoothScrollProgress} />

          {/* Layer 3: Quest Section (z-20) - Enters from top of website, reverses on scroll up */}
          <QuestSection scrollYProgress={smoothScrollProgress} />
        </div>
      </div>
    </main>
  )
}

export default App
