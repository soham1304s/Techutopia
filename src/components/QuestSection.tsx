import React, { useState, useRef, useEffect } from 'react';
import { motion, MotionValue, useTransform, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Users,
  MapPin,
  Calendar,
  Search,
  ChevronRight,
  ShieldAlert,
  Flame,
  CheckCircle,
  ExternalLink,
  X,
  ArrowUp,
  RotateCw,
  Sparkles
} from 'lucide-react';

import card1Image from './card1.png';
import back4Image from './back4.png';
import art1 from '../assets/quests/1.png';
import art2 from '../assets/quests/2.png';
import art3 from '../assets/quests/3.png';
import art4 from '../assets/quests/4.png';
import art5 from '../assets/quests/5.png';
import art6 from '../assets/quests/6.png';

export interface QuestItem {
  id: number;
  title: string;
  kanji: string;
  rank: string;
  threat: string;
  element: string;
  category: string;
  color: string;
  image: string;
  snippet: string;
  description: string;
  date: string;
  venue: string;
  prize: string;
  team: string;
  rules: string[];
}

const QUESTS: QuestItem[] = [
  {
    id: 1,
    title: 'Shadow Monarch Code Clash',
    kanji: '影の王',
    rank: 'S-RANK RAID',
    threat: 'S-TIER',
    element: 'SHADOW // 影',
    category: 'Coding',
    color: '#00d4ff',
    image: art1,
    snippet: 'Competitive algorithmic speed-clash. Solve 5 legendary bosses before the time portal shuts down.',
    description: 'A multi-round algorithmic battleground testing data structures, dynamic programming, and logic. Code faster than your shadow in this high-intensity tournament.',
    date: 'Day 1 • 10:00 AM - 1:00 PM',
    venue: 'Auditorium Hall A, UEM Jaipur',
    prize: '₹50,000 + S-Rank Trophy',
    team: 'Solo / Duo',
    rules: [
      'Standard ICPC penalty timing rules apply.',
      'Languages allowed: C++, Java, Python, Rust, Go.',
      'Internet access is restricted to official documentation only.'
    ]
  },
  {
    id: 2,
    title: 'Hashira Hackathon (24hr)',
    kanji: '炎柱',
    rank: 'SUPREME SUMMON',
    threat: 'MYTHIC',
    element: 'FLAME // 炎',
    category: 'Hackathon',
    color: '#ff6b35',
    image: art2,
    snippet: '24-hour marathon sprint. Build breakthrough AI, Web3, or Cyber products under the heat of the forge.',
    description: 'Set your hearts ablaze! Prototype, build, and deploy production-ready web or mobile solutions before the 24-hour clock expires. Judged by industry architects.',
    date: 'Day 1 - Day 2 • 24 Hours Non-Stop',
    venue: 'Innovation Sandbox Lab, UEM Jaipur',
    prize: '₹1,00,000 + Incubation',
    team: 'Squad of 2-4',
    rules: [
      'All code repositories must be initiated after opening ceremonies.',
      'Open-source frameworks and libraries are permitted.',
      'Working functional prototype required for live pitching.'
    ]
  },
  {
    id: 3,
    title: 'Mecha Titan Arena',
    kanji: '鋼鉄神',
    rank: 'A-RANK COLISEUM',
    threat: 'A-TIER',
    element: 'STEEL // 鋼',
    category: 'Robotics',
    color: '#b537f2',
    image: art3,
    snippet: 'Heavyweight autonomous & manual combat robots. Push rival mechas off the electro-ring.',
    description: 'Custom-engineered combat robots clash in high-voltage physics matches. Armed with spinning blades, pneumatic flippers, and armored chassis.',
    date: 'Day 2 • 2:00 PM - 6:00 PM',
    venue: 'Workshop Bay, Mechanical Block',
    prize: '₹75,000 + Hardware Kits',
    team: 'Team of 3-5',
    rules: [
      'Weight limit: 15kg for wireless combat class.',
      'Failsafe emergency shut-off switches are mandatory.',
      'Three 3-minute rounds per bout.'
    ]
  },
  {
    id: 4,
    title: 'Neural Network Dojo',
    kanji: '超知能',
    rank: 'A-RANK INTELLECT',
    threat: 'A-TIER',
    element: 'PSIONIC // 念',
    category: 'AI/ML',
    color: '#4361ee',
    image: art4,
    snippet: 'Kaggle-style live AI sprint on an unreleased blind dataset. Train the supreme neural model.',
    description: 'Computer vision and LLM fine-tuning challenges where model efficiency, latency, and F1 accuracy determine the Grand Sensei.',
    date: 'Day 2 • 11:00 AM - 3:00 PM',
    venue: 'CS Research Lab 2, UEM Jaipur',
    prize: '₹40,000 + Cloud Credits',
    team: 'Solo / Duo',
    rules: [
      'Pre-trained foundational model weights permitted.',
      'Final submission must execute inference on standard test container.',
      'Reproducibility code notebook required.'
    ]
  },
  {
    id: 5,
    title: 'Breathing Form: UI/UX Sprint',
    kanji: '水の呼吸',
    rank: 'B-RANK CRAFT',
    threat: 'B-TIER',
    element: 'WATER // 水',
    category: 'Design',
    color: '#06d6a0',
    image: art5,
    snippet: 'Design an anime-themed spatial application or futuristic micro-interaction design system in 4 hours.',
    description: 'Master the fluid art of user experience. Craft responsive wireframes, design tokens, and interactive Figma prototypes with breathtaking animation craft.',
    date: 'Day 1 • 2:00 PM - 6:00 PM',
    venue: 'Design Studio Lab, Architecture Wing',
    prize: '₹30,000 + Creative Licenses',
    team: 'Solo / Duo',
    rules: [
      'Design prompt disclosed at start of competition.',
      'Figma or Spline prototype submission required.',
      'Judged on typography, accessibility, and micro-interactions.'
    ]
  },
  {
    id: 6,
    title: 'Cyber Jutsu CTF Showdown',
    kanji: '電脳術',
    rank: 'A-RANK SECURITY',
    threat: 'A-TIER',
    element: 'LIGHTNING // 雷',
    category: 'Security',
    color: '#ffd166',
    image: art6,
    snippet: 'Jeopardy-style Capture The Flag. Exploit web apps, decrypt ciphers, and reverse binaries.',
    description: 'Defend and conquer! Uncover hidden flags embedded within vulnerable simulated infrastructure, memory corruptions, and cryptographic puzzles.',
    date: 'Day 2 • 10:00 AM - 2:00 PM',
    venue: 'Cyber Security Operations Lab',
    prize: '₹45,000 + Security Certs',
    team: 'Duo / Trio',
    rules: [
      'No attacks against tournament scoring infrastructure.',
      'Flag sharing or collusion results in instant disqualification.',
      'Write-ups required for top 3 teams.'
    ]
  }
];

const CATEGORIES = ['All', 'Coding', 'Hackathon', 'Robotics', 'AI/ML', 'Design', 'Security'];

interface QuestSectionProps {
  scrollYProgress: MotionValue<number>;
}

export const QuestSection: React.FC<QuestSectionProps> = ({ scrollYProgress }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDossier, setActiveDossier] = useState<QuestItem | null>(null);
  const [registeredMap, setRegisteredMap] = useState<Record<number, boolean>>({});
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Motion Choreography:
  // 0.00 -> 0.56: offscreen above (y: '-100%')
  // 0.56 -> 0.66: enters smoothly from top of website into view (y: '-100%' -> '0%')
  // 0.66 -> 1.00: firmly locked in view (y: '0%')
  // REVERSE ON SCROLL UP:
  // 1.00 -> 0.66: remains in view while cards scroll back to right
  // 0.66 -> 0.56: smoothly ascends back up into top of website (y: '0%' -> '-100%')
  const questY = useTransform(
    scrollYProgress,
    [0, 0.56, 0.66, 1],
    ['-100%', '-100%', '0%', '0%'],
    { clamp: true }
  );

  const questOpacity = useTransform(
    scrollYProgress,
    [0, 0.54, 0.62, 1],
    [0, 0, 1, 1],
    { clamp: true }
  );

  const questPointerEvents = useTransform(scrollYProgress, (latest) =>
    latest >= 0.58 ? 'auto' : 'none'
  );

  // Horizontal Card Stream Motion (Noomo-Style 3D Stream):
  // Cards glide horizontally from right to left across the screen
  // Passing smoothly over the pinned unboxed typography "GREAT RAIDS CAN'T HAPPEN WITHOUT HUNTERS."
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
  const startX = isMobile ? 5 : isTablet ? 18 : 46;
  const endX = isMobile ? -260 : isTablet ? -210 : -165;

  const trackX = useTransform(scrollYProgress, (v) => {
    if (v <= 0.66) return `${startX}vw`;
    if (v >= 0.98) return `${endX}vw`;
    const progress = (v - 0.66) / (0.98 - 0.66);
    return `${startX + progress * (endX - startX)}vw`;
  });

  // Progress bar indicating scroll advancement across cards
  const scrollIndicatorWidth = useTransform(
    scrollYProgress,
    [0.66, 0.98],
    ['0%', '100%'],
    { clamp: true }
  );

  // Subtle dynamic parallax & scale for Solo Leveling Shadow Monarch Dungeon Gate background
  const bgScale = useTransform(scrollYProgress, [0.66, 0.98], [1.02, 1.08]);
  const bgX = useTransform(scrollYProgress, [0.66, 0.98], ['0%', '-3%']);

  const filteredQuests = QUESTS.filter((quest) => {
    const matchesCategory =
      selectedCategory === 'All' || quest.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quest.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quest.rank.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegister = (id: number) => {
    setRegisteredMap((prev) => ({ ...prev, [id]: true }));
  };

  const scrollToAbout = () => {
    const el = document.getElementById('hero-about-scene');
    if (el) {
      const maxScroll = el.offsetHeight - window.innerHeight;
      const targetY = el.offsetTop + maxScroll * 0.54;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  // Wheel handler: Forward wheel delta to page scroll, enabling smooth bidirectional Framer Motion scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      // Scrolling UP: ensure window scrolls up so Quest Section and cards reverse smoothly
      window.scrollBy({ top: e.deltaY, behavior: 'auto' });
    } else if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
      // Horizontal swipe / trackpad swipe
      window.scrollBy({ top: e.deltaX * 1.5, behavior: 'auto' });
    }
  };

  // Mobile touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 35) {
      const scrollAmount = deltaX < 0 ? 180 : -180;
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
    touchStartX.current = null;
  };

  return (
    <motion.div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        opacity: questOpacity,
        y: questY,
        pointerEvents: questPointerEvents,
        background:
          'radial-gradient(ellipse at 15% 45%, #180833 0%, #0c031c 45%, #020005 100%)',
      }}
      className="absolute inset-0 w-full min-w-full h-full min-h-full z-20 flex flex-col text-white overflow-hidden select-none border-b-2 border-purple-900/50 shadow-[0_25px_60px_rgba(0,0,0,0.98)]"
    >
      {/* Background Ambient Glow & Subtle Texture (Solo Leveling Shadow Monarch Theme) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Solo Leveling Shadow Monarch Dungeon Gate & Pillars (back4.png) */}
        <motion.div
          style={{ scale: bgScale, x: bgX }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        >
          <img
            src={back4Image}
            alt="Solo Leveling Shadow Monarch Gate"
            className="w-full h-full object-cover object-center opacity-65 filter contrast-125 saturate-125 select-none pointer-events-none"
          />
          {/* Vertical and Radial Depth Gradients for perfect text readability and abyssal mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-black/75" />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 40% 50%, transparent 20%, rgba(2,0,5,0.7) 70%, #020005 100%)',
            }}
          />
        </motion.div>

        {/* Shadow Monarch Abyssal Violet Nebula */}
        <div
          className="absolute -top-24 left-10 w-[70vw] h-[500px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.28) 0%, rgba(76, 29, 149, 0.18) 45%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Electric Astral Cyan Blade / Monarch Eye Flare */}
        <div
          className="absolute -bottom-24 right-1/4 w-[60vw] h-[400px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.2) 0%, rgba(30, 58, 138, 0.15) 45%, transparent 70%)',
            filter: 'blur(85px)',
          }}
        />
        {/* S-Rank Dungeon Gate Crimson Rift Glow */}
        <div
          className="absolute top-1/4 right-10 w-[45vw] h-[350px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.2) 0%, rgba(153, 27, 27, 0.1) 40%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Fine Anime Dot Matrix & Dungeon Grid */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px), radial-gradient(rgba(0, 212, 255, 0.25) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />
      </div>

      {/* Sleek Solo Leveling System Top Navigation HUD */}
      <div className="relative z-30 w-full px-4 sm:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-purple-900/30 bg-black/60 backdrop-blur-md">
        {/* Left: Quest System Tag & Category Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-6">
          <div className="flex items-center gap-2.5">
            <span className="font-orbitron inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-[#00d4ff]/60 bg-[#00d4ff]/10 text-[#00d4ff] text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase shadow-[0_0_15px_rgba(0,212,255,0.3)]">
              <Flame className="w-3.5 h-3.5 text-[#00d4ff] animate-pulse" />
              [ SYSTEM : QUEST DIRECTIVE ]
            </span>
            <span className="text-[10px] sm:text-xs font-orbitron font-bold text-[#ffd700] bg-black/80 px-2.5 py-1 rounded-sm border border-[#ffd700]/40 tracking-wider shadow-sm">
              ₹3.4L+ BOUNTY POOL
            </span>
          </div>

          {/* Hunter Class Categories (Horizontal Scrollable Holographic Tabs) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="font-system relative px-3 py-1 rounded text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] transition-all whitespace-nowrap cursor-pointer border shrink-0"
                  style={{
                    backgroundColor: isActive ? 'rgba(124, 58, 237, 0.85)' : 'rgba(10, 5, 20, 0.65)',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    borderColor: isActive ? '#a855f7' : 'rgba(124, 58, 237, 0.25)',
                    boxShadow: isActive ? '0 0 16px rgba(168, 85, 247, 0.6)' : 'none',
                  }}
                >
                  {cat}
                  {cat === 'All' && ` [${QUESTS.length}]`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Search, Raid Stream & Return to About */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Minimal Search Pill */}
          <div className="relative w-36 sm:w-48 lg:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search raid boss, rank, guild..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1 rounded bg-black/80 border border-purple-900/50 text-xs font-system text-white placeholder-zinc-500 focus:outline-none focus:border-[#00d4ff] transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Raid Stream Progress Pill */}
          <div className="hidden lg:flex items-center gap-2 bg-black/80 px-3 py-1 rounded border border-purple-500/30 backdrop-blur-md shadow-md">
            <span className="text-[10px] font-orbitron text-zinc-300 uppercase tracking-wider">
              Raid Stream
            </span>
            <div className="w-16 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/10">
              <motion.div
                style={{ width: scrollIndicatorWidth }}
                className="h-full bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#ffffff]"
              />
            </div>
          </div>

          {/* Return to About Button */}
          <button
            onClick={scrollToAbout}
            title="Return to About Section"
            className="font-system inline-flex items-center gap-1.5 px-3.5 py-1 rounded border border-purple-500/40 bg-black/80 text-zinc-200 hover:text-white hover:border-[#00d4ff] hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all text-xs uppercase tracking-wider shrink-0 cursor-pointer backdrop-blur-md"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#00d4ff]" />
            <span>About</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 flex-1 w-full overflow-hidden flex items-center">
        {/* ======================================================== */}
        {/* SOLO LEVELING PINNED CANVAS TYPOGRAPHY                   */}
        {/* Pinned directly on the background canvas, perfectly      */}
        {/* aligned on the left without overlapping cards             */}
        {/* ======================================================== */}
        <div className="pointer-events-none absolute left-6 sm:left-10 lg:left-14 xl:left-20 top-1/2 -translate-y-1/2 z-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg select-none">
          {/* Japanese/Hangul Background Accent */}
          <div className="font-solo text-6xl sm:text-8xl lg:text-9xl text-purple-500/10 leading-none select-none pointer-events-none mb-1 font-black tracking-widest">
            ARISE
          </div>

          {/* System Alert Directive */}
          <div className="flex items-center gap-2 text-xs font-orbitron font-semibold tracking-[0.2em] text-[#00d4ff] mb-2 uppercase">
            <span className="inline-block w-2 h-2 rounded-sm bg-[#00d4ff] animate-ping" />
            // SYSTEM ALERT : DUNGEON DIRECTIVE
          </div>

          {/* Big Pinned Statement */}
          <h2 className="font-solo text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-[0.06em] text-white leading-[0.98] drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
            GREAT RAIDS<br />
            CAN'T HAPPEN<br />
            WITHOUT<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#c084fc] to-[#ffffff] drop-shadow-[0_0_25px_rgba(0,212,255,0.6)]">
              HUNTERS.
            </span>
          </h2>

          {/* Statement Tagline */}
          <div className="mt-3 sm:mt-4 flex items-center gap-2 text-[11px] sm:text-xs font-orbitron font-semibold text-[#a855f7] uppercase tracking-[0.15em]">
            <span className="text-[#00d4ff]">▶</span>
            <span>6 S-RANK DUNGEON GATES UNSEALED</span>
          </div>

          {/* Narrative Line */}
          <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-system max-w-md hidden sm:block leading-relaxed tracking-wider uppercase">
            The Monarch has unsealed 6 S-Rank Dungeon Gates across TECHFEST 2026. Assemble your guild squad, conquer the bosses, and claim your hunter bounty before portal collapse.
          </p>
        </div>

        {/* ======================================================== */}
        {/* HORIZONTAL FLOATING 3D CARDS STREAM                      */}
        {/* Slides horizontally as the user scrolls                  */}
        {/* ======================================================== */}
        <motion.div
          style={{ x: trackX }}
          className="relative z-10 flex items-center gap-6 sm:gap-8 lg:gap-10 py-6 sm:py-8 pl-6 pr-24"
        >
          {filteredQuests.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center w-[350px] bg-zinc-900/60 rounded-2xl border border-zinc-800 p-8 backdrop-blur-xl">
              <ShieldAlert className="w-10 h-10 text-zinc-500 mb-2" />
              <h3 className="font-naruto text-lg text-zinc-300">No Raids Found</h3>
              <p className="text-xs text-zinc-500 mt-1">
                Try clearing search query or selecting another category.
              </p>
            </div>
          ) : (
            filteredQuests.map((quest, index) => {
              const isRegistered = registeredMap[quest.id];
              const isFlipped = !!flippedCards[quest.id];
              // Alternating vertical offset creating the wavy 3D floating ribbon from reference
              const isEven = index % 2 === 0;
              // Subtle alternating vertical offset for mobile, more pronounced on desktop
              const verticalFloat = isEven ? '-translate-y-2 sm:-translate-y-6' : 'translate-y-2 sm:translate-y-6';
              // Card 1 specifically uses the epic Sung Jin-Woo card1.png from components
              const backImage = quest.id === 1 ? card1Image : quest.image;

              return (
                <div
                  key={quest.id}
                  className={`group relative w-[285px] xs:w-[320px] sm:w-[360px] lg:w-[390px] h-[435px] xs:h-[465px] sm:h-[505px] lg:h-[535px] select-none shrink-0 ${verticalFloat}`}
                  style={{
                    perspective: 1400,
                    transform: isFlipped
                      ? 'perspective(1400px) rotateY(0deg) rotateX(0deg)'
                      : 'perspective(1400px) rotateY(-6deg) rotateX(2deg) rotateZ(-0.5deg)',
                    transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                >
                  <motion.div
                    animate={{
                      rotateY: isFlipped ? 180 : 0,
                      scale: isFlipped ? 1.02 : 1,
                    }}
                    transition={{
                      duration: 0.75,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    onClick={() => toggleFlip(quest.id)}
                    className="relative w-full h-full cursor-pointer"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    whileHover={
                      !isFlipped
                        ? {
                            scale: 1.03,
                            transition: { duration: 0.25, ease: 'easeOut' },
                          }
                        : undefined
                    }
                  >
                    {/* ================================================= */}
                    {/* FRONT FACE (QUEST BRIEFING)                       */}
                    {/* ================================================= */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl border border-white/20 hover:border-red-500/80 transition-colors duration-300 overflow-hidden flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_25px_rgba(220,38,38,0.15)]"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg) translateZ(1px)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        background:
                          'linear-gradient(165deg, rgba(255, 255, 255, 0.16) 0%, rgba(20, 5, 5, 0.84) 35%, rgba(0, 0, 0, 0.95) 100%)',
                      }}
                    >
                      {/* Glowing Top Accent Line */}
                      <div
                        className="absolute top-0 inset-x-0 h-[3px] opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: quest.color }}
                      />

                      {/* Card Header Info */}
                      <div className="p-3.5 sm:p-4 pb-1.5 flex items-center justify-between z-10">
                        <div className="flex items-center gap-2">
                          <span
                            className="font-orbitron px-2.5 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider border shadow-md"
                            style={{
                              backgroundColor: 'rgba(5, 8, 17, 0.85)',
                              borderColor: quest.color,
                              color: quest.color,
                            }}
                          >
                            {quest.rank}
                          </span>
                          <span className="text-[10px] font-orbitron uppercase text-zinc-400 tracking-wider">
                            {quest.element}
                          </span>
                        </div>

                        {/* Interactive Flip Badge & Kanji */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFlip(quest.id);
                            }}
                            title="Click to awaken card"
                            className="font-system inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/60 hover:bg-purple-900 text-purple-300 hover:text-white text-[10px] font-bold tracking-[0.1em] uppercase transition-all shadow-[0_0_10px_rgba(168,85,247,0.4)] cursor-pointer"
                          >
                            <RotateCw className="w-2.5 h-2.5 text-purple-400" />
                            <span>AWAKEN</span>
                          </button>
                          <div className="font-shojumaru text-sm sm:text-base font-bold text-white/80 bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md">
                            {quest.kanji}
                          </div>
                        </div>
                      </div>

                      {/* Card Image Banner */}
                      <div className="relative mx-3 sm:mx-4 h-34 xs:h-38 sm:h-44 rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
                        <img
                          src={quest.image}
                          alt={quest.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter saturate-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

                        {/* Prize Ribbon in Image */}
                        <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 text-xs font-bold text-[#ffd700] drop-shadow-md bg-black/70 px-2.5 py-1 rounded-md border border-[#ffd700]/30 backdrop-blur-md">
                          <Trophy className="w-3.5 h-3.5 text-[#ffd700]" />
                          <span className="font-system tracking-wider font-bold">{quest.prize}</span>
                        </div>
                      </div>

                      {/* Card Body Narrative */}
                      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between z-10">
                        <div>
                          {/* Quest Title */}
                          <h3 className="font-solo text-base sm:text-lg text-white font-bold tracking-[0.05em] group-hover:text-[#00d4ff] transition-colors leading-snug">
                            {quest.title}
                          </h3>

                          {/* Snippet / Narrative Quote */}
                          <p className="text-xs font-system text-zinc-300 mt-1.5 line-clamp-2 leading-relaxed font-normal tracking-wide">
                            "{quest.snippet}"
                          </p>
                        </div>

                        {/* Meta Row: Date & Team */}
                        <div className="pt-2.5 border-t border-white/10 mt-2">
                          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-system tracking-wider mb-2.5">
                            <span className="flex items-center gap-1 truncate">
                              <Calendar className="w-3.5 h-3.5 text-[#00d4ff] shrink-0" />
                              <span className="truncate">{quest.date}</span>
                            </span>
                            <span className="flex items-center gap-1 text-zinc-300 shrink-0">
                              <Users className="w-3.5 h-3.5 text-zinc-400" />
                              <span>{quest.team}</span>
                            </span>
                          </div>

                          {/* Action Buttons: Dossier & Enlist */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDossier(quest);
                              }}
                              className="font-system flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-white text-xs uppercase tracking-[0.12em] font-semibold transition-colors cursor-pointer border border-purple-900/50 shadow-sm"
                            >
                              <span>Dossier</span>
                              <ChevronRight className="w-3.5 h-3.5 text-[#00d4ff]" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRegister(quest.id);
                              }}
                              className="font-system inline-flex items-center justify-center gap-1 py-2 px-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.12em] transition-all cursor-pointer shadow-md"
                              style={{
                                backgroundColor: isRegistered ? '#10b981' : quest.color,
                                color: isRegistered ? '#ffffff' : '#050811',
                              }}
                            >
                              {isRegistered ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>Joined</span>
                                </>
                              ) : (
                                <>
                                  <span>Enlist</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ================================================= */}
                    {/* BACK FACE (AWAKENED FULL ART CARD1.PNG)          */}
                    {/* ================================================= */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl border-2 border-purple-500/80 overflow-hidden flex flex-col justify-between shadow-[0_0_45px_rgba(168,85,247,0.55),0_25px_60px_rgba(0,0,0,0.95)]"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg) translateZ(1px)',
                        background: '#0a050d',
                      }}
                    >
                      {/* Full-Bleed Collectible Anime Art */}
                      <img
                        src={backImage}
                        alt={`${quest.title} Awakened Card`}
                        className="absolute inset-0 w-full h-full object-cover object-center filter saturate-110 contrast-105"
                      />

                      {/* Holographic Prismatic Foil Shimmer */}
                      <div
                        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-color-dodge"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(168, 85, 247, 0.3) 30%, transparent 60%, rgba(0, 212, 255, 0.4) 100%)',
                        }}
                      />

                      {/* Vignette gradients for text readability */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/75" />

                      {/* Top Header Floating Badge */}
                      <div className="relative z-20 p-3 sm:p-4 flex items-center justify-between">
                        <span className="font-orbitron text-[10px] sm:text-xs px-2.5 py-1 rounded-sm bg-black/80 border border-purple-500/70 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.6)] flex items-center gap-1.5 backdrop-blur-md tracking-[0.1em]">
                          <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                          {quest.id === 1 ? 'SHADOW MONARCH AWAKENED' : `${quest.rank} AWAKENED`}
                        </span>

                        <span className="font-shojumaru text-sm text-purple-200 bg-black/80 px-2 py-0.5 rounded border border-purple-500/40 backdrop-blur-md">
                          {quest.kanji}
                        </span>
                      </div>

                      {/* Bottom Footer Controls */}
                      <div className="relative z-20 p-3 sm:p-4 space-y-2">
                        {/* Quote from Solo Leveling */}
                        <div className="px-2.5 py-1.5 rounded-lg bg-black/75 border border-purple-500/30 backdrop-blur-md">
                          <p className="font-solo text-[11px] sm:text-xs text-purple-100/95 leading-tight italic tracking-wide">
                            {quest.id === 1
                              ? '"I don\'t just become stronger. I leave everything behind."'
                              : `"${quest.snippet}"`}
                          </p>
                        </div>

                        {/* Action Buttons: Flip Back & Enlist */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFlip(quest.id);
                            }}
                            className="font-system flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-black/85 hover:bg-purple-950 text-white text-xs uppercase tracking-[0.12em] font-semibold transition-all border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-md cursor-pointer hover:border-purple-400"
                          >
                            <RotateCw className="w-3.5 h-3.5 text-purple-400" />
                            <span>FLIP TO QUEST</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRegister(quest.id);
                            }}
                            className="font-system px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs uppercase tracking-[0.12em] font-bold shadow-[0_0_20px_rgba(147,51,234,0.6)] transition-all cursor-pointer"
                          >
                            {isRegistered ? 'JOINED' : 'ENLIST'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })
          )}
        </motion.div>
      </div>

      {/* Interactive Quest Dossier Modal */}
      <AnimatePresence>
        {activeDossier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-zinc-950 border-2 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col"
              style={{ borderColor: activeDossier.color }}
            >
              {/* Modal Top Banner */}
              <div className="relative h-48 sm:h-56 shrink-0 bg-black overflow-hidden">
                <img
                  src={activeDossier.image}
                  alt={activeDossier.title}
                  className="w-full h-full object-cover filter saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/60" />

                {/* Close Button */}
                <button
                  onClick={() => setActiveDossier(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 text-zinc-300 hover:text-white hover:bg-black transition-colors cursor-pointer border border-white/20"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Rank Pill & Kanji */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span
                    className="font-orbitron px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider border shadow-md"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.85)',
                      borderColor: activeDossier.color,
                      color: activeDossier.color,
                    }}
                  >
                    {activeDossier.rank}
                  </span>
                  <span className="font-shojumaru text-sm font-bold text-white bg-black/70 px-2 py-0.5 rounded border border-white/20">
                    {activeDossier.kanji}
                  </span>
                </div>

                {/* Title and Prize in Banner */}
                <div className="absolute bottom-3 inset-x-4">
                  <h2 className="font-solo text-xl sm:text-2xl md:text-3xl text-white font-bold tracking-wide">
                    {activeDossier.title}
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-orbitron font-bold text-[#ffd700] mt-1">
                    <Trophy className="w-4 h-4" />
                    <span>PRIZE BOUNTY: {activeDossier.prize}</span>
                  </div>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4 font-system">
                {/* Meta Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-zinc-900/80 border border-zinc-800">
                    <div className="text-zinc-500 font-orbitron text-[10px] uppercase">Category</div>
                    <div className="font-bold text-zinc-200 mt-0.5">{activeDossier.category}</div>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-900/80 border border-zinc-800">
                    <div className="text-zinc-500 font-orbitron text-[10px] uppercase">Raid Squad</div>
                    <div className="font-bold text-zinc-200 mt-0.5">{activeDossier.team}</div>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-900/80 border border-zinc-800 col-span-2 sm:col-span-1">
                    <div className="text-zinc-500 font-orbitron text-[10px] uppercase">Threat Tier</div>
                    <div className="font-bold text-[#ff0055] mt-0.5">{activeDossier.threat}</div>
                  </div>
                </div>

                {/* Schedule & Venue */}
                <div className="space-y-1.5 text-xs text-zinc-300 font-system bg-zinc-900/40 p-3 rounded border border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#00d4ff]" />
                    <span>{activeDossier.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#ff0055]" />
                    <span>{activeDossier.venue}</span>
                  </div>
                </div>

                {/* Mission Narrative */}
                <div>
                  <h4 className="font-orbitron text-xs text-[#00d4ff] uppercase tracking-wider mb-1 font-semibold">
                    MISSION BRIEFING
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {activeDossier.description}
                  </p>
                </div>

                {/* Raid Rules */}
                <div>
                  <h4 className="font-orbitron text-xs text-[#ffd700] uppercase tracking-wider mb-1.5 font-semibold">
                    RAID CODEX & RULES
                  </h4>
                  <ul className="space-y-1.5">
                    {activeDossier.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <span className="text-[#00d4ff] font-bold">›</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer Action */}
              <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between gap-3 shrink-0">
                <button
                  onClick={() => setActiveDossier(null)}
                  className="font-system px-4 py-2 rounded text-xs text-zinc-400 hover:text-white uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    handleRegister(activeDossier.id);
                    alert(`Enlisted for ${activeDossier.title}! Your hunter pass has been verified.`);
                    setActiveDossier(null);
                  }}
                  className="font-system flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                  style={{
                    backgroundColor: registeredMap[activeDossier.id] ? '#10b981' : activeDossier.color,
                    color: registeredMap[activeDossier.id] ? '#ffffff' : '#050811',
                  }}
                >
                  {registeredMap[activeDossier.id] ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Enlisted in Raid</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      <span>Confirm Raid Registration</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestSection;
