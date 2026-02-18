'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Rocket,
  Cpu,
  Smartphone,
  Terminal,
  Gem,
  Globe,
  Gauge,
  Shield,
  Brain,
  Bot,
  Users,
  Zap,
  Link2,
  CircleDollarSign,
} from 'lucide-react';
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- ANIMATED TERMINAL ---
const MiniTerminal: React.FC = () => {
  const lines = [
    { text: '$ nftpulse deploy --evm', color: 'text-green-400' },
    { text: 'Connecting EVM chains...', color: 'text-gray-500' },
    { text: 'ETH: online', color: 'text-green-400' },
    { text: 'Base: online', color: 'text-green-400' },
    { text: 'Arbitrum: online', color: 'text-green-400' },
    { text: 'All systems: OPERATIONAL', color: 'text-green-300 font-bold' },
  ];
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= lines.length) return;
    const t = setTimeout(() => setVisible(v => v + 1), 500);
    return () => clearTimeout(t);
  }, [visible, lines.length]);

  return (
    <div className="bg-black/80 rounded-lg border border-green-500/20 p-3 font-mono text-[10px] leading-relaxed h-full overflow-hidden">
      {lines.slice(0, visible).map((l, i) => (
        <div key={i} className={`${l.color}`}>{l.text}</div>
      ))}
      {visible < lines.length && (
        <span className="inline-block w-1.5 h-3 bg-green-400 animate-pulse" />
      )}
    </div>
  );
};

// --- CHAIN BADGE ---
const ChainBadge = ({ name, live }: { name: string; live: boolean }) => (
  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
    live
      ? 'bg-green-500/10 text-green-400 border-green-500/30'
      : 'bg-white/5 text-gray-500 border-white/10'
  }`}>
    <div className={`w-1.5 h-1.5 rounded-full ${live ? 'bg-green-400' : 'bg-gray-600'}`} />
    {name}
  </div>
);

// --- FLOATING PARTICLES ---
const Particles: React.FC<{ color: string }> = ({ color }) => {
  const particles = useRef(
    Array.from({ length: 5 }).map(() => ({
      w: 2 + Math.random() * 3,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
      delay: Math.random() * 3,
      dur: 3 + Math.random() * 4,
    }))
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full particle-float"
          style={{
            width: `${p.w}px`,
            height: `${p.w}px`,
            background: color,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
};

// --- PHASE CARD ---
interface PhaseData {
  phase: string;
  title: string;
  date: string;
  status: 'live' | 'next' | 'future';
  items: string[];
  icons: React.ComponentType<{ size?: number; className?: string }>[];
  accent: string;
  illustration: React.ReactNode;
}

const PhaseCard: React.FC<{ data: PhaseData; index: number }> = ({ data, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const statusStyles = {
    live: {
      dot: 'bg-green-400 shadow-[0_0_14px_rgba(0,255,65,0.8)]',
      badge: 'bg-green-500/20 text-green-400 border-green-500/40',
      border: 'border-green-500/30 hover:border-green-500/50',
      bullet: 'bg-green-400',
      icon: 'text-green-400',
      label: 'LIVE',
    },
    next: {
      dot: 'bg-cyan-400 shadow-[0_0_14px_rgba(0,200,220,0.6)]',
      badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      bullet: 'bg-cyan-400',
      icon: 'text-cyan-400',
      label: 'NEXT',
    },
    future: {
      dot: 'bg-gray-600',
      badge: 'bg-white/5 text-gray-500 border-white/10',
      border: 'border-white/8 hover:border-white/15',
      bullet: 'bg-gray-600',
      icon: 'text-gray-500',
      label: 'UPCOMING',
    },
  };
  const s = statusStyles[data.status];

  return (
    <div
      ref={ref}
      className={`flex-shrink-0 w-[320px] md:w-[350px] snap-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className={`relative h-full rounded-2xl border bg-[#060d06]/80 backdrop-blur-xl p-6 transition-all duration-500 hover:scale-[1.02] group ${s.border}`}>
        <Particles color={data.accent} />

        {/* Status + Phase */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`relative w-3 h-3 rounded-full ${s.dot}`}>
              {data.status === 'live' && (
                <div className="absolute inset-0 rounded-full bg-green-400/40 animate-ping" />
              )}
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${s.badge}`}>
              Phase {data.phase} — {s.label}
            </span>
          </div>
          <span className="text-[11px] font-mono text-gray-600">{data.date}</span>
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-2xl font-bold text-white mb-4">{data.title}</h3>

        {/* Illustration */}
        <div className="relative z-10 mb-5 h-28">
          {data.illustration}
        </div>

        {/* Items */}
        <ul className="relative z-10 space-y-2.5 mb-5">
          {data.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-gray-400">
              <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${s.bullet}`} />
              {item}
            </li>
          ))}
        </ul>

        {/* Icon row */}
        <div className="relative z-10 flex items-center gap-2 pt-4 border-t border-white/5">
          {data.icons.map((Icon, i) => (
            <div key={i} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/8 transition-colors">
              <Icon size={14} className={s.icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- PAGE ---
const RoadmapPage: React.FC = () => {
  const phases: PhaseData[] = [
    {
      phase: '01',
      title: 'Initial Deployment',
      date: 'Just Now',
      status: 'live',
      accent: 'rgba(0,255,65,0.4)',
      icons: [Terminal, Rocket, Shield, Globe],
      items: [
        'NFTPulse platform live on all EVM chains',
        'Discord server & community onboarding active',
        'Beta role distribution (Operators / Testers)',
        'Core app live: Dashboard, Toolbox, Mint engine',
      ],
      illustration: <MiniTerminal />,
    },
    {
      phase: '02',
      title: 'V1 & Solana Expansion',
      date: '+1–2 months',
      status: 'next',
      accent: 'rgba(0,200,220,0.4)',
      icons: [Cpu, Gem, Link2, Zap],
      items: [
        'Full V1 release with all modules polished',
        'Solana chain support (mint, toolbox, dashboard)',
        'Genesis access NFT collection launch',
        'Surprise feature drop for early holders',
      ],
      illustration: (
        <div className="bg-black/60 rounded-lg border border-cyan-500/20 p-4 h-full flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Gem size={28} className="text-cyan-400" />
                <div className="absolute -inset-2 bg-cyan-400/20 rounded-full blur-md animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">GENESIS NFT</div>
                <div className="text-[10px] text-cyan-400 font-mono">Lifetime access</div>
              </div>
            </div>
            <div className="h-px w-6 bg-cyan-500/30" />
            <div className="flex flex-col gap-1.5">
              <ChainBadge name="EVM" live={true} />
              <ChainBadge name="SOL" live={false} />
            </div>
          </div>
        </div>
      ),
    },
    {
      phase: '03',
      title: 'Mobile & Infrastructure',
      date: '+3–4 months',
      status: 'future',
      accent: 'rgba(100,100,100,0.3)',
      icons: [Smartphone, Gauge, Globe],
      items: [
        'Mobile app for iOS & Android (monitoring & dashboards)',
        'Access model fully tied to Genesis NFT',
        'Global infrastructure upgrade for lower latency',
        'Advanced analytics & portfolio tracking',
      ],
      illustration: (
        <div className="bg-black/40 rounded-lg border border-white/8 p-4 h-full flex items-center justify-center relative overflow-hidden">
          <div className="flex items-center gap-6">
            <div className="w-14 h-24 rounded-xl border-2 border-gray-700 bg-black/80 flex items-center justify-center relative">
              <div className="absolute top-1 w-4 h-0.5 rounded-full bg-gray-700" />
              <Smartphone size={18} className="text-gray-600" />
              <div className="absolute bottom-1.5 w-2.5 h-2.5 rounded-full border border-gray-700" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <div className="w-16 h-1.5 rounded-full bg-gray-800 shimmer" />
                <div className="w-8 h-1.5 rounded-full bg-gray-800" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-10 h-1.5 rounded-full bg-gray-800" />
                <div className="w-14 h-1.5 rounded-full bg-gray-800 shimmer" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-12 h-1.5 rounded-full bg-gray-800 shimmer" />
                <div className="w-6 h-1.5 rounded-full bg-gray-800" />
              </div>
              <div className="text-[9px] text-gray-600 font-mono mt-1">Mobile preview</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      phase: '04',
      title: 'AI & Social Layer',
      date: 'Future',
      status: 'future',
      accent: 'rgba(120,80,200,0.3)',
      icons: [Brain, Bot, Users, CircleDollarSign],
      items: [
        'AI-powered mint scoring & collection analysis',
        'Smart alerts: AI detects high-potential drops before hype',
        'Social features: leaderboards, copy-minting, shared strategies',
        'Revenue sharing for Genesis NFT holders',
      ],
      illustration: (
        <div className="bg-black/40 rounded-lg border border-purple-500/10 p-4 h-full flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-green-500/5" />
          <div className="relative flex flex-col items-center gap-2">
            <div className="relative">
              <Brain size={36} className="text-purple-400/70" />
              <div className="absolute -inset-3 bg-purple-500/10 rounded-full blur-lg animate-pulse" />
            </div>
            <div className="flex items-center gap-3 mt-1">
              <div className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/15 text-[9px] text-purple-400/70 font-mono">AI SCORING</div>
              <div className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/15 text-[9px] text-purple-400/70 font-mono">SOCIAL</div>
              <div className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/15 text-[9px] text-purple-400/70 font-mono">REVENUE</div>
            </div>
            <div className="text-[9px] text-gray-600 font-mono">Conceptual — subject to change</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#020a02] text-white font-sans selection:bg-green-500/30 overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-green-600/8 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/6 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a1f0a_1px,transparent_1px),linear-gradient(to_bottom,#0a1f0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <Navbar activePage="Roadmap" />

      {/* Content */}
      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-950/50 border border-green-500/30 text-green-400 text-xs font-medium uppercase tracking-widest mb-6">
            <Rocket size={12} />
            Roadmap
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5">
            The Path to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-emerald-300">
              Dominance
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From deployment to full infrastructure. Every phase builds on the last.
          </p>
        </div>

        {/* Phase Cards - Carousel */}
        <Carousel>
          {phases.map((phase, i) => (
            <PhaseCard key={i} data={phase} index={i} />
          ))}
        </Carousel>
      </div>

      <Footer />
    </div>
  );
};

export default RoadmapPage;
