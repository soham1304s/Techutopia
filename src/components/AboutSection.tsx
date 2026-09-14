import React, { useState, useRef } from 'react';
import { motion, MotionValue, useTransform, useMotionValueEvent } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Layers,
  Fingerprint,
  Database,
  CheckCircle2,
  ChevronRight,
  Flame,
  Crown,
  ShieldCheck,
  Box,
} from 'lucide-react';
import figma5Img from './figma5.webp';
import figma6Img from './figma6.webp';
import figma7Img from './figma7.webp';

// Iconic Uzumaki Clan Spiral Crest
const UzumakiSpiral: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    className={className}
  >
    <path d="M12 12c-1.5 0-2.5-1-2.5-2.5 0-1.7 1.3-3 3-3 2.5 0 4.5 2 4.5 4.5 0 3-2.5 5.5-5.5 5.5-3.6 0-6.5-2.9-6.5-6.5 0-4.4 3.6-8 8-8 5.2 0 9.5 4.3 9.5 9.5" />
  </svg>
);

interface AboutSectionProps {
  scrollYProgress: MotionValue<number>;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ scrollYProgress }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Track active slide state reactively across 3 slides
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let next = 0;
    if (latest >= 0.48) {
      next = 2;
    } else if (latest >= 0.30) {
      next = 1;
    }
    if (next !== activeSlide) {
      setActiveSlide(next);
    }
  });

  // Panel vertical rise with initial delay:
  // 0% -> 8%: DELAY buffer where Hero is completely undisturbed
  // 8% -> 16%: rises smoothly from 100% offscreen to resting position (0%)
  // 16% -> 58%: stays firmly locked at resting position with full visibility
  // 58% -> 66%: fades out as Quest section descends from the top
  const panelY = useTransform(
    scrollYProgress,
    [0, 0.08, 0.16, 1],
    ['100%', '100%', '0%', '0%'],
    { clamp: true }
  );

  const panelOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.14, 0.58, 0.66, 1],
    [0, 0, 1, 1, 0, 0],
    { clamp: true }
  );

  // Horizontal Track Motion across 3 slides (w-[300%]):
  // 0.00 -> 0.18: Slide 1 (Shinobi Scroll) held in view
  // 0.18 -> 0.32: smoothly slides from 0% to -33.333333% (revealing Slide 2)
  // 0.32 -> 0.42: Slide 2 (Secret Jutsu) held in view
  // 0.42 -> 0.56: smoothly slides from -33.333333% to -66.666667% (revealing Slide 3)
  // 0.56 -> 1.00: stays locked at -66.666667% (Slide 3: Hokage Vault)
  const trackX = useTransform(
    scrollYProgress,
    [0, 0.18, 0.32, 0.42, 0.56, 1],
    ['0%', '0%', '-33.333333%', '-33.333333%', '-66.666667%', '-66.666667%'],
    { clamp: true }
  );

  // Progress line width between 0.18 and 0.56
  const trackProgressWidth = useTransform(
    scrollYProgress,
    [0.18, 0.56],
    ['0%', '100%'],
    { clamp: true }
  );

  const panelPointerEvents = useTransform(scrollYProgress, (latest) =>
    latest > 0.60 ? 'none' : 'auto'
  );

  // Precise smooth scroll helper to jump to a normalized scroll progress
  const scrollToProgress = (targetProgress: number) => {
    const el = document.getElementById('hero-about-scene');
    if (el) {
      const maxScroll = el.offsetHeight - window.innerHeight;
      const targetY = el.offsetTop + maxScroll * targetProgress;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  // Wheel event handler: forwards horizontal trackpad swipes without trapping vertical scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
      window.scrollBy({
        top: e.deltaX * 1.2,
        behavior: 'auto',
      });
    }
  };

  // Touch swipe support for smooth mobile slide navigation
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe gesture (horizontal delta > vertical delta and > 35px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        // Swiped LEFT -> advance to next slide
        if (activeSlide === 0) scrollToProgress(0.36);
        else if (activeSlide === 1) scrollToProgress(0.54);
      } else {
        // Swiped RIGHT -> go back to previous slide
        if (activeSlide === 2) scrollToProgress(0.36);
        else if (activeSlide === 1) scrollToProgress(0.18);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // SVG grain overlay matching the Hero texture
  const grainSvg = `<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='aboutGrain'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#aboutGrain)' opacity='0.08'/></svg>`;
  const grainDataUri = `url("data:image/svg+xml;utf8,${encodeURIComponent(grainSvg)}")`;

  return (
    <div
      id="about"
      className="absolute inset-x-0 top-0 h-full pointer-events-none z-10 flex flex-col justify-start"
    >
      {/* 
        Sliding About Panel (Framer Motion):
        Rises to top-[20vh] on mobile, top-[34vh] on desktop.
        Leaves the top open to the fixed Hero.
        Solid, 100% opaque Naruto Konoha orange-to-white gradient background (zero transparency).
      */}
      <motion.div
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          y: panelY,
          opacity: panelOpacity,
          pointerEvents: panelPointerEvents,
          background: 'linear-gradient(135deg, #e64500 0%, #ff6600 24%, #ff9f1c 50%, #ffe082 78%, #ffffff 100%)',
        }}
        className="pointer-events-auto absolute inset-x-0 bottom-0 top-0 md:top-[50vh] border-t-2 border-[#ff4500] shadow-[0_-25px_60px_rgba(0,0,0,0.85),0_-10px_35px_rgba(255,69,0,0.4)] flex flex-col overflow-hidden select-none touch-pan-y"
      >
        {/* Top Glowing Edge Accent Line - Rasengan / Kurama Chakra Streak */}
        <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#ff4500] via-[#facc15] to-[#ffffff]" />

        {/* Ambient background glow inside the About panel - Golden Sage Chakra Aura */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[70vw] max-w-[800px] h-[250px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(250, 204, 21, 0.4) 0%, rgba(255, 102, 0, 0.22) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* SVG Grain Overlay inside panel */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: grainDataUri,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            zIndex: 1,
          }}
        />

        {/* 
          TOP MINI-NAV & SLIDE INDICATOR BAR:
          Displays current active slide (01 // SHINOBI SCROLL, 02 // SECRET JUTSU, 03 // HOKAGE VAULT),
          rendered in authentic Naruto anime typography.
        */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 pt-1 sm:pt-2.5 flex items-center justify-between border-b border-zinc-900/20 pb-1 sm:pb-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 sm:gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
            {/* Pill 1: Shinobi Scroll */}
            <button
              onClick={() => scrollToProgress(0.18)}
              className="font-naruto flex items-center gap-1 sm:gap-2 px-2 sm:px-3.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border shadow-sm flex-1 sm:flex-initial justify-center"
              style={{
                borderColor: activeSlide === 0 ? '#0b111e' : 'rgba(11, 17, 30, 0.3)',
                backgroundColor: activeSlide === 0 ? '#0b111e' : 'rgba(255, 255, 255, 0.85)',
                color: activeSlide === 0 ? '#facc15' : '#0b111e',
              }}
            >
              <UzumakiSpiral className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${activeSlide === 0 ? 'text-[#ff6600] animate-spin' : 'text-zinc-500'}`} />
              <span className="hidden sm:inline">01 // SHINOBI SCROLL</span>
              <span className="sm:hidden">01 SHINOBI</span>
            </button>

            {/* Pill 2: Secret Jutsu */}
            <button
              onClick={() => scrollToProgress(0.36)}
              className="font-naruto flex items-center gap-1 sm:gap-2 px-2 sm:px-3.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border shadow-sm flex-1 sm:flex-initial justify-center"
              style={{
                borderColor: activeSlide === 1 ? '#0b111e' : 'rgba(11, 17, 30, 0.3)',
                backgroundColor: activeSlide === 1 ? '#0b111e' : 'rgba(255, 255, 255, 0.85)',
                color: activeSlide === 1 ? '#facc15' : '#0b111e',
              }}
            >
              <Flame className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${activeSlide === 1 ? 'text-[#ff6600] animate-pulse' : 'text-zinc-500'}`} />
              <span className="hidden sm:inline">02 // SECRET JUTSU</span>
              <span className="sm:hidden">02 JUTSU</span>
            </button>

            {/* Pill 3: Hokage Vault */}
            <button
              onClick={() => scrollToProgress(0.54)}
              className="font-naruto flex items-center gap-1 sm:gap-2 px-2 sm:px-3.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border shadow-sm flex-1 sm:flex-initial justify-center"
              style={{
                borderColor: activeSlide === 2 ? '#0b111e' : 'rgba(11, 17, 30, 0.3)',
                backgroundColor: activeSlide === 2 ? '#0b111e' : 'rgba(255, 255, 255, 0.85)',
                color: activeSlide === 2 ? '#facc15' : '#0b111e',
              }}
            >
              <Sparkles className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${activeSlide === 2 ? 'text-[#facc15] animate-spin' : 'text-zinc-500'}`} />
              <span className="hidden sm:inline">03 // HOKAGE VAULT</span>
              <span className="sm:hidden">03 VAULT</span>
            </button>
          </div>

          {/* Horizontal Transition Visual Track Bar */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-28 h-2 bg-[#0b111e]/20 border border-[#0b111e]/30 overflow-hidden relative">
              <motion.div
                style={{ width: trackProgressWidth }}
                className="h-full bg-gradient-to-r from-[#ff4500] via-[#ff8800] to-[#facc15]"
              />
            </div>
            <span className="font-naruto text-zinc-950 font-bold text-xs tracking-wider">
              {activeSlide === 0
                ? 'SCROLL FOR SECRET JUTSU →'
                : activeSlide === 1
                ? 'SCROLL FOR HOKAGE VAULT →'
                : '← SCROLL FOR SHINOBI SCROLL'}
            </span>
          </div>
        </div>

        {/* 
          HORIZONTAL SLIDING TRACK (w-[300%]):
          Slides from x: 0% to -33.333333% to -66.666667% based on scrollYProgress.
        */}
        <div className="relative z-10 w-full flex-1 overflow-hidden">
          <motion.div
            style={{ x: trackX }}
            className="flex w-[300%] h-full"
          >
            {/* ======================================================== */}
            {/* SLIDE 1: MANIFESTO (w-1/3 = 100% of panel width)         */}
            {/* ======================================================== */}
            <div className="w-1/3 h-full flex flex-col justify-between px-3 sm:px-8 lg:px-12 pt-1 pb-3 sm:py-2 overflow-hidden select-none">
              <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between md:grid md:grid-cols-12 md:gap-4 lg:gap-6 md:items-center">
                {/* Content Column (12 cols mobile, 7 cols md+) */}
                <div className="order-2 md:order-1 md:col-span-7 flex flex-col space-y-2 sm:space-y-2.5 shrink-0 pb-1 sm:pb-2">
                  {/* 1. Label */}
                  <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs font-semibold tracking-widest text-zinc-950 uppercase">
                    <span className="font-naruto inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-[#0b111e] bg-[#0b111e] text-[#facc15] text-[10px] sm:text-xs font-bold shadow-md shrink-0">
                      <UzumakiSpiral className="w-3.5 h-3.5 text-[#ff6600] animate-spin" />
                      [01 // SHINOBI SCROLL]
                    </span>
                    <span className="font-naruto text-[#0b111e] font-bold tracking-wider text-[10px] sm:text-xs truncate text-right">
                      <span className="hidden sm:inline">HIDDEN LEAF VILLAGE // </span>WILL OF FIRE
                    </span>
                  </div>

                  {/* 2. Main Headline */}
                  <h2 className="font-naruto text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-[36px] text-zinc-950 tracking-wider leading-[1.1] uppercase drop-shadow-sm">
                    WHERE THE WILL OF FIRE MEETS{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e63900] via-[#ff6600] to-[#b45309]">
                      SAGE CHAKRA CRAFT.
                    </span>
                  </h2>

                  {/* 3. Narrative Description */}
                  <p className="text-xs xs:text-[13px] text-zinc-950 leading-snug font-normal max-w-xl">
                    Forged in the legendary Hidden Leaf Village. TOONHUB captures the unstoppable spirit of
                    Naruto Uzumaki, blending Nine-Tails Kurama energy with museum-grade 3D sculptural craftsmanship.
                    Believe it!
                  </p>

                  {/* 4. Craftsmanship Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-[#0b111e]/20">
                    <div className="p-1.5 sm:p-2 bg-[#090d16] text-white border-2 border-[#ff6600]/40 hover:border-[#ff6600] transition-colors shadow-lg">
                      <div className="font-naruto text-base sm:text-lg text-[#facc15] leading-none mb-0.5 tracking-wider">
                        S-RANK
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-300 uppercase tracking-wider font-mono">
                        Ninja Classification
                      </div>
                    </div>

                    <div className="p-1.5 sm:p-2 bg-[#090d16] text-white border-2 border-[#ff6600]/40 hover:border-[#ff6600] transition-colors shadow-lg">
                      <div className="font-naruto text-base sm:text-lg text-white leading-none mb-0.5 tracking-wider">
                        100<span className="text-[10px] text-[#facc15] font-sans">%</span>
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-300 uppercase tracking-wider font-mono">
                        Kurama Pigment
                      </div>
                    </div>

                    <div className="p-1.5 sm:p-2 bg-[#090d16] text-white border-2 border-[#ff6600]/40 hover:border-[#ff6600] transition-colors shadow-lg">
                      <div className="font-naruto text-base sm:text-lg text-[#facc15] leading-none mb-0.5 tracking-wider">
                        999<span className="text-[10px] text-white font-sans">+</span>
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-300 uppercase tracking-wider font-mono">
                        Rasengan Precision
                      </div>
                    </div>

                    <div className="p-1.5 sm:p-2 bg-[#090d16] text-white border-2 border-[#ff6600]/40 hover:border-[#ff6600] transition-colors shadow-lg">
                      <div className="font-naruto text-base sm:text-lg text-white leading-none mb-0.5 tracking-wider">
                        HOKAGE
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-300 uppercase tracking-wider font-mono">
                        Sealed Vault Drop
                      </div>
                    </div>
                  </div>

                  {/* 5. CTA Row */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => scrollToProgress(0.36)}
                      className="font-naruto inline-flex items-center gap-1.5 px-4 sm:px-4 py-2 sm:py-2 bg-[#0b111e] text-[#facc15] hover:bg-[#ff5500] hover:text-white transition-all shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer border border-[#ff6600]/60 uppercase tracking-wider text-xs shrink-0"
                    >
                      <span>Explore Secret Jutsu</span>
                      <ArrowRight size={13} className="text-[#facc15]" />
                    </button>

                    <div className="font-naruto flex items-center gap-1 text-[10px] sm:text-xs text-[#0b111e] font-semibold truncate text-right">
                      <UzumakiSpiral className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                      <span className="truncate">OFFICIALLY SEALED</span>
                    </div>
                  </div>
                </div>

                {/* Visual Figurine Display (in the up side on mobile: order-1, right side on md+: order-2) */}
                <div className="order-1 md:order-2 md:col-span-5 flex-1 min-h-0 flex items-center justify-center relative select-none py-1 sm:py-2 md:py-3">
                  {/* Glowing Chakra Radial Aura Behind Figurine */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(255, 180, 0, 0.45) 0%, rgba(255, 75, 0, 0.25) 50%, transparent 72%)',
                        filter: 'blur(38px)',
                      }}
                    />
                  </div>

                  {/* Naruto Six Paths Sage Mode Figurine Image */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative z-10 flex items-center justify-center w-full h-full"
                  >
                    <img
                      src={figma5Img}
                      alt="Naruto Uzumaki Six Paths Sage Mode Figurine"
                      loading="lazy"
                      decoding="async"
                      className="h-[34vh] xs:h-[38vh] sm:h-[42vh] md:h-[44vh] lg:h-[48vh] max-h-[330px] xs:max-h-[390px] sm:max-h-[440px] md:max-h-[480px] lg:max-h-[540px] xl:max-h-[580px] w-auto object-contain drop-shadow-[0_22px_45px_rgba(230,69,0,0.6)] pointer-events-none"
                    />
                  </motion.div>

                  {/* Ground Shadow */}
                  <div className="absolute bottom-1 sm:bottom-0 w-36 xs:w-44 sm:w-52 md:w-60 h-2.5 sm:h-3.5 bg-black/40 rounded-full blur-sm pointer-events-none" />
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SLIDE 2: ARCHIVE BLUEPRINTS & SPECS (w-1/3 = 100% panel) */}
            {/* ======================================================== */}
            <div className="w-1/3 h-full flex flex-col justify-between px-3 sm:px-8 lg:px-12 pt-1 pb-3 sm:py-2 overflow-hidden select-none">
              <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between md:grid md:grid-cols-12 md:gap-4 lg:gap-6 md:items-center">
                {/* Content Column (12 cols mobile, 7 cols md+) */}
                <div className="order-2 md:order-1 md:col-span-7 flex flex-col space-y-2 sm:space-y-2.5 shrink-0 pb-1 sm:pb-2">
                  {/* 1. Header Badge */}
                  <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs font-semibold tracking-widest text-zinc-950 uppercase">
                    <span className="font-naruto inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-[#0b111e] bg-[#0b111e] text-[#facc15] text-[10px] sm:text-xs font-bold shadow-md shrink-0">
                      <Flame className="w-3.5 h-3.5 text-[#ff6600] animate-pulse" />
                      [02 // SECRET JUTSU]
                    </span>
                    <span className="font-naruto text-[#0b111e] font-bold tracking-wider text-[10px] sm:text-xs truncate text-right">
                      <span className="hidden sm:inline">SAGE OF </span>SIX PATHS ARCHITECTURE
                    </span>
                  </div>

                  {/* 2. Main Headline */}
                  <h2 className="font-naruto text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-[36px] text-zinc-950 tracking-wider leading-[1.1] uppercase drop-shadow-sm">
                    ATOMIC CHAKRA FIDELITY.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e63900] via-[#ff6a00] to-[#b45309]">
                      ZERO COMPROMISE.
                    </span>
                  </h2>

                  {/* 3. Narrative Description */}
                  <p className="text-xs xs:text-[13px] text-zinc-950 leading-snug font-normal max-w-xl">
                    Engineered via a 16-stage resin deposition process infused with light-reactive Kurama chakra
                    micro-crystals. Each artifact embeds a 6061 aircraft-grade internal shinobi armature and
                    cryptographic Uzumaki NFC scroll seal to guarantee lifetime structural integrity.
                  </p>

                  {/* 4. 4 Feature Cards Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#0b111e]/20">
                    <div className="p-1.5 sm:p-2 bg-[#090d16] text-white border-2 border-[#ff6600]/40 hover:border-[#ff6600] transition-colors shadow-lg">
                      <div className="font-naruto flex items-center gap-1 text-[#facc15] text-[10px] sm:text-xs font-semibold uppercase mb-0.5 truncate">
                        <Layers size={12} className="text-[#ff6600] shrink-0" /> 6061 Skeleton
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight font-mono line-clamp-2">
                        High-tensile alloy armature preventing joint distortion during poses.
                      </div>
                    </div>

                    <div className="p-1.5 sm:p-2 bg-[#090d16] text-white border-2 border-[#ff6600]/40 hover:border-[#ff6600] transition-colors shadow-lg">
                      <div className="font-naruto flex items-center gap-1 text-white text-[10px] sm:text-xs font-semibold uppercase mb-0.5 truncate">
                        <Sparkles size={12} className="text-[#facc15] shrink-0" /> Spectral Flame
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight font-mono line-clamp-2">
                        Hand-pigmented inks infused with Nine-Tails chakra micro-flakes.
                      </div>
                    </div>

                    <div className="p-1.5 sm:p-2 bg-[#090d16] text-white border-2 border-[#ff6600]/40 hover:border-[#ff6600] transition-colors shadow-lg">
                      <div className="font-naruto flex items-center gap-1 text-[#facc15] text-[10px] sm:text-xs font-semibold uppercase mb-0.5 truncate">
                        <Fingerprint size={12} className="text-[#ff6600] shrink-0" /> Uzumaki Seal
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight font-mono line-clamp-2">
                        Cryptographic tag with tap-to-verify on-chain Konoha lineage.
                      </div>
                    </div>

                    <div className="p-1.5 sm:p-2 bg-[#090d16] text-white border-2 border-[#ff6600]/40 hover:border-[#ff6600] transition-colors shadow-lg">
                      <div className="font-naruto flex items-center gap-1 text-white text-[10px] sm:text-xs font-semibold uppercase mb-0.5 truncate">
                        <Database size={12} className="text-[#facc15] shrink-0" /> Myoboku Dock
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight font-mono line-clamp-2">
                        Magnetic toad dock with optical anti-reflective acrylic casing.
                      </div>
                    </div>
                  </div>

                  {/* 5. Action Row */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => scrollToProgress(0.54)}
                      className="font-naruto inline-flex items-center gap-1.5 px-4 sm:px-4 py-2 sm:py-2 bg-[#0b111e] text-[#facc15] hover:bg-[#ff5500] hover:text-white transition-all shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer border border-[#ff6600]/60 uppercase tracking-wider text-xs shrink-0"
                    >
                      <span>Explore Hokage Vault</span>
                      <ArrowRight size={13} className="text-[#facc15]" />
                    </button>

                    <button
                      onClick={() => scrollToProgress(0.18)}
                      className="hidden sm:inline-flex font-naruto items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 border border-[#0b111e] bg-[#0b111e] text-[#facc15] hover:bg-[#ff5500] hover:text-white uppercase tracking-wider text-[11px] sm:text-xs cursor-pointer shadow-md transition-all"
                    >
                      <ChevronRight size={13} className="rotate-180" />
                      <span>Back to Shinobi Scroll</span>
                    </button>

                    <div className="font-naruto flex items-center gap-1 text-[10px] sm:text-xs text-[#0b111e] font-semibold truncate text-right">
                      <CheckCircle2 size={13} className="text-[#ff5500] shrink-0" />
                      <span className="truncate">100% KONOHA FIDELITY</span>
                    </div>
                  </div>
                </div>

                {/* Visual Figurine Display (in the up side on mobile: order-1, right side on md+: order-2) */}
                <div className="order-1 md:order-2 md:col-span-5 flex-1 min-h-0 flex items-center justify-center relative select-none py-1 sm:py-2 md:py-3">
                  {/* Glowing Wind Style Aura Behind Figurine */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(56, 189, 248, 0.48) 0%, rgba(255, 102, 0, 0.25) 45%, transparent 72%)',
                        filter: 'blur(38px)',
                      }}
                    />
                  </div>

                  {/* Naruto Sage Mode Rasenshuriken Figurine Image */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative z-10 flex items-center justify-center w-full h-full"
                  >
                    <img
                      src={figma6Img}
                      alt="Naruto Uzumaki Sage Mode Rasenshuriken Figurine"
                      loading="lazy"
                      decoding="async"
                      className="h-[34vh] xs:h-[38vh] sm:h-[42vh] md:h-[44vh] lg:h-[48vh] max-h-[330px] xs:max-h-[390px] sm:max-h-[440px] md:max-h-[480px] lg:max-h-[540px] xl:max-h-[580px] w-auto object-contain drop-shadow-[0_22px_45px_rgba(56,189,248,0.55)] pointer-events-none"
                    />
                  </motion.div>

                  {/* Ground Shadow */}
                  <div className="absolute bottom-1 sm:bottom-0 w-36 xs:w-44 sm:w-52 md:w-60 h-2.5 sm:h-3.5 bg-black/40 rounded-full blur-sm pointer-events-none" />
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SLIDE 3: HOKAGE VAULT (w-1/3 = 100% of panel width)      */}
            {/* ======================================================== */}
            <div className="w-1/3 h-full flex flex-col justify-between px-3 sm:px-8 lg:px-12 pt-1 pb-3 sm:py-2 overflow-hidden select-none">
              <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between md:grid md:grid-cols-12 md:gap-4 lg:gap-6 md:items-center">
                {/* Content Column (12 cols mobile, 7 cols md+) */}
                <div className="order-2 md:order-1 md:col-span-7 flex flex-col space-y-2 sm:space-y-2.5 shrink-0 pb-1 sm:pb-2">
                  {/* 1. Header Badge */}
                  <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs font-semibold tracking-widest text-zinc-950 uppercase">
                    <span className="font-naruto inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-[#0b111e] bg-[#0b111e] text-[#facc15] text-[10px] sm:text-xs font-bold shadow-md shrink-0">
                      <Crown className="w-3.5 h-3.5 text-[#facc15]" />
                      [03 // HOKAGE VAULT]
                    </span>
                    <span className="font-naruto text-[#0b111e] font-bold tracking-wider text-[10px] sm:text-xs truncate text-right">
                      <span className="hidden sm:inline">LEGENDARY </span>COLLECTOR ARCHIVE
                    </span>
                  </div>

                  {/* 2. Main Headline */}
                  <h2 className="font-naruto text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-[36px] text-zinc-950 tracking-wider leading-[1.1] uppercase drop-shadow-sm">
                    THE PINNACLE OF SHINOBI SCULPTURE.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e63900] via-[#ff6a00] to-[#b45309]">
                      CLAIM YOUR LINEAGE.
                    </span>
                  </h2>

                  {/* 3. Narrative Description */}
                  <p className="text-xs xs:text-[13px] text-zinc-950 leading-snug font-normal max-w-xl">
                    Only 250 individually serialized Hokage Edition sculptures exist worldwide. Each masterpiece comes
                    enshrined with a 24K gold Konoha emblem seal, master atelier provenance certificate, and exclusive
                    Mount Myoboku obsidian display plinth.
                  </p>

                  {/* 4. 4 Feature Cards Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#0b111e]/20">
                    <div className="p-1.5 sm:p-2 bg-[#090d16] text-white border-2 border-[#ff6600]/40 hover:border-[#ff6600] transition-colors shadow-lg">
                      <div className="font-naruto flex items-center gap-1 text-[#facc15] text-[10px] sm:text-xs font-semibold uppercase mb-0.5 truncate">
                        <Crown size={12} className="text-[#facc15] shrink-0" /> 24K Gold Seal
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight font-mono line-clamp-2">
                        Hand-inlaid 24-karat gold leaf Leaf Village crest on base.
                      </div>
                    </div>

                    <div className="p-1.5 sm:p-2 bg-[#090d16] text-white border-2 border-[#ff6600]/40 hover:border-[#ff6600] transition-colors shadow-lg">
                      <div className="font-naruto flex items-center gap-1 text-white text-[10px] sm:text-xs font-semibold uppercase mb-0.5 truncate">
                        <Fingerprint size={12} className="text-[#facc15] shrink-0" /> On-Chain Auth
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight font-mono line-clamp-2">
                        EIP-712 smart contract attestation guaranteeing authenticity.
                      </div>
                    </div>

                    <div className="p-1.5 sm:p-2 bg-[#090d16] text-white border-2 border-[#ff6600]/40 hover:border-[#ff6600] transition-colors shadow-lg">
                      <div className="font-naruto flex items-center gap-1 text-[#facc15] text-[10px] sm:text-xs font-semibold uppercase mb-0.5 truncate">
                        <Box size={12} className="text-[#ff6600] shrink-0" /> Archival Vitrine
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight font-mono line-clamp-2">
                        99.9% UV-filtering museum-grade casing preserving pigments.
                      </div>
                    </div>

                    <div className="p-1.5 sm:p-2 bg-[#090d16] text-white border-2 border-[#ff6600]/40 hover:border-[#ff6600] transition-colors shadow-lg">
                      <div className="font-naruto flex items-center gap-1 text-white text-[10px] sm:text-xs font-semibold uppercase mb-0.5 truncate">
                        <ShieldCheck size={12} className="text-[#facc15] shrink-0" /> Courier Flight
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-zinc-300 leading-tight font-mono line-clamp-2">
                        Armored temperature-controlled transport case with insured delivery.
                      </div>
                    </div>
                  </div>

                  {/* 5. Action Row */}
                  <div className="flex items-center justify-between gap-2 pt-1 flex-wrap sm:flex-nowrap">
                    <button
                      onClick={() => scrollToProgress(0.68)}
                      className="font-naruto inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#0b111e] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-black transition-all shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer border border-[#00d4ff]/60 uppercase tracking-wider text-xs shrink-0"
                    >
                      <Sparkles size={13} className="text-[#00d4ff]" />
                      <span>Dungeon Quests ↓</span>
                    </button>

                    <button
                      onClick={() => {
                        alert('Hokage Edition Reservation: Direct allocation portal opening shortly. Believe it!');
                      }}
                      className="hidden md:inline-flex font-naruto items-center gap-1 px-3 py-2 bg-black/60 text-[#facc15] hover:bg-[#ff5500] hover:text-white transition-all shadow-sm cursor-pointer border border-[#ff6600]/40 uppercase tracking-wider text-xs shrink-0"
                    >
                      <span>Claim Vault</span>
                    </button>

                    <button
                      onClick={() => scrollToProgress(0.36)}
                      className="hidden sm:inline-flex font-naruto items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 border border-[#0b111e] bg-[#0b111e] text-[#facc15] hover:bg-[#ff5500] hover:text-white uppercase tracking-wider text-[11px] sm:text-xs cursor-pointer shadow-md transition-all"
                    >
                      <ChevronRight size={13} className="rotate-180" />
                      <span>Back to Jutsu</span>
                    </button>

                    <div className="font-naruto flex items-center gap-1 text-[10px] sm:text-xs text-[#0b111e] font-semibold truncate text-right">
                      <UzumakiSpiral className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                      <span className="truncate">LIMITED 250 PIECES</span>
                    </div>
                  </div>
                </div>

                {/* Visual Figurine Display (in the up side on mobile: order-1, right side on md+: order-2) */}
                <div className="order-1 md:order-2 md:col-span-5 flex-1 min-h-0 flex items-center justify-center relative select-none py-1 sm:py-2 md:py-3">
                  {/* Glowing Six Paths / Kurama Chakra Aura Behind Figurine */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(250, 204, 21, 0.48) 0%, rgba(255, 102, 0, 0.25) 45%, transparent 72%)',
                        filter: 'blur(38px)',
                      }}
                    />
                  </div>

                  {/* Naruto Kurama Chakra Mode Rasenshuriken Figurine Image */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative z-10 flex items-center justify-center w-full h-full"
                  >
                    <img
                      src={figma7Img}
                      alt="Naruto Uzumaki Kurama Chakra Rasenshuriken Figurine"
                      loading="lazy"
                      decoding="async"
                      className="h-[34vh] xs:h-[38vh] sm:h-[42vh] md:h-[44vh] lg:h-[48vh] max-h-[330px] xs:max-h-[390px] sm:max-h-[440px] md:max-h-[480px] lg:max-h-[540px] xl:max-h-[580px] w-auto object-contain drop-shadow-[0_22px_45px_rgba(250,204,21,0.6)] pointer-events-none"
                    />
                  </motion.div>

                  {/* Ground Shadow */}
                  <div className="absolute bottom-1 sm:bottom-0 w-36 xs:w-44 sm:w-52 md:w-60 h-2.5 sm:h-3.5 bg-black/40 rounded-full blur-sm pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;
