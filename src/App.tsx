import { useState, useRef } from 'react'
import { useScroll, useSpring, motion, AnimatePresence } from 'framer-motion'
import ToonhubHero from './components/ToonhubHero'
import AboutSection from './components/AboutSection'
import QuestSection from './components/QuestSection'
import AnimeIntro from './components/AnimeIntro'
import { RotateCw } from 'lucide-react'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [isRevealingSite, setIsRevealingSite] = useState(false)
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
    restDelta: 0.001,
  })

  return (
    <>
      {/* Anime Studio / Solo Leveling Dimensional Awakening Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <AnimeIntro
            onComplete={() => {
              setShowIntro(false)
              setIsRevealingSite(false)
            }}
            onShatterStart={() => setIsRevealingSite(true)}
          />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{
          opacity: isRevealingSite || !showIntro ? 1 : 0,
          scale: isRevealingSite || !showIntro ? 1 : 0.98,
          filter: isRevealingSite || !showIntro ? 'blur(0px)' : 'blur(8px)',
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full min-h-screen bg-black text-white overflow-x-clip selection:bg-red-600 selection:text-white"
      >
        {/* Floating Replay Intro Trigger (Sleek HUD button in top left) */}
        {!showIntro && (
          <button
            type="button"
            onClick={() => {
              setIsRevealingSite(false)
              setShowIntro(true)
            }}
            title="Replay Anime Intro"
            className="fixed top-3 left-3 sm:top-5 sm:left-6 z-50 inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-black/80 hover:bg-black border border-purple-500/40 hover:border-cyan-400 text-purple-200 hover:text-white text-[10px] sm:text-xs font-orbitron tracking-wider backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] cursor-pointer hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:scale-105"
          >
            <RotateCw className="w-3 h-3 text-cyan-400 animate-spin-slow" />
            <span>REPLAY INTRO</span>
          </button>
        )}

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
              <ToonhubHero isOpen={isRevealingSite || !showIntro} />
            </div>

            {/* Layer 2: Slide-Up About Overlay (z-10) - Rises from 100vh to resting position, slides 3 cards */}
            <AboutSection scrollYProgress={smoothScrollProgress} />

            {/* Layer 3: Quest Section (z-20) - Enters from top of website, reverses on scroll up */}
            <QuestSection scrollYProgress={smoothScrollProgress} />
          </div>
        </div>
      </motion.main>
    </>
  )
}

export default App
