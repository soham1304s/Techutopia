import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import sukunaImg from './sukuna.webp';
import figma2Img from './figma2.webp';
import figma3Img from './figma3.webp';
import figma4Img from './figma4.webp';

interface GlowConfig {
  primary: string;
  secondary: string;
  accent: string;
}

interface FigurineImage {
  src: string;
  bg: string;
  panel: string;
  glow: GlowConfig;
}

const IMAGES: FigurineImage[] = [
  {
    src: sukunaImg,
    bg: 'linear-gradient(135deg, #dc2626 0%, #6b0c10 35%, #1a0305 70%, #000000 100%)',
    panel: '#7f1d1d',
    glow: {
      primary: 'rgba(239, 68, 68, 0.65)',
      secondary: 'rgba(185, 28, 28, 0.45)',
      accent: 'rgba(254, 202, 202, 0.25)',
    },
  },
  {
    src: figma2Img,
    bg: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 25%, #ec4899 50%, #3b0764 78%, #0f021e 100%)',
    panel: '#581c87',
    glow: {
      primary: 'rgba(168, 85, 247, 0.65)',
      secondary: 'rgba(236, 72, 153, 0.5)',
      accent: 'rgba(244, 114, 182, 0.28)',
    },
  },
  {
    src: figma3Img,
    bg: 'linear-gradient(135deg, #dc2626 0%, #ef4444 20%, #ffffff 45%, #2563eb 68%, #1e3a8a 82%, #0a0f24 100%)',
    panel: '#1e3a8a',
    glow: {
      primary: 'rgba(37, 99, 235, 0.65)',
      secondary: 'rgba(239, 68, 68, 0.45)',
      accent: 'rgba(147, 197, 253, 0.3)',
    },
  },
  {
    src: figma4Img,
    bg: 'linear-gradient(135deg, #fa8072 0%, #f43f5e 20%, #0f0305 45%, #000000 60%, #991b1b 82%, #dc2626 100%)',
    panel: '#9f1239',
    glow: {
      primary: 'rgba(250, 128, 114, 0.7)',
      secondary: 'rgba(220, 38, 38, 0.55)',
      accent: 'rgba(254, 205, 211, 0.28)',
    },
  },
];

type Role = 'center' | 'left' | 'right' | 'back';

export interface ToonhubHeroProps {
  isOpen?: boolean;
}

export const ToonhubHero: React.FC<ToonhubHeroProps> = ({ isOpen = true }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastNavTimeRef = useRef(0);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // Preload all images on mount
  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide: runs every 3 seconds when Hero is open and visible
  const resetAutoSlide = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isOpen) return;
    if (typeof document !== 'undefined' && document.hidden) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 3000);
  }, [isOpen]);

  useEffect(() => {
    resetAutoSlide();
    const handleVisibility = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        resetAutoSlide();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [resetAutoSlide]);

  // Navigation logic with debounce for manual clicks + resets the 3s interval
  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      const now = Date.now();
      if (now - lastNavTimeRef.current < 450) return;
      lastNavTimeRef.current = now;

      setActiveIndex((prev) => (direction === 'next' ? (prev + 1) % 4 : (prev + 3) % 4));
      resetAutoSlide();
    },
    [resetAutoSlide]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Derived role calculation
  const getRole = (index: number): Role => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 3) % 4) return 'left';
    if (index === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  // Role-based styling matching specifications exactly
  const getItemStyles = (role: Role): React.CSSProperties => {
    const baseTransition =
      'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1), bottom 650ms cubic-bezier(0.4, 0, 0.2, 1)';

    switch (role) {
      case 'center':
        return {
          position: 'absolute',
          aspectRatio: '0.6 / 1',
          left: '50%',
          bottom: isMobile ? '22%' : 0,
          height: isMobile ? '60%' : '92%',
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: 'none',
          opacity: 1,
          zIndex: 20,
          transition: baseTransition,
          willChange: 'transform, filter, opacity',
          pointerEvents: 'auto',
        };
      case 'left':
        return {
          position: 'absolute',
          aspectRatio: '0.6 / 1',
          left: isMobile ? '20%' : '30%',
          bottom: isMobile ? '32%' : '12%',
          height: isMobile ? '16%' : '28%',
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          transition: baseTransition,
          willChange: 'transform, filter, opacity',
          cursor: 'pointer',
        };
      case 'right':
        return {
          position: 'absolute',
          aspectRatio: '0.6 / 1',
          left: isMobile ? '80%' : '70%',
          bottom: isMobile ? '32%' : '12%',
          height: isMobile ? '16%' : '28%',
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          transition: baseTransition,
          willChange: 'transform, filter, opacity',
          cursor: 'pointer',
        };
      case 'back':
      default:
        return {
          position: 'absolute',
          aspectRatio: '0.6 / 1',
          left: '50%',
          bottom: isMobile ? '32%' : '12%',
          height: isMobile ? '13%' : '22%',
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(4px)',
          opacity: 1,
          zIndex: 5,
          transition: baseTransition,
          willChange: 'transform, filter, opacity',
          pointerEvents: 'none',
        };
    }
  };

  // Grain overlay: SVG fractalNoise data URI
  // baseFrequency=0.9, numOctaves=4, opacity 0.08 inside SVG, container opacity 0.4, backgroundSize 200px 200px, repeat
  const grainSvg = `<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter)' opacity='0.08'/></svg>`;
  const grainDataUri = `url("data:image/svg+xml;utf8,${encodeURIComponent(grainSvg)}")`;

  return (
    <div
      className="relative w-full overflow-hidden select-none bg-black"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative w-full h-screen h-[100dvh] overflow-hidden">
        {/* Dynamic background layers with smooth crossfade and ambient glow-and-dim breathing */}
        {IMAGES.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={idx}
              className={`absolute inset-0 pointer-events-none overflow-hidden ${
                isActive ? 'animate-bg-breathe' : ''
              }`}
              style={{
                background: item.bg,
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1)' : 'scale(1.04)',
                transition:
                  'opacity 850ms cubic-bezier(0.4, 0, 0.2, 1), transform 850ms cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 0,
              }}
            >
              {/* Primary central ambient glow (breathes and expands behind the figurine) */}
              <div
                className={`absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[85vw] sm:w-[58vw] max-w-[850px] aspect-square rounded-full pointer-events-none mobile-blur-light ${
                  isActive ? 'animate-glow-primary' : ''
                }`}
                style={{
                  background: `radial-gradient(circle, ${item.glow.primary} 0%, ${item.glow.secondary} 40%, transparent 70%)`,
                  filter: 'blur(70px)',
                  mixBlendMode: 'screen',
                }}
              />

              {/* Secondary corner accent glow (counter-rhythm organic pulse) */}
              <div
                className={`absolute -right-[10%] -top-[5%] sm:right-[5%] sm:top-[8%] w-[55vw] max-w-[620px] aspect-square rounded-full pointer-events-none mobile-blur-light ${
                  isActive ? 'animate-glow-secondary' : ''
                }`}
                style={{
                  background: `radial-gradient(circle, ${item.glow.secondary} 0%, transparent 65%)`,
                  filter: 'blur(85px)',
                  mixBlendMode: 'screen',
                }}
              />

              {/* Core focal accent aura for depth & luminous luster */}
              <div
                className={`absolute left-1/2 bottom-[12%] -translate-x-1/2 w-[70vw] sm:w-[42vw] max-w-[580px] h-[320px] rounded-full pointer-events-none mobile-blur-light ${
                  isActive ? 'animate-glow-accent' : ''
                }`}
                style={{
                  background: `radial-gradient(ellipse at center, ${item.glow.accent} 0%, transparent 70%)`,
                  filter: 'blur(60px)',
                  mixBlendMode: 'screen',
                }}
              />
            </div>
          );
        })}

        {/* 1. Grain overlay (absolute inset-0 pointer-events-none, zIndex 50) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: grainDataUri,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            opacity: 0.4,
            zIndex: 50,
          }}
        />

        {/* 2. Giant ghost text "TECH FEST" - Production-level slow rise from bottom */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none uppercase"
          style={{
            zIndex: 2,
            top: '18%',
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(70px, 24vw, 340px)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          <div className="flex items-center justify-center gap-[0.16em]">
            <motion.span
              initial={{
                y: isMobile ? '45vh' : '55vh',
                opacity: 0,
                scale: 0.9,
                filter: 'blur(16px)',
              }}
              animate={
                isOpen
                  ? {
                      y: '0vh',
                      opacity: 1,
                      scale: 1,
                      filter: 'blur(0px)',
                    }
                  : {
                      y: isMobile ? '45vh' : '55vh',
                      opacity: 0,
                      scale: 0.9,
                      filter: 'blur(16px)',
                    }
              }
              transition={{
                duration: 1.6,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block tracking-tight drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
              style={{ willChange: 'transform, opacity, filter' }}
            >
              TECH
            </motion.span>

            <motion.span
              initial={{
                y: isMobile ? '50vh' : '60vh',
                opacity: 0,
                scale: 0.9,
                filter: 'blur(16px)',
              }}
              animate={
                isOpen
                  ? {
                      y: '0vh',
                      opacity: 1,
                      scale: 1,
                      filter: 'blur(0px)',
                    }
                  : {
                      y: isMobile ? '50vh' : '60vh',
                      opacity: 0,
                      scale: 0.9,
                      filter: 'blur(16px)',
                    }
              }
              transition={{
                duration: 1.65,
                delay: 0.48,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block tracking-tight drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
              style={{ willChange: 'transform, opacity, filter' }}
            >
              FEST
            </motion.span>
          </div>
        </div>


        {/* 4. Carousel (absolute inset-0, zIndex 3) */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, idx) => {
            const role = getRole(idx);
            const isClickable = role === 'left' || role === 'right';

            return (
              <div
                key={idx}
                style={getItemStyles(role)}
                onClick={() => {
                  if (role === 'left') navigate('prev');
                  if (role === 'right') navigate('next');
                }}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : -1}
                aria-label={isClickable ? `Rotate to character ${idx + 1}` : undefined}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (role === 'left') navigate('prev');
                    if (role === 'right') navigate('next');
                  }
                }}
              >
                <img
                  src={item.src}
                  alt={`Toonhub figurine ${idx + 1}`}
                  draggable={false}
                  loading={role === 'center' ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-contain object-bottom pointer-events-none select-none"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons (absolute bottom-6 left-4 sm:bottom-20 sm:left-24, zIndex 60, maxWidth: 320px) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 flex flex-col justify-end"
          style={{
            zIndex: 60,
            maxWidth: '320px',
          }}
        >
          <p
            className="font-bold uppercase mb-2 sm:mb-3 text-base sm:text-[22px] text-white tracking-widest"
            style={{
              opacity: 0.95,
              letterSpacing: '0.02em',
            }}
          >
            TOONHUB FIGURINES
          </p>

          <p
            className="hidden sm:block text-xs sm:text-sm text-white mb-4 sm:mb-5"
            style={{
              opacity: 0.85,
              lineHeight: 1.6,
            }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is
            flawless. Many thanks! Wishing you the win. Order now.
          </p>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate('prev')}
              aria-label="Previous figurine"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 border-white text-white cursor-pointer hover:scale-[1.08] hover:bg-white/12 active:scale-95"
              style={{
                backgroundColor: 'transparent',
                transition: 'transform 150ms, background-color 150ms',
              }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>

            <button
              type="button"
              onClick={() => navigate('next')}
              aria-label="Next figurine"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 border-white text-white cursor-pointer hover:scale-[1.08] hover:bg-white/12 active:scale-95"
              style={{
                backgroundColor: 'transparent',
                transition: 'transform 150ms, background-color 150ms',
              }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </motion.div>

        {/* Bottom subtle transition overlay toward About */}
        <div
          className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(10, 3, 5, 0.4) 40%, rgba(0, 0, 0, 0.85) 100%)',
            zIndex: 30,
          }}
        />

        {/* 6. Bottom-right link "DISCOVER IT" (absolute bottom-6 right-4 sm:bottom-20 sm:right-10, zIndex 60) */}
        <motion.a
          initial={{ opacity: 0, y: 35 }}
          animate={isOpen ? { opacity: 0.95, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('hero-about-scene');
            if (el) {
              const targetY = el.offsetTop + el.offsetHeight * 0.38;
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
          }}
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2 sm:gap-3 text-white no-underline cursor-pointer group"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            opacity: 0.95,
            transition: 'opacity 200ms ease, transform 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.95';
          }}
        >
          <span>DISCOVER IT</span>
          <ArrowRight
            className="w-5 h-5 sm:w-8 sm:h-8 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2.25}
          />
        </motion.a>
      </div>
    </div>
  );
};

export default ToonhubHero;
