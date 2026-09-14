import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Volume2,
  VolumeX,
  FastForward,
  ChevronRight,
  ShieldAlert,
  Terminal,
  Crown,
  Music,
} from 'lucide-react';
import jinwooImg from './jinwoo.webp';
import doorImg from '../assets/solo_leveling_door.webp';
import { SystemCyberBackground } from './SystemCyberBackground';

interface AnimeIntroProps {
  onComplete: () => void;
  onShatterStart?: () => void;
}

export type IntroAct = 'gate' | 'system' | 'arise' | 'shatter';

interface ActMeta {
  id: IntroAct;
  label: string;
  title: string;
  duration: number;
}

const ACT_METADATA: ActMeta[] = [
  { id: 'gate', label: '01 GATE', title: 'RED GATE BREACH', duration: 3600 },
  { id: 'system', label: '02 SYSTEM', title: 'SYSTEM AWAKENING', duration: 4200 },
  { id: 'arise', label: '03 ARISE', title: 'SHADOW MONARCH', duration: 3800 },
  { id: 'shatter', label: '04 SHATTER', title: 'DIMENSION SHATTER', duration: 1100 },
];

const RANKS = [
  { name: 'E-RANK', color: '#94a3b8' },
  { name: 'D-RANK', color: '#a3e635' },
  { name: 'C-RANK', color: '#38bdf8' },
  { name: 'B-RANK', color: '#818cf8' },
  { name: 'A-RANK', color: '#c084fc' },
  { name: 'S-RANK', color: '#f43f5e' },
  { name: '👑 SHADOW MONARCH', color: '#ffd700' },
];

const TITLES = [
  'E-Rank Hunter',
  'Wolf Slayer',
  'Demon Castle Conqueror',
  'Architect of Shadows',
  'MONARCH OF SHADOWS',
];

interface ShardData {
  clip: string;
  tx: number;
  ty: number;
  tz: number;
  rx: number;
  ry: number;
  rz: number;
  s: number;
  delay: number;
  gradientType: 0 | 1 | 2;
}

const SHARD_GRADIENTS = [
  'linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(200, 240, 255, 0.2) 35%, rgba(147, 51, 234, 0.14) 70%, rgba(255, 255, 255, 0.3) 100%)',
  'linear-gradient(120deg, rgba(255, 255, 255, 0.45) 0%, rgba(0, 212, 255, 0.22) 40%, rgba(192, 132, 252, 0.15) 75%, rgba(255, 255, 255, 0.35) 100%)',
  'linear-gradient(150deg, rgba(255, 255, 255, 0.38) 0%, rgba(56, 189, 248, 0.24) 45%, rgba(244, 63, 94, 0.12) 80%, rgba(255, 255, 255, 0.28) 100%)',
];

const SHATTER_SHARDS: ShardData[] = [
  // 1-6: Inner Epicenter Ring (blasted violently outward at high velocity, high 3D tumble)
  {
    clip: 'polygon(50% 50%, 38% 36%, 50% 26%, 58% 36%)',
    tx: -240, ty: -280, tz: 300, rx: -45, ry: -30, rz: -55, s: 0.65, delay: 0, gradientType: 0,
  },
  {
    clip: 'polygon(50% 50%, 58% 36%, 66% 36%, 64% 48%)',
    tx: 280, ty: -240, tz: 280, rx: 45, ry: 35, rz: 60, s: 0.68, delay: 0.01, gradientType: 1,
  },
  {
    clip: 'polygon(50% 50%, 64% 48%, 72% 56%, 60% 64%)',
    tx: 310, ty: 70, tz: 320, rx: -30, ry: 50, rz: -40, s: 0.72, delay: 0.02, gradientType: 2,
  },
  {
    clip: 'polygon(50% 50%, 60% 64%, 52% 72%, 40% 66%)',
    tx: 70, ty: 310, tz: 290, rx: 50, ry: -25, rz: 40, s: 0.68, delay: 0.01, gradientType: 0,
  },
  {
    clip: 'polygon(50% 50%, 40% 66%, 30% 58%, 36% 46%)',
    tx: -260, ty: 200, tz: 270, rx: -45, ry: -40, rz: -65, s: 0.72, delay: 0.02, gradientType: 1,
  },
  {
    clip: 'polygon(50% 50%, 36% 46%, 28% 40%, 38% 36%)',
    tx: -320, ty: -70, tz: 290, rx: 35, ry: -45, rz: 45, s: 0.68, delay: 0.01, gradientType: 2,
  },

  // 7-14: Mid Ring (medium shards with heavy 3D rotational momentum)
  {
    clip: 'polygon(38% 36%, 50% 12%, 62% 16%, 66% 36%, 50% 26%)',
    tx: 40, ty: -410, tz: 180, rx: -60, ry: 20, rz: 30, s: 0.78, delay: 0.02, gradientType: 1,
  },
  {
    clip: 'polygon(66% 36%, 86% 22%, 88% 46%, 64% 48%)',
    tx: 410, ty: -260, tz: 210, rx: 40, ry: 55, rz: -45, s: 0.8, delay: 0.03, gradientType: 0,
  },
  {
    clip: 'polygon(64% 48%, 88% 46%, 90% 72%, 72% 56%)',
    tx: 450, ty: 70, tz: 170, rx: -35, ry: 65, rz: 35, s: 0.82, delay: 0.02, gradientType: 2,
  },
  {
    clip: 'polygon(72% 56%, 90% 72%, 76% 90%, 60% 64%)',
    tx: 390, ty: 350, tz: 190, rx: 50, ry: 45, rz: -40, s: 0.8, delay: 0.04, gradientType: 1,
  },
  {
    clip: 'polygon(60% 64%, 76% 90%, 45% 94%, 52% 72%)',
    tx: 60, ty: 420, tz: 150, rx: 55, ry: -30, rz: 25, s: 0.82, delay: 0.03, gradientType: 0,
  },
  {
    clip: 'polygon(52% 72%, 45% 94%, 22% 84%, 40% 66%)',
    tx: -270, ty: 390, tz: 180, rx: 45, ry: -50, rz: -45, s: 0.78, delay: 0.04, gradientType: 2,
  },
  {
    clip: 'polygon(40% 66%, 22% 84%, 12% 54%, 30% 58%)',
    tx: -410, ty: 130, tz: 160, rx: -40, ry: -60, rz: 50, s: 0.8, delay: 0.03, gradientType: 1,
  },
  {
    clip: 'polygon(36% 46%, 12% 54%, 16% 26%, 38% 36%)',
    tx: -390, ty: -240, tz: 190, rx: -50, ry: -45, rz: -35, s: 0.82, delay: 0.02, gradientType: 0,
  },

  // 15-18: Outer Boundary Plates (large perimeter shards heaving and peeling off-screen)
  {
    clip: 'polygon(0% 0%, 50% 0%, 50% 12%, 16% 26%, 0% 30%)',
    tx: -350, ty: -380, tz: -100, rx: -25, ry: -20, rz: -15, s: 0.88, delay: 0.02, gradientType: 0,
  },
  {
    clip: 'polygon(50% 0%, 100% 0%, 100% 34%, 86% 22%, 62% 16%, 50% 12%)',
    tx: 370, ty: -380, tz: -100, rx: -25, ry: 25, rz: 18, s: 0.88, delay: 0.03, gradientType: 1,
  },
  {
    clip: 'polygon(100% 34%, 100% 100%, 45% 100%, 45% 94%, 76% 90%, 90% 72%, 100% 72%)',
    tx: 380, ty: 370, tz: -110, rx: 25, ry: 30, rz: -18, s: 0.88, delay: 0.03, gradientType: 2,
  },
  {
    clip: 'polygon(0% 30%, 0% 100%, 45% 100%, 45% 94%, 22% 84%, 12% 54%)',
    tx: -380, ty: 370, tz: -110, rx: 30, ry: -25, rz: 18, s: 0.88, delay: 0.04, gradientType: 1,
  },
];

interface NeedleData {
  clip: string;
  left: string;
  top: string;
  width: number;
  height: number;
  tx: number;
  ty: number;
  r: number;
  delay: number;
}

const NEEDLE_SHARDS: NeedleData[] = [
  { clip: 'polygon(50% 0%, 100% 100%, 0% 70%)', left: '49%', top: '48%', width: 35, height: 60, tx: -520, ty: -410, r: 420, delay: 0.01 },
  { clip: 'polygon(0% 0%, 100% 50%, 20% 100%)', left: '52%', top: '49%', width: 50, height: 32, tx: 560, ty: -340, r: -460, delay: 0.02 },
  { clip: 'polygon(50% 100%, 100% 0%, 0% 20%)', left: '51%', top: '52%', width: 40, height: 65, tx: 420, ty: 520, r: 380, delay: 0.01 },
  { clip: 'polygon(100% 0%, 0% 50%, 80% 100%)', left: '47%', top: '51%', width: 55, height: 36, tx: -550, ty: 390, r: -430, delay: 0.02 },
  { clip: 'polygon(30% 0%, 100% 80%, 0% 100%)', left: '50%', top: '46%', width: 32, height: 50, tx: -90, ty: -560, r: 320, delay: 0.01 },
  { clip: 'polygon(70% 0%, 100% 100%, 0% 60%)', left: '53%', top: '47%', width: 44, height: 40, tx: 460, ty: -490, r: -390, delay: 0.03 },
  { clip: 'polygon(0% 40%, 100% 0%, 60% 100%)', left: '54%', top: '50%', width: 58, height: 28, tx: 600, ty: 50, r: 450, delay: 0.02 },
  { clip: 'polygon(40% 100%, 100% 20%, 0% 0%)', left: '53%', top: '53%', width: 38, height: 58, tx: 500, ty: 460, r: -350, delay: 0.01 },
  { clip: 'polygon(50% 100%, 80% 0%, 0% 40%)', left: '49%', top: '54%', width: 34, height: 62, tx: 80, ty: 580, r: 390, delay: 0.02 },
  { clip: 'polygon(0% 70%, 100% 100%, 50% 0%)', left: '46%', top: '53%', width: 45, height: 45, tx: -430, ty: 490, r: -440, delay: 0.03 },
  { clip: 'polygon(0% 0%, 100% 30%, 40% 100%)', left: '45%', top: '50%', width: 54, height: 30, tx: -580, ty: 30, r: 410, delay: 0.01 },
  { clip: 'polygon(20% 0%, 100% 60%, 0% 100%)', left: '46%', top: '47%', width: 40, height: 46, tx: -470, ty: -420, r: -420, delay: 0.02 },
  { clip: 'polygon(50% 0%, 100% 100%, 20% 80%)', left: '48%', top: '49%', width: 28, height: 42, tx: -240, ty: -200, r: 270, delay: 0.03 },
  { clip: 'polygon(0% 20%, 100% 0%, 70% 100%)', left: '51%', top: '48%', width: 36, height: 28, tx: 250, ty: -180, r: -290, delay: 0.02 },
  { clip: 'polygon(80% 100%, 100% 0%, 0% 50%)', left: '52%', top: '51%', width: 32, height: 38, tx: 220, ty: 230, r: 310, delay: 0.03 },
  { clip: 'polygon(100% 50%, 0% 100%, 30% 0%)', left: '48%', top: '52%', width: 38, height: 34, tx: -200, ty: 220, r: -280, delay: 0.02 },
];

export const AnimeIntro: React.FC<AnimeIntroProps> = ({ onComplete, onShatterStart }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [act, setAct] = useState<IntroAct>('gate');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Act 2 System Stats Animation State
  const [rankIndex, setRankIndex] = useState(0);
  const [hunterLevel, setHunterLevel] = useState(1);
  const [titleIndex, setTitleIndex] = useState(0);
  const [manaProgress, setManaProgress] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const actTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const prevActRef = useRef<IntroAct>('gate');

  // ========================================================
  // BACKGROUND MUSIC (SOLO LEVELING ANIME AURA THEME)
  // ========================================================
  useEffect(() => {
    const audio = new Audio('/audio/solo_leveling_aura.mp3');
    audio.loop = true;
    audio.volume = 0.85;
    audio.preload = 'auto';
    bgmRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      bgmRef.current = null;
    };
  }, []);

  // Handle Play/Pause based on sound state
  useEffect(() => {
    if (!bgmRef.current) return;
    if (soundEnabled) {
      const playPromise = bgmRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy: will resume on deliberate user click
        });
      }
    } else {
      bgmRef.current.pause();
    }
  }, [soundEnabled]);

  // ========================================================
  // SYNTHESIZED WEB AUDIO SFX ENGINE
  // ========================================================
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number, duration: number, type: OscillatorType = 'sine', gainVal = 0.1) => {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Fallback for strict browser autoplay
      }
    },
    [soundEnabled, getAudioContext]
  );


  const playGateOpenSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const duration = 2.4;

      // 1. Tectonic Sub-bass Stone Rumble (Sawtooth + resonant Low-pass filter)
      const rumbleOsc = ctx.createOscillator();
      const rumbleFilter = ctx.createBiquadFilter();
      const rumbleGain = ctx.createGain();

      rumbleOsc.type = 'sawtooth';
      rumbleOsc.frequency.setValueAtTime(40, now);
      rumbleOsc.frequency.exponentialRampToValueAtTime(54, now + duration * 0.6);
      rumbleOsc.frequency.exponentialRampToValueAtTime(32, now + duration);

      rumbleFilter.type = 'lowpass';
      rumbleFilter.frequency.setValueAtTime(80, now);
      rumbleFilter.frequency.exponentialRampToValueAtTime(150, now + 0.9);
      rumbleFilter.frequency.exponentialRampToValueAtTime(60, now + duration);
      rumbleFilter.Q.setValueAtTime(4.0, now);

      rumbleGain.gain.setValueAtTime(0.001, now);
      rumbleGain.gain.linearRampToValueAtTime(0.28, now + 0.35);
      rumbleGain.gain.setValueAtTime(0.26, now + 1.6);
      rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      rumbleOsc.connect(rumbleFilter);
      rumbleFilter.connect(rumbleGain);
      rumbleGain.connect(ctx.destination);
      rumbleOsc.start(now);
      rumbleOsc.stop(now + duration);

      // 2. Granite Friction Stone Drag Texture (Filtered Brown Noise)
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.8;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(240, now);
      noiseFilter.frequency.linearRampToValueAtTime(400, now + 1.1);
      noiseFilter.frequency.linearRampToValueAtTime(200, now + duration);
      noiseFilter.Q.setValueAtTime(2.2, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.22, now + 0.4);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSource.start(now);
      noiseSource.stop(now + duration);

      // 3. Ethereal Awakening Mana Gateway Chimes (C Major 9 chord)
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + 0.25 + idx * 0.12;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.09 / (idx + 1), startTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 1.3);
      });
    } catch {
      // Autoplay policy fallback
    }
  }, [soundEnabled, getAudioContext]);

  const playGateCloseSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const duration = 1.8;

      // Closing stone rumble
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(50, now);
      osc.frequency.linearRampToValueAtTime(35, now + duration);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);

      // Heavy Door Impact Thud at closing seam
      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();
      const thudTime = now + duration - 0.15;
      thudOsc.type = 'triangle';
      thudOsc.frequency.setValueAtTime(110, thudTime);
      thudOsc.frequency.exponentialRampToValueAtTime(25, thudTime + 0.5);
      thudGain.gain.setValueAtTime(0.35, thudTime);
      thudGain.gain.exponentialRampToValueAtTime(0.001, thudTime + 0.5);
      thudOsc.connect(thudGain);
      thudGain.connect(ctx.destination);
      thudOsc.start(thudTime);
      thudOsc.stop(thudTime + 0.5);
    } catch {
      // Autoplay policy fallback
    }
  }, [soundEnabled, getAudioContext]);

  const playRankUpChime = useCallback(
    (index: number) => {
      if (!soundEnabled) return;
      const baseFreqs = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5];
      const freq = baseFreqs[index % baseFreqs.length] || 880;
      playTone(freq, 0.18, 'sine', 0.14);
      playTone(freq * 1.5, 0.22, 'triangle', 0.08);
    },
    [soundEnabled, playTone]
  );

  const playMonarchSubDrop = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(28, ctx.currentTime + 0.85);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [soundEnabled, getAudioContext]);

  const playBladeSlashShatter = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // 0. Physical Glass Fracture Transient (Highpass Noise Snap Burst)
      const bufferSize = Math.floor(ctx.sampleRate * 0.045);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22));
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(2400, ctx.currentTime);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSource.start(ctx.currentTime);

      // 1. Acoustic Katana Razor Blade Swoosh
      const oscBlade = ctx.createOscillator();
      const gainBlade = ctx.createGain();
      oscBlade.type = 'sawtooth';
      oscBlade.frequency.setValueAtTime(2200, ctx.currentTime);
      oscBlade.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.35);
      gainBlade.gain.setValueAtTime(0.28, ctx.currentTime);
      gainBlade.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      oscBlade.connect(gainBlade);
      gainBlade.connect(ctx.destination);
      oscBlade.start();
      oscBlade.stop(ctx.currentTime + 0.4);

      // 2. Pure Metallic Steel Katana Resonant Ping (Harmonic Blade Sing)
      [1760, 3520].forEach((freq, idx) => {
        const oscSteel = ctx.createOscillator();
        const gainSteel = ctx.createGain();
        oscSteel.type = 'sine';
        oscSteel.frequency.setValueAtTime(freq, ctx.currentTime + 0.04);
        gainSteel.gain.setValueAtTime(0.16 / (idx + 1), ctx.currentTime + 0.04);
        gainSteel.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
        oscSteel.connect(gainSteel);
        gainSteel.connect(ctx.destination);
        oscSteel.start(ctx.currentTime + 0.04);
        oscSteel.stop(ctx.currentTime + 0.9);
      });

      // 3. Acoustic Dimensional Sub-Thud Impact (Deep bass shockwave)
      const oscSub = ctx.createOscillator();
      const gainSub = ctx.createGain();
      oscSub.type = 'triangle';
      oscSub.frequency.setValueAtTime(90, ctx.currentTime + 0.06);
      oscSub.frequency.exponentialRampToValueAtTime(22, ctx.currentTime + 0.65);
      gainSub.gain.setValueAtTime(0.38, ctx.currentTime + 0.06);
      gainSub.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      oscSub.connect(gainSub);
      gainSub.connect(ctx.destination);
      oscSub.start(ctx.currentTime + 0.06);
      oscSub.stop(ctx.currentTime + 0.7);

      // 4. Granular Acoustic Glass Shatter Clusters (12 high-frequency crystalline fractures)
      const glassFreqs = [2150, 2680, 3140, 3720, 4290, 4850, 5420, 6100, 6900, 7700, 8400, 9200];
      glassFreqs.forEach((freq, idx) => {
        const startTime = ctx.currentTime + 0.08 + idx * 0.015;
        const dur = 0.28 + (idx % 4) * 0.09;
        const oscG = ctx.createOscillator();
        const gainG = ctx.createGain();
        oscG.type = idx % 2 === 0 ? 'triangle' : 'sine';
        oscG.frequency.setValueAtTime(freq, startTime);
        oscG.frequency.exponentialRampToValueAtTime(freq * 0.65, startTime + dur);
        gainG.gain.setValueAtTime(0.07, startTime);
        gainG.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);
        oscG.connect(gainG);
        gainG.connect(ctx.destination);
        oscG.start(startTime);
        oscG.stop(startTime + dur);
      });

      // 5. High Crystalline Chime Resonance (Cascading Falling Shards)
      const chimeFreqs = [4186, 3520, 2793, 2093, 1567];
      chimeFreqs.forEach((freq, i) => {
        const t = ctx.currentTime + 0.18 + i * 0.07;
        const oscC = ctx.createOscillator();
        const gainC = ctx.createGain();
        oscC.type = 'sine';
        oscC.frequency.setValueAtTime(freq, t);
        gainC.gain.setValueAtTime(0.06, t);
        gainC.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
        oscC.connect(gainC);
        gainC.connect(ctx.destination);
        oscC.start(t);
        oscC.stop(t + 0.6);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }, [soundEnabled, getAudioContext]);

  // ========================================================
  // SKIP & NAVIGATION CONTROLS
  // ========================================================
  const handleSkip = useCallback(() => {
    onShatterStart?.();
    playBladeSlashShatter();
    setAct('shatter');

    // Smoothly fade out the Solo Leveling BGM
    if (bgmRef.current) {
      const audio = bgmRef.current;
      const fadeInterval = setInterval(() => {
        if (audio.volume > 0.08) {
          audio.volume = Math.max(0, audio.volume - 0.15);
        } else {
          clearInterval(fadeInterval);
          audio.pause();
        }
      }, 50);
    }

    setTimeout(() => {
      onComplete();
    }, 950);
  }, [onComplete, onShatterStart, playBladeSlashShatter]);

  const handleNextAct = useCallback(() => {
    const currentIndex = ACT_METADATA.findIndex((a) => a.id === act);
    if (currentIndex < ACT_METADATA.length - 1) {
      const nextAct = ACT_METADATA[currentIndex + 1].id;
      setAct(nextAct);
    } else {
      handleSkip();
    }
  }, [act, handleSkip]);

  const handleJumpAct = (targetAct: IntroAct) => {
    setAct(targetAct);
  };

  const handleStart = useCallback(
    (withSound = true) => {
      if (hasStarted) return;
      setHasStarted(true);
      setSoundEnabled(withSound);

      if (withSound) {
        const ctx = getAudioContext();
        if (ctx && ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
        if (bgmRef.current) {
          bgmRef.current.currentTime = 0;
          bgmRef.current.play().catch(() => {});
        }
      } else {
        if (bgmRef.current) {
          bgmRef.current.pause();
        }
      }
    },
    [hasStarted, getAudioContext]
  );

  // Keyboard navigation & user interaction trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasStarted) {
        handleStart(true);
        return;
      }
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        handleNextAct();
      } else if (e.key === 'm' || e.key === 'M') {
        setSoundEnabled((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted, handleStart, handleSkip, handleNextAct]);

  // ========================================================
  // ACT TIMELINE ORCHESTRATOR
  // ========================================================
  useEffect(() => {
    if (!hasStarted) return;

    const prevAct = prevActRef.current;
    prevActRef.current = act;

    if (actTimeoutRef.current) clearTimeout(actTimeoutRef.current);

    if (act === 'gate') {
      if (prevAct === 'system') {
        playGateCloseSound();
      }

      actTimeoutRef.current = setTimeout(() => {
        setAct('system');
      }, ACT_METADATA[0].duration);

      return () => {
        if (actTimeoutRef.current) clearTimeout(actTimeoutRef.current);
      };
    }

    if (act === 'system') {
      playGateOpenSound();
      playTone(880, 0.1, 'triangle', 0.12);

      // 1. Typewriter dialogue
      const fullText =
        'PLAYER IDENTIFIED: You have met all requirements to undergo the Techfest Awakening. Prepare for unsealing.';
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        charIndex++;
        setTypewriterText(fullText.slice(0, charIndex));
        if (charIndex % 3 === 0) {
          playTone(1200 + (charIndex % 8) * 80, 0.03, 'sine', 0.04);
        }
        if (charIndex >= fullText.length) {
          clearInterval(typeInterval);
        }
      }, 28);

      // 2. Rank & Mana Escalation Loop
      const rankStepTime = Math.floor((ACT_METADATA[1].duration - 400) / RANKS.length);
      let curRank = 0;
      const rankInterval = setInterval(() => {
        curRank++;
        if (curRank < RANKS.length) {
          setRankIndex(curRank);
          playRankUpChime(curRank);
        }
      }, rankStepTime);

      // 3. Level & Stats ramp
      const statInterval = setInterval(() => {
        setHunterLevel((prev) => Math.min(prev + 4, 150));
        setManaProgress((prev) => Math.min(prev + 3, 100));
        setTitleIndex((prev) => (prev < TITLES.length - 1 ? prev + 1 : prev));
      }, 80);

      actTimeoutRef.current = setTimeout(() => {
        clearInterval(typeInterval);
        clearInterval(rankInterval);
        clearInterval(statInterval);
        setAct('arise');
      }, ACT_METADATA[1].duration);

      return () => {
        clearInterval(typeInterval);
        clearInterval(rankInterval);
        clearInterval(statInterval);
        if (actTimeoutRef.current) clearTimeout(actTimeoutRef.current);
      };
    }

    if (act === 'arise') {
      playMonarchSubDrop();
      if (bgmRef.current && soundEnabled) {
        bgmRef.current.volume = 1.0;
      }

      actTimeoutRef.current = setTimeout(() => {
        setAct('shatter');
      }, ACT_METADATA[2].duration);

      return () => {
        if (actTimeoutRef.current) clearTimeout(actTimeoutRef.current);
      };
    }

    if (act === 'shatter') {
      onShatterStart?.();
      playBladeSlashShatter();
      if (bgmRef.current) {
        const audio = bgmRef.current;
        const fadeInterval = setInterval(() => {
          if (audio.volume > 0.1) {
            audio.volume = Math.max(0, audio.volume - 0.15);
          } else {
            clearInterval(fadeInterval);
            audio.pause();
          }
        }, 60);
      }

      actTimeoutRef.current = setTimeout(() => {
        onComplete();
      }, ACT_METADATA[3].duration);

      return () => {
        if (actTimeoutRef.current) clearTimeout(actTimeoutRef.current);
      };
    }
  }, [hasStarted, act, onComplete, onShatterStart, playRankUpChime, playMonarchSubDrop, playBladeSlashShatter, playGateOpenSound, playGateCloseSound, playTone, soundEnabled]);

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <motion.div
      key="anime-intro-viewport"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[99999] w-screen h-screen h-[100dvh] text-white overflow-hidden select-none bg-black"
    >
      {/* ======================================================== */}
      {/* BLANK BLACK STARTING SCREEN: TAP TO BEGIN                */}
      {/* ======================================================== */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            key="tap-to-begin-screen"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: 'blur(16px)',
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            }}
            onClick={() => handleStart(true)}
            className="fixed inset-0 z-[100000] bg-black flex items-center justify-center cursor-pointer select-none text-white px-6"
          >
            <motion.h1
              animate={{
                opacity: [0.4, 1, 0.4],
                textShadow: [
                  '0 0 15px rgba(255,255,255,0.2)',
                  '0 0 35px rgba(0,212,255,0.7), 0 0 60px rgba(168,85,247,0.3)',
                  '0 0 15px rgba(255,255,255,0.2)',
                ],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="font-orbitron font-bold text-2xl sm:text-4xl md:text-5xl tracking-[0.25em] uppercase text-white drop-shadow-[0_0_25px_rgba(0,212,255,0.6)] text-center pointer-events-none"
            >
              Tap to Begin
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* SMOOTH OPACITY DISSOLVE BACKGROUND FOR ACT 4 REVEAL     */}
      {/* ======================================================== */}
      <motion.div
        animate={{
          opacity: act === 'shatter' ? 0 : 1,
        }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-[#020005] pointer-events-none"
      />

      {/* ======================================================== */}
      {/* PERSISTENT CINEMATIC LAYER: SCANLINES & MANA PARTICLES   */}
      {/* ======================================================== */}
      <motion.div
        animate={{ opacity: act === 'shatter' ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-0 pointer-events-none z-10"
      >
        {/* CRT Scanline mesh */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.65) 50%)',
            backgroundSize: '100% 4px',
          }}
        />
        {/* Futuristic Coordinate Grid */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(rgba(0, 212, 255, 0.45) 1px, transparent 1px), radial-gradient(rgba(168, 85, 247, 0.35) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0, 18px 18px',
          }}
        />
        {/* Floating Mana Embers (Dynamic positions) */}
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none animate-mana-ember"
            style={{
              left: `${(i * 100) / 18 + ((i * 7) % 5)}%`,
              bottom: `${(i * 12) % 35}%`,
              width: `${(i % 3) * 2 + 3}px`,
              height: `${(i % 3) * 2 + 3}px`,
              backgroundColor: i % 2 === 0 ? '#00d4ff' : '#a855f7',
              boxShadow: i % 2 === 0 ? '0 0 10px #00d4ff' : '0 0 10px #a855f7',
              animationDelay: `${(i * 0.28).toFixed(1)}s`,
              animationDuration: `${2.2 + (i % 4) * 0.4}s`,
            }}
          />
        ))}
      </motion.div>

      {/* ======================================================== */}
      {/* TOP HEADER HUD: LIVE STATUS, BGM BADGE & CONTROLS        */}
      {/* ======================================================== */}
      <motion.header
        animate={{
          opacity: act === 'shatter' ? 0 : 1,
          y: act === 'shatter' ? -20 : 0,
        }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="absolute top-3 sm:top-5 inset-x-3 sm:inset-x-8 flex items-center justify-between z-50 pointer-events-auto"
      >
        {/* Left: System Status Tag + BGM Track Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-sm border border-cyan-400/50 bg-black/85 text-cyan-300 text-[10px] sm:text-xs font-orbitron font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,212,255,0.4)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>SYSTEM VER 2026</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-purple-500/40 bg-black/75 text-purple-200 text-[10px] font-system uppercase tracking-wider backdrop-blur-md">
            <Terminal className="w-3 h-3 text-purple-400" />
            <span>
              STATUS: {ACT_METADATA.find((a) => a.id === act)?.title || 'INITIALIZING'}
            </span>
          </div>

          {/* Solo Leveling BGM Live Visualizer Badge */}
          <div className="hidden lg:inline-flex items-center gap-2 px-2.5 py-1 rounded-sm border border-purple-500/40 bg-black/80 text-purple-200 text-[10px] font-orbitron uppercase tracking-wider backdrop-blur-md">
            <Music className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>BGM: SOLO LEVELING AURA // STORM OF SHADOWS</span>
            {soundEnabled && (
              <div className="flex items-end gap-0.5 h-3 ml-0.5">
                <span className="w-0.5 bg-cyan-400 animate-[bounce_0.6s_infinite_100ms] h-full" />
                <span className="w-0.5 bg-purple-400 animate-[bounce_0.6s_infinite_200ms] h-2/3" />
                <span className="w-0.5 bg-cyan-300 animate-[bounce_0.6s_infinite_300ms] h-4/5" />
                <span className="w-0.5 bg-rose-400 animate-[bounce_0.6s_infinite_150ms] h-1/2" />
              </div>
            )}
          </div>
        </div>

        {/* Right: Sound Toggle + Skip Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) {
                playTone(660, 0.1, 'sine', 0.1);
              }
            }}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md border text-xs font-orbitron transition-all cursor-pointer backdrop-blur-md ${
              soundEnabled
                ? 'border-cyan-400/80 bg-cyan-950/40 text-cyan-300 shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                : 'border-purple-500/40 bg-black/80 text-zinc-400 hover:text-white'
            }`}
            title={soundEnabled ? 'Switch to Mute' : 'Enable Sound'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline text-[10px] tracking-widest uppercase">SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden sm:inline text-[10px] tracking-widest uppercase">MUTED</span>
              </>
            )}
          </button>

          {/* Quick Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="group inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 rounded-md border border-cyan-400/80 bg-black/90 hover:bg-cyan-950/50 text-cyan-300 hover:text-white text-[10px] sm:text-xs font-orbitron font-bold tracking-[0.16em] uppercase transition-all shadow-[0_0_15px_rgba(0,212,255,0.4)] cursor-pointer backdrop-blur-md"
          >
            <span>SKIP [ESC]</span>
            <FastForward className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.header>

      {/* ======================================================== */}
      {/* MAIN CINEMATIC ACT STAGES CONTAINER                      */}
      {/* ======================================================== */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* ======================================================== */}
        {/* ACT 1 & 2: DUNGEON GATE & AWAKENING SYSTEM ENVIRONMENT   */}
        {/* ======================================================== */}
        <AnimatePresence>
          {(act === 'gate' || act === 'system') && (
            <motion.div
              key="act-gate-system-env"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 0.6 } }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 overflow-hidden flex items-center justify-center"
            >
              {/* 1. ADVANCED CYBERSPACE AWAKENING REALM BACKGROUND (NO IMAGES, PURE FRAMER MOTION + SVG) */}
              <SystemCyberBackground isActive={act === 'system'} />

              {/* 2. DUAL COLOSSAL STONE DOORS (3D PERSPECTIVE VAULT) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ perspective: '1400px' }}
              >
                {/* LEFT DOOR LEAF (Hinged at left border, swings inward while sliding left) */}
                <motion.div
                  initial={false}
                  animate={{
                    x: act === 'system' ? '-110%' : '0%',
                    rotateY: act === 'system' ? -25 : 0,
                    opacity: act === 'system' ? 0 : 1,
                  }}
                  transition={{
                    duration: 2.0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                  }}
                  className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden z-10 shadow-[8px_0_35px_rgba(0,0,0,0.95)] will-change-transform"
                >
                  <div className="relative w-screen h-full">
                    <img
                      src={doorImg}
                      alt="Solo Leveling Dungeon Gate - Left"
                      className="w-full h-full object-cover object-center filter contrast-125 brightness-80 saturate-110 select-none"
                    />
                    {/* Inner Seam Shadow and Edge Bevel */}
                    <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-black/95 via-black/50 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/85 pointer-events-none" />
                    <div className="absolute inset-0 bg-radial from-transparent via-red-950/15 to-black/70 pointer-events-none" />
                  </div>
                </motion.div>

                {/* RIGHT DOOR LEAF (Hinged at right border, swings inward while sliding right) */}
                <motion.div
                  initial={false}
                  animate={{
                    x: act === 'system' ? '110%' : '0%',
                    rotateY: act === 'system' ? 25 : 0,
                    opacity: act === 'system' ? 0 : 1,
                  }}
                  transition={{
                    duration: 2.0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    transformOrigin: 'right center',
                    transformStyle: 'preserve-3d',
                  }}
                  className="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden z-10 shadow-[-8px_0_35px_rgba(0,0,0,0.95)] will-change-transform"
                >
                  <div className="absolute top-0 right-0 w-screen h-full">
                    <img
                      src={doorImg}
                      alt="Solo Leveling Dungeon Gate - Right"
                      className="w-full h-full object-cover object-center filter contrast-125 brightness-80 saturate-110 select-none"
                    />
                    {/* Inner Seam Shadow and Edge Bevel */}
                    <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-black/95 via-black/50 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/85 pointer-events-none" />
                    <div className="absolute inset-0 bg-radial from-transparent via-red-950/15 to-black/70 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Center Seam Crack Line Light & Rune Glow (Visible when closed, flares as it opens) */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: act === 'gate' ? [0.4, 0.9, 0.4] : [1, 0],
                    scaleX: act === 'gate' ? 1 : [1, 15, 0],
                  }}
                  transition={{
                    opacity:
                      act === 'gate'
                        ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 1.2 },
                    scaleX: act === 'gate' ? { duration: 0.2 } : { duration: 1.2, ease: 'easeOut' },
                  }}
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00d4ff,0_0_30px_#a855f7] z-20 pointer-events-none"
                />
              </div>

              {/* 3. ACT 1 FOREGROUND CONTENT: RED GATE ALERT & HUD */}
              <AnimatePresence>
                {act === 'gate' && (
                  <motion.div
                    key="act-gate-hud"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', transition: { duration: 0.55 } }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    className="relative z-30 w-full h-full flex flex-col items-center justify-center px-4 overflow-hidden"
                  >
                    {/* Floating Kanji Background Watermarks */}
                    <div className="absolute inset-x-4 sm:inset-x-12 flex justify-between items-center pointer-events-none opacity-20">
                      <span className="font-shojumaru text-6xl sm:text-8xl md:text-9xl text-red-500">
                        門
                      </span>
                      <span className="font-shojumaru text-6xl sm:text-8xl md:text-9xl text-purple-500">
                        破
                      </span>
                    </div>

                    {/* Foreground Alert Terminal & Radar HUD */}
                    <div className="relative flex flex-col items-center text-center max-w-2xl animate-gate-tremor">
                      {/* Red Gate Siren Header */}
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border-2 border-red-500 bg-black/90 text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.7)] backdrop-blur-md"
                      >
                        <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
                        <span className="font-orbitron font-extrabold text-xs sm:text-sm tracking-[0.2em] uppercase">
                          EMERGENCY : RED GATE DETECTED
                        </span>
                      </motion.div>

                      {/* High Stakes Dungeon Title */}
                      <motion.h2
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.45 }}
                        className="mt-4 font-solo text-3xl sm:text-5xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-200 to-cyan-300 drop-shadow-[0_0_35px_rgba(239,68,68,0.8)]"
                      >
                        DUNGEON SEALS SHATTERING
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="mt-2 text-xs sm:text-sm md:text-base font-system text-purple-200 tracking-widest max-w-lg leading-relaxed"
                      >
                        A Class-S dimensional anomaly has opened above the festival grounds. High-density mana
                        surging through all sectors.
                      </motion.p>

                      {/* Radar Coordinate Bar */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="mt-5 w-full max-w-md p-3 rounded-lg border border-red-500/40 bg-black/80 backdrop-blur-md flex items-center justify-between text-[10px] sm:text-xs font-orbitron"
                      >
                        <div className="flex items-center gap-2 text-red-300">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                          <span>ANOMALY COORD: 37.56°N 126.97°E</span>
                        </div>
                        <span className="text-cyan-400 font-bold">MANA: 99,400 MHz</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 4. ACT 2 FOREGROUND CONTENT: HOLOGRAPHIC SYSTEM MODAL */}
              <AnimatePresence>
                {act === 'system' && (
                  <motion.div
                    key="act-system-modal"
                    initial={{ opacity: 0, scale: 0.84, y: 25, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 0.45 } }}
                    transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-30 w-[94vw] max-w-2xl p-5 sm:p-7 rounded-2xl border-2 border-cyan-400/90 bg-[#040814]/95 shadow-[0_0_50px_rgba(0,212,255,0.4),inset_0_0_35px_rgba(0,212,255,0.15)] backdrop-blur-2xl flex flex-col justify-between"
                  >
                    {/* Tech Corner Brackets */}
                    <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 border-cyan-300" />
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 border-cyan-300" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 border-cyan-300" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 border-cyan-300" />

                    {/* Modal Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-cyan-500/40">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                        <span className="font-orbitron text-xs sm:text-sm font-bold tracking-[0.18em] text-cyan-300 uppercase">
                          [ SYSTEM NOTIFICATION // DAILY QUEST ]
                        </span>
                      </div>
                      <span className="font-orbitron text-[10px] sm:text-xs font-black text-amber-300 px-2.5 py-0.5 rounded bg-black/80 border border-amber-400/60 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                        UNREGISTERED HUNTER
                      </span>
                    </div>

                    {/* Typewriter Terminal Dialogue */}
                    <div className="py-3">
                      <div className="p-3 rounded-lg bg-black/60 border border-cyan-500/30 text-xs sm:text-sm font-system text-cyan-100 min-h-[52px] leading-relaxed">
                        <span>{typewriterText}</span>
                        <span className="inline-block w-2 h-3.5 ml-1 bg-cyan-400 animate-pulse align-middle" />
                      </div>
                    </div>

                    {/* Hunter Rank & Evolution Bar */}
                    <div className="p-3 sm:p-4 rounded-xl bg-black/80 border border-purple-500/50 shadow-inner space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
                          <span className="font-orbitron text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">
                            HUNTER EVALUATION:
                          </span>
                        </div>
                        <motion.span
                          key={rankIndex}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.1, opacity: 1 }}
                          style={{ color: RANKS[rankIndex].color }}
                          className="font-orbitron font-black text-base sm:text-xl drop-shadow-[0_0_12px_currentColor]"
                        >
                          {RANKS[rankIndex].name}
                        </motion.span>
                      </div>

                      {/* Hunter Progression Meter (E to Monarch) */}
                      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-1">
                        {RANKS.map((r, idx) => (
                          <div
                            key={r.name}
                            className={`py-1 rounded text-center text-[9px] sm:text-[10px] font-orbitron font-bold transition-all duration-300 ${
                              idx <= rankIndex
                                ? 'bg-cyan-500/20 text-white border border-cyan-400 shadow-[0_0_8px_rgba(0,212,255,0.4)]'
                                : 'bg-zinc-900/60 text-zinc-600 border border-zinc-800'
                            }`}
                          >
                            {r.name.split('-')[0].replace('👑 ', '')}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Player Stats HUD Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 py-3 text-[11px] font-orbitron">
                      {/* Level */}
                      <div className="p-2.5 rounded-lg bg-black/70 border border-cyan-500/40 flex flex-col">
                        <span className="text-[9px] text-zinc-400">LEVEL</span>
                        <span className="text-base sm:text-lg font-black text-cyan-300">
                          LV. {hunterLevel}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="p-2.5 rounded-lg bg-black/70 border border-purple-500/40 flex flex-col">
                        <span className="text-[9px] text-zinc-400">TITLE</span>
                        <span className="text-xs sm:text-sm font-bold text-purple-300 truncate">
                          {TITLES[titleIndex]}
                        </span>
                      </div>

                      {/* HP Bar */}
                      <div className="p-2.5 rounded-lg bg-black/70 border border-rose-500/40 flex flex-col justify-between">
                        <div className="flex justify-between text-[9px] text-rose-300">
                          <span>HP</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden mt-1">
                          <div className="h-full bg-gradient-to-r from-rose-500 to-red-400 rounded-full w-full shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                        </div>
                      </div>

                      {/* MP Bar */}
                      <div className="p-2.5 rounded-lg bg-black/70 border border-cyan-500/40 flex flex-col justify-between">
                        <div className="flex justify-between text-[9px] text-cyan-300">
                          <span>MP</span>
                          <span>OVERFLOW</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden mt-1">
                          <motion.div
                            style={{ width: `${manaProgress}%` }}
                            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-300 rounded-full shadow-[0_0_10px_rgba(0,212,255,0.8)]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Modal Bottom CTA */}
                    <div className="pt-2 flex items-center justify-between border-t border-cyan-500/30 text-[10px] font-orbitron">
                      <span className="text-purple-300/80 tracking-wider">
                        SYNCHRONIZING WITH TECHFEST SERVERS...
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextAct();
                        }}
                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-white font-bold cursor-pointer"
                      >
                        <span>COMMENCE AWAKENING</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* ACT 3: SHADOW MONARCH ARISE & TECHFEST 2026 CLIMAX       */}
        {/* ======================================================== */}
        {act === 'arise' && (
          <motion.div
            key="act-arise"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.08, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 flex flex-col items-center justify-center w-full h-full px-4 text-center select-none overflow-hidden"
          >
            {/* Speed Lines Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                className="w-full h-full text-cyan-400/20"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
              >
                {Array.from({ length: 64 }).map((_, i) => {
                  const angle = (i * 360) / 64;
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 500 + Math.cos(rad) * 100;
                  const y1 = 500 + Math.sin(rad) * 100;
                  const x2 = 500 + Math.cos(rad) * 750;
                  const y2 = 500 + Math.sin(rad) * 750;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeWidth={i % 4 === 0 ? '4' : '1.5'}
                      strokeOpacity={0.3 + (i % 5) * 0.15}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Massive Japanese Kanji Calligraphy Stamps */}
            <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-16 pointer-events-none opacity-20">
              <span className="font-shojumaru text-7xl sm:text-9xl text-purple-400">
                影王
              </span>
              <span className="font-shojumaru text-7xl sm:text-9xl text-cyan-400">
                覚醒
              </span>
            </div>

            {/* Central Kanji Impact Reveal */}
            <motion.div
              initial={{ scale: 2.5, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="font-shojumaru text-6xl sm:text-8xl md:text-[130px] text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-purple-500 leading-none drop-shadow-[0_0_40px_rgba(0,212,255,0.9)] pointer-events-none"
            >
              領域展開
            </motion.div>

            {/* Sung Jin-Woo Cinematic Eye Banner with Electric Eye Trail */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl h-28 sm:h-40 md:h-48 my-3 sm:my-5 rounded-2xl overflow-hidden border-y-2 border-cyan-400/90 bg-black/90 shadow-[0_0_45px_rgba(0,212,255,0.7)] flex items-center justify-center"
            >
              <img
                src={jinwooImg}
                alt="Sung Jin-Woo Monarch Eyes"
                className="w-full h-full object-cover object-[50%_18%] filter contrast-125 saturate-125"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-black/95" />

              {/* Glowing Electric Eye Flare Pulse */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '100%', opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-48 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 blur-md transform skew-x-12"
                />
              </div>

              {/* Overlay Slogan */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <motion.span
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.35 }}
                  className="font-slash text-4xl sm:text-6xl md:text-7xl text-white tracking-[0.2em] drop-shadow-[0_0_25px_rgba(0,212,255,1)] uppercase"
                >
                  ARISE.
                </motion.span>
                <span className="font-system text-xs sm:text-sm text-cyan-200 tracking-[0.3em] uppercase font-bold mt-1">
                  "I ALONE LEVEL UP"
                </span>
              </div>
            </motion.div>

            {/* Grand Festival Title Slam */}
            <motion.h1
              initial={{ scale: 0.75, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="font-solo text-3xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]"
            >
              TECHFEST{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-white drop-shadow-[0_0_30px_rgba(0,212,255,0.85)]">
                2026
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="mt-2 text-xs sm:text-sm font-orbitron text-purple-200 tracking-[0.2em] uppercase"
            >
              WHERE ANIME MEETS NEXT-GEN DIGITAL REALITY
            </motion.p>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* ACT 4: DIMENSIONAL KATANA SLASH & REALISTIC 3D SHATTER   */}
        {/* ======================================================== */}
        {act === 'shatter' && (
          <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden flex items-center justify-center animate-shatter-tremor">
            {/* 1. Deep Cosmic Nebula Background - smooth fade out revealing landing page */}
            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-radial from-cyan-950/40 via-purple-950/30 to-[#020006]"
            />

            {/* 2. Supersonic Kinetic Shockwave Rings */}
            <motion.div
              initial={{ scale: 0.05, opacity: 1 }}
              animate={{ scale: [0.05, 1.6, 3.4], opacity: [1, 0.85, 0] }}
              transition={{ duration: 0.52, ease: [0.1, 0.85, 0.25, 1] }}
              className="absolute w-72 h-72 rounded-full border-2 border-cyan-300 pointer-events-none shadow-[0_0_35px_#00d4ff,inset_0_0_20px_#ffffff]"
              style={{ willChange: 'transform, opacity' }}
            />
            <motion.div
              initial={{ scale: 0.1, opacity: 0.9 }}
              animate={{ scale: [0.1, 2.6], opacity: [0.9, 0] }}
              transition={{ delay: 0.04, duration: 0.62, ease: 'easeOut' }}
              className="absolute w-64 h-64 rounded-full border border-purple-400/80 pointer-events-none shadow-[0_0_45px_#c084fc]"
              style={{ willChange: 'transform, opacity' }}
            />

            {/* 3. Sonic Katana Cross-Slash Beams (X-Cut) */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 2.2, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ willChange: 'transform, opacity' }}
            >
              <div
                className="w-[200vw] h-[12px] sm:h-[16px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_40px_#00d4ff,0_0_80px_#38bdf8]"
                style={{ transform: 'rotate(-34deg)' }}
              />
            </motion.div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 2.2, opacity: [0, 1, 1, 0] }}
              transition={{ delay: 0.04, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ willChange: 'transform, opacity' }}
            >
              <div
                className="w-[200vw] h-[12px] sm:h-[16px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_40px_#c084fc,0_0_80px_#a855f7]"
                style={{ transform: 'rotate(34deg)' }}
              />
            </motion.div>

            {/* 4. Instant Impact Searing Hit-Stop Flash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0] }}
              transition={{ duration: 0.14, ease: 'easeOut' }}
              className="absolute inset-0 bg-white"
              style={{ willChange: 'opacity' }}
            />

            {/* 5. Realistic Spiderweb Fracture Lines & Shock Faults */}
            <motion.svg
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: [1, 1, 0], scale: [1, 1.05, 1.1] }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              style={{ willChange: 'transform, opacity' }}
            >
              <defs>
                <filter id="fracture-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00d4ff" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Primary Major Fracture Arteries */}
              <path
                d="M500,500 L420,360 L380,300 L240,180 L140,210 L0,120 M500,500 L580,360 L650,300 L760,180 L880,190 L1000,90 M500,500 L620,480 L740,460 L870,440 L1000,430 M500,500 L600,580 L720,660 L830,760 L920,860 L1000,960 M500,500 L520,640 L480,760 L500,890 L460,1000 M500,500 L400,600 L280,680 L180,780 L80,850 L0,920 M500,500 L380,500 L240,510 L120,490 L0,510 M500,500 L500,380 L480,240 L510,120 L490,0"
                stroke="rgba(255, 255, 255, 0.98)"
                strokeWidth="2.8"
                fill="none"
                filter="url(#fracture-glow)"
              />

              {/* Secondary Stress Branch Fissures */}
              <path
                d="M420,360 L480,310 M580,360 L520,310 M380,300 L320,360 M650,300 L700,360 M620,480 L670,540 M600,580 L560,660 M520,640 L590,700 M400,600 L450,680 M280,680 L340,730 M380,500 L340,440 M240,180 L290,120 M760,180 L710,110 M830,760 L880,710 M180,780 L130,720"
                stroke="rgba(0, 240, 255, 0.88)"
                strokeWidth="1.8"
                fill="none"
              />

              {/* Concentric Stress Fracture Web Rings */}
              <path
                d="M450,450 L550,450 L550,550 L450,550 Z M380,380 L620,380 L620,620 L380,620 Z M280,280 L720,280 L720,720 L280,720 Z M160,160 L840,160 L840,840 L160,840 Z"
                stroke="rgba(192, 132, 252, 0.65)"
                strokeWidth="1.4"
                strokeDasharray="4 6"
                fill="none"
              />

              {/* Searing Epicenter Fracture Core */}
              <circle cx="500" cy="500" r="18" fill="#ffffff" filter="url(#fracture-glow)" />
              <circle cx="500" cy="500" r="6" fill="#00d4ff" />
            </motion.svg>

            {/* 6. 18 Interlocking 3D Tempered Glass Shards (True Perspective 3D Tumbling) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
            >
              {SHATTER_SHARDS.map((shard, idx) => (
                <motion.div
                  key={`shard-${idx}`}
                  initial={{
                    x: 0,
                    y: 0,
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 1,
                    opacity: 1,
                  }}
                  animate={{
                    x: shard.tx,
                    y: shard.ty,
                    z: shard.tz,
                    rotateX: shard.rx,
                    rotateY: shard.ry,
                    rotateZ: shard.rz,
                    scale: shard.s,
                    opacity: [1, 1, 0.8, 0],
                  }}
                  transition={{
                    duration: 0.95,
                    delay: shard.delay,
                    ease: [0.12, 0.9, 0.25, 1],
                  }}
                  className="absolute inset-0"
                  style={{
                    clipPath: shard.clip,
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Photorealistic Tempered Glass Facet */}
                  <div
                    className="w-full h-full border border-white/85"
                    style={{
                      background: SHARD_GRADIENTS[shard.gradientType],
                      boxShadow:
                        'inset 0 0 16px rgba(255, 255, 255, 0.4), inset 0 0 2px rgba(255, 255, 255, 0.9), 0 8px 32px rgba(0, 0, 0, 0.5)',
                      borderTopColor: 'rgba(0, 240, 255, 0.85)',
                      borderBottomColor: 'rgba(216, 180, 254, 0.75)',
                    }}
                  >
                    {/* Glass Bevel Specular Sheen */}
                    <div className="w-full h-full opacity-50 bg-gradient-to-tr from-transparent via-white/80 to-transparent transform -skew-x-12 pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 7. 16 Ultra-Fast Needle Glass Splinters */}
            <div className="absolute inset-0 pointer-events-none">
              {NEEDLE_SHARDS.map((sliver, idx) => (
                <motion.div
                  key={`needle-${idx}`}
                  initial={{
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 0.8,
                    opacity: 1,
                  }}
                  animate={{
                    x: sliver.tx,
                    y: sliver.ty,
                    rotate: sliver.r,
                    scale: [0.8, 1.2, 0.2],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 0.75,
                    delay: sliver.delay,
                    ease: [0.1, 0.9, 0.2, 1],
                  }}
                  className="absolute border border-white/90"
                  style={{
                    left: sliver.left,
                    top: sliver.top,
                    width: `${sliver.width}px`,
                    height: `${sliver.height}px`,
                    clipPath: sliver.clip,
                    background:
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(0, 212, 255, 0.3) 100%)',
                    boxShadow: '0 0 10px rgba(0, 212, 255, 0.8), inset 0 0 4px #ffffff',
                    willChange: 'transform, opacity',
                  }}
                />
              ))}
            </div>

            {/* 8. 24 Shimmering Diamond Dust & Glass Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={`dust-${i}`}
                  initial={{
                    x: '50vw',
                    y: '50vh',
                    scale: 0.4,
                    opacity: 1,
                  }}
                  animate={{
                    x: `${50 + Math.cos((i * Math.PI) / 12) * (20 + (i % 5) * 8)}vw`,
                    y: `${50 + Math.sin((i * Math.PI) / 12) * (20 + (i % 5) * 8)}vh`,
                    scale: [0.4, 1.4, 0],
                    opacity: [1, 0.95, 0],
                    rotate: i % 2 === 0 ? 360 : -360,
                  }}
                  transition={{
                    duration: 0.72,
                    delay: 0.01 + (i % 6) * 0.02,
                    ease: 'easeOut',
                  }}
                  className="absolute rotate-45"
                  style={{
                    width: i % 3 === 0 ? '6px' : '3.5px',
                    height: i % 3 === 0 ? '6px' : '3.5px',
                    backgroundColor: i % 2 === 0 ? '#ffffff' : '#00d4ff',
                    boxShadow:
                      i % 2 === 0
                        ? '0 0 10px #ffffff, 0 0 20px #38bdf8'
                        : '0 0 12px #c084fc',
                    willChange: 'transform, opacity',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* BOTTOM FOOTER HUD: INTERACTIVE TIMELINE & NAVIGATION      */}
      {/* ======================================================== */}
      <motion.footer
        animate={{
          opacity: act === 'shatter' ? 0 : 1,
          y: act === 'shatter' ? 20 : 0,
        }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="absolute bottom-3 sm:bottom-6 inset-x-3 sm:inset-x-8 z-50 pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-2.5"
      >
        {/* Left: Interactive Act Switcher Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-black/85 p-1 rounded-lg border border-cyan-500/40 backdrop-blur-md">
          {ACT_METADATA.map((item) => {
            const isActive = act === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleJumpAct(item.id);
                }}
                className={`px-2 sm:px-3 py-1 rounded text-[9px] sm:text-[11px] font-orbitron font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.5)]'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Center: Instruction Prompt */}
        <div className="text-center text-[9px] sm:text-[11px] font-orbitron tracking-[0.2em] text-zinc-500 uppercase">
          [ PRESS SPACE / CLICK TO ADVANCE ❯ ]
        </div>

        {/* Right: Next Act Fast Forward Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNextAct();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-950/40 hover:bg-purple-900/60 border border-purple-400/50 text-purple-200 hover:text-white text-[10px] sm:text-xs font-orbitron tracking-wider uppercase transition-all cursor-pointer backdrop-blur-md shadow-[0_0_10px_rgba(168,85,247,0.3)]"
        >
          <span>NEXT ACT</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </motion.footer>
    </motion.div>
  );
};

export default AnimeIntro;
