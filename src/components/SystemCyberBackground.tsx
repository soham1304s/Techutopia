import React from 'react';
import { motion } from 'framer-motion';

interface SystemCyberBackgroundProps {
  isActive: boolean;
}

export const SystemCyberBackground: React.FC<SystemCyberBackgroundProps> = ({ isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.2 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#020108]"
      style={{ willChange: 'opacity' }}
    >
      {/* ======================================================== */}
      {/* 1. DEEP CYBER AMBIENT AURAS & VOLUMETRIC LIGHT MESH      */}
      {/* ======================================================== */}
      {/* Deep Void Base Radial Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(14, 165, 233, 0.18) 0%, rgba(88, 28, 135, 0.22) 38%, rgba(2, 1, 8, 0.95) 75%, #020108 100%)',
        }}
      />

      {/* Pulsing Central Plasma Core Glow */}
      <motion.div
        animate={{
          scale: isActive ? [1, 1.15, 1] : 0.85,
          opacity: isActive ? [0.4, 0.7, 0.4] : 0.2,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 212, 255, 0.35) 0%, rgba(147, 51, 234, 0.25) 45%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Diagonal Volumetric Light Beams */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-40">
        <motion.div
          animate={
            isActive
              ? {
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [0, 360],
                }
              : { opacity: 0 }
          }
          transition={{
            opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 90, repeat: Infinity, ease: 'linear' },
          }}
          className="w-[140vw] h-[140vw] max-w-[1600px] max-h-[1600px]"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0, 212, 255, 0.15) 30deg, transparent 60deg, rgba(168, 85, 247, 0.15) 120deg, transparent 150deg, rgba(0, 212, 255, 0.12) 210deg, transparent 240deg, rgba(168, 85, 247, 0.15) 300deg, transparent 330deg)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* ======================================================== */}
      {/* 2. 3D PERSPECTIVE CYBERSPACE GRID (FLOOR & CEILING)      */}
      {/* ======================================================== */}
      {/* Infinite Horizon Floor Grid */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[48vh] overflow-hidden pointer-events-none"
        style={{
          perspective: '600px',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, transparent 100%)',
        }}
      >
        <motion.div
          animate={isActive ? { backgroundPositionY: ['0px', '48px'] } : {}}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-full h-full origin-bottom"
          style={{
            transform: 'rotateX(68deg) scale(1.6)',
            backgroundImage:
              'linear-gradient(rgba(0, 212, 255, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.35) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            backgroundPosition: 'center 0',
          }}
        />
      </div>

      {/* Infinite Ceiling Grid (Subtle) */}
      <div
        className="absolute top-0 left-0 right-0 h-[38vh] overflow-hidden pointer-events-none opacity-40"
        style={{
          perspective: '600px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 30%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 30%, transparent 100%)',
        }}
      >
        <motion.div
          animate={isActive ? { backgroundPositionY: ['48px', '0px'] } : {}}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-full h-full origin-top"
          style={{
            transform: 'rotateX(-68deg) scale(1.6)',
            backgroundImage:
              'linear-gradient(rgba(168, 85, 247, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.25) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            backgroundPosition: 'center 0',
          }}
        />
      </div>

      {/* Center Horizon Laser Glow Line */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent shadow-[0_0_15px_#00d4ff,0_0_30px_#a855f7] opacity-60 pointer-events-none" />

      {/* ======================================================== */}
      {/* 3. HEXAGONAL HONEYCOMB MATRIX OVERLAY (SVG VECTOR)       */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, transparent 80%)',
        }}
      >
        <svg className="w-full h-full" width="100%" height="100%">
          <defs>
            <pattern
              id="system-hex-pattern"
              width="56"
              height="96.99"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(1)"
            >
              <path
                d="M28 0 L56 16.165 L56 48.497 L28 64.662 L0 48.497 L0 16.165 Z M28 96.995 L56 80.83 L56 48.497 L28 64.662 L0 48.497 L0 80.83 Z"
                fill="none"
                stroke="rgba(0, 212, 255, 0.35)"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#system-hex-pattern)" />
        </svg>
      </div>

      {/* ======================================================== */}
      {/* 4. SOPHISTICATED HOLOGRAPHIC SVG HUD RINGS & RETICLES    */}
      {/* ======================================================== */}
      <motion.div
        animate={{
          scale: isActive ? [1, 1.03, 1] : 0.85,
          opacity: isActive ? 1 : 0.3,
        }}
        transition={{
          scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 1 },
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <svg
          viewBox="0 0 900 900"
          className="w-[92vw] h-[92vw] max-w-[850px] max-h-[850px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hud-cyan-purple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
            </linearGradient>
            <filter id="hud-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* RING 1 (OUTERMOST): Calibrated Degree Ring with Cardinal Ticks */}
          <motion.g
            animate={isActive ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '450px 450px' }}
          >
            <circle
              cx="450"
              cy="450"
              r="410"
              stroke="rgba(0, 212, 255, 0.3)"
              strokeWidth="1.2"
              strokeDasharray="4 8"
            />
            <circle
              cx="450"
              cy="450"
              r="400"
              stroke="rgba(168, 85, 247, 0.35)"
              strokeWidth="0.8"
            />

            {/* 36 Angle Tick Marks */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 360) / 36;
              const isCardinal = i % 9 === 0;
              const len = isCardinal ? 18 : 8;
              const rad = (angle * Math.PI) / 180;
              const x1 = 450 + Math.cos(rad) * (410 - len);
              const y1 = 450 + Math.sin(rad) * (410 - len);
              const x2 = 450 + Math.cos(rad) * 410;
              const y2 = 450 + Math.sin(rad) * 410;

              return (
                <line
                  key={`tick-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isCardinal ? '#00d4ff' : 'rgba(0, 212, 255, 0.4)'}
                  strokeWidth={isCardinal ? '2' : '1'}
                />
              );
            })}

            {/* Tactical Degree Readouts */}
            <text x="450" y="30" fill="#00d4ff" fontSize="10" fontFamily="Orbitron, monospace" textAnchor="middle" letterSpacing="3">
              [ 000° // NORTH NODE ]
            </text>
            <text x="870" y="454" fill="#a855f7" fontSize="10" fontFamily="Orbitron, monospace" textAnchor="middle" letterSpacing="3">
              [ 090° ]
            </text>
            <text x="450" y="880" fill="#00d4ff" fontSize="10" fontFamily="Orbitron, monospace" textAnchor="middle" letterSpacing="3">
              [ 180° // SOUTH ANOMALY ]
            </text>
            <text x="30" y="454" fill="#a855f7" fontSize="10" fontFamily="Orbitron, monospace" textAnchor="middle" letterSpacing="3">
              [ 270° ]
            </text>
          </motion.g>

          {/* RING 2: Segmented High-Tech Tactical Arc System (Counter-Rotating) */}
          <motion.g
            animate={isActive ? { rotate: -360 } : { rotate: 0 }}
            transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '450px 450px' }}
          >
            {/* Bold glowing segmented arcs */}
            <circle
              cx="450"
              cy="450"
              r="340"
              stroke="url(#hud-cyan-purple)"
              strokeWidth="2.5"
              strokeDasharray="180 60 260 80 140 100"
              filter="url(#hud-glow)"
            />

            {/* Glowing circular node beads along the arc path */}
            {[0, 60, 150, 240, 310].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const cx = 450 + Math.cos(rad) * 340;
              const cy = 450 + Math.sin(rad) * 340;
              return (
                <g key={`bead-${deg}`}>
                  <circle cx={cx} cy={cy} r="4" fill="#00d4ff" />
                  <circle cx={cx} cy={cy} r="8" stroke="#00d4ff" strokeWidth="1" opacity="0.6" />
                </g>
              );
            })}
          </motion.g>

          {/* RING 3: Inscribed Sacred Geometric Hexagram & Arcane Nodes */}
          <motion.g
            animate={isActive ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '450px 450px' }}
          >
            <circle
              cx="450"
              cy="450"
              r="270"
              stroke="rgba(0, 212, 255, 0.4)"
              strokeWidth="1.2"
              strokeDasharray="12 12"
            />

            {/* Inscribed 12-point Geometric Star Lines */}
            {Array.from({ length: 6 }).map((_, idx) => {
              const a1 = (idx * 60 * Math.PI) / 180;
              const a2 = (((idx + 2) * 60) * Math.PI) / 180;
              const x1 = 450 + Math.cos(a1) * 270;
              const y1 = 450 + Math.sin(a1) * 270;
              const x2 = 450 + Math.cos(a2) * 270;
              const y2 = 450 + Math.sin(a2) * 270;

              return (
                <line
                  key={`star-line-${idx}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(168, 85, 247, 0.45)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Hexagonal Vertex Diamond Nodes */}
            {Array.from({ length: 6 }).map((_, idx) => {
              const angle = (idx * 60 * Math.PI) / 180;
              const x = 450 + Math.cos(angle) * 270;
              const y = 450 + Math.sin(angle) * 270;
              return (
                <rect
                  key={`hex-node-${idx}`}
                  x={x - 5}
                  y={y - 5}
                  width="10"
                  height="10"
                  transform={`rotate(45 ${x} ${y})`}
                  fill="#00d4ff"
                  stroke="#ffffff"
                  strokeWidth="1"
                  filter="url(#hud-glow)"
                />
              );
            })}
          </motion.g>

          {/* RING 4: Central Arcane Core Runes & Concentric Radar Ring */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '450px 450px' }}
          >
            <circle
              cx="450"
              cy="450"
              r="200"
              stroke="rgba(0, 212, 255, 0.5)"
              strokeWidth="1.5"
              strokeDasharray="6 24"
            />
            <circle
              cx="450"
              cy="450"
              r="140"
              stroke="rgba(168, 85, 247, 0.4)"
              strokeWidth="1"
              strokeDasharray="8 8"
            />
          </motion.g>

          {/* Precision Corner Framing Reticles for Central Modal */}
          <g stroke="#00d4ff" strokeWidth="2" opacity="0.6">
            <path d="M 230 250 L 210 250 L 210 270" />
            <path d="M 670 250 L 690 250 L 690 270" />
            <path d="M 210 630 L 210 650 L 230 650" />
            <path d="M 690 630 L 690 650 L 670 650" />
          </g>
        </svg>
      </motion.div>

      {/* ======================================================== */}
      {/* 5. VERTICAL CYBER TELEMETRY DATA STREAMS (FLANKS)        */}
      {/* ======================================================== */}
      {/* Left Flank Data Stream */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -30 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex flex-col gap-3 absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-10 font-orbitron text-[10px] tracking-[0.2em] text-cyan-400/80 pointer-events-none"
      >
        <div className="flex items-center gap-2 pb-1 border-b border-cyan-500/40 text-cyan-300 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>SYS.TELEMETRY_01</span>
        </div>
        <div className="space-y-1 text-zinc-400 font-system text-[11px]">
          <p><span className="text-cyan-400">[LINK]</span> STABLE // 100 Gbps</p>
          <p><span className="text-purple-400">[CORE]</span> OVERFLOW_CAPACITY</p>
          <p><span className="text-cyan-400">[CIPHER]</span> AES-GCM-256</p>
          <p><span className="text-purple-400">[DIMENSION]</span> S-RANK ANOMALY</p>
          <p><span className="text-cyan-400">[SYNC]</span> 99.892%</p>
        </div>

        {/* Dynamic Equalizer / Spectrum Bar */}
        <div className="flex items-end gap-1 h-8 pt-2">
          {isActive &&
            [40, 75, 55, 90, 60, 85, 45, 95, 70, 50].map((h, i) => (
              <motion.div
                key={`left-eq-${i}`}
                animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.5}%`] }}
                transition={{
                  duration: 1 + (i % 3) * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-1 bg-gradient-to-t from-cyan-500 to-purple-400 rounded-sm"
              />
            ))}
        </div>
      </motion.div>

      {/* Right Flank Data Stream */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 30 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="hidden lg:flex flex-col gap-3 absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-10 font-orbitron text-[10px] tracking-[0.2em] text-purple-400/80 pointer-events-none text-right"
      >
        <div className="flex items-center justify-end gap-2 pb-1 border-b border-purple-500/40 text-purple-300 font-bold">
          <span>HUNTER_MATRIX</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
        </div>
        <div className="space-y-1 text-zinc-400 font-system text-[11px]">
          <p>AWAKENING_SEQ <span className="text-purple-400">[0x7F9C]</span></p>
          <p>MANA_VOLTAGE <span className="text-cyan-400">[99,400 MHz]</span></p>
          <p>GATE_SECTOR <span className="text-purple-400">[SEOUL_01]</span></p>
          <p>THREAT_INDEX <span className="text-rose-400">[MAXIMUM]</span></p>
          <p>KERNEL_BUILD <span className="text-cyan-400">[2026.4.1]</span></p>
        </div>

        {/* Dynamic Equalizer / Spectrum Bar Right */}
        <div className="flex items-end justify-end gap-1 h-8 pt-2">
          {isActive &&
            [65, 45, 80, 50, 95, 70, 40, 85, 60, 75].map((h, i) => (
              <motion.div
                key={`right-eq-${i}`}
                animate={{ height: [`${h * 0.5}%`, `${h}%`, `${h * 0.3}%`] }}
                transition={{
                  duration: 1.1 + (i % 3) * 0.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-sm"
              />
            ))}
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 6. PROCEDURAL FLOATING MANA SPHERES & DATA PARTICLES     */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isActive &&
          Array.from({ length: 22 }).map((_, i) => {
            const isCyan = i % 2 === 0;
            const size = (i % 3) * 2 + 3;
            const leftPercent = (i * 100) / 22 + ((i * 13) % 7);
            const duration = 4.5 + (i % 5) * 0.8;
            const delay = (i * 0.3) % 2.5;

            return (
              <motion.div
                key={`mana-mote-${i}`}
                initial={{
                  y: '105vh',
                  x: `${leftPercent}vw`,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  y: ['105vh', '-5vh'],
                  x: [
                    `${leftPercent}vw`,
                    `${leftPercent + (i % 2 === 0 ? 3 : -3)}vw`,
                    `${leftPercent}vw`,
                  ],
                  opacity: [0, 0.85, 0.85, 0],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: isCyan ? '#00d4ff' : '#c084fc',
                  boxShadow: isCyan
                    ? '0 0 10px #00d4ff, 0 0 20px #00d4ff'
                    : '0 0 10px #c084fc, 0 0 20px #c084fc',
                }}
              />
            );
          })}
      </div>

      {/* ======================================================== */}
      {/* 7. RECURRENT ACTIVE CYBER SCANLINE SWEEP BEAM             */}
      {/* ======================================================== */}
      {isActive && (
        <motion.div
          animate={{
            top: ['-10%', '110%'],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-x-0 h-16 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(0, 212, 255, 0.08) 50%, rgba(0, 212, 255, 0.25) 95%, rgba(255, 255, 255, 0.4) 100%)',
            boxShadow: '0 2px 15px rgba(0, 212, 255, 0.3)',
          }}
        />
      )}
    </motion.div>
  );
};
export default SystemCyberBackground;
