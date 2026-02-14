'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  Rocket,
  Cpu,
  Smartphone,
  Terminal,
  Gem,
  Globe,
  Gauge,
  Shield,
} from 'lucide-react';

const Link = ({
  href,
  children,
  className,
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}) => (
  <a href={href} className={className} target={target} rel={rel}>
    {children}
  </a>
);

// --- ANIMATED TERMINAL MINI ---
const MiniTerminal: React.FC = () => {
  const lines = [
    { text: '$ nftpulse init', color: 'text-green-400' },
    { text: 'Loading modules...', color: 'text-gray-500' },
    { text: 'Discord: connected', color: 'text-green-400' },
    { text: 'Beta roles: distributing', color: 'text-cyan-400' },
    { text: 'System: ONLINE', color: 'text-green-300 font-bold' },
  ];
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= lines.length) return;
    const t = setTimeout(() => setVisible(v => v + 1), 600);
    return () => clearTimeout(t);
  }, [visible, lines.length]);

  return (
    <div className="bg-black/80 rounded-lg border border-green-500/20 p-3 font-mono text-[10px] leading-relaxed h-28 overflow-hidden">
      {lines.slice(0, visible).map((l, i) => (
        <div key={i} className={`${l.color} transition-opacity duration-300`}>{l.text}</div>
      ))}
      {visible < lines.length && (
        <span className="inline-block w-1.5 h-3 bg-green-400 animate-pulse" />
      )}
    </div>
  );
};

// --- FLOATING PARTICLES ---
const Particles: React.FC<{ color: string }> = ({ color }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full particle-float"
        style={{
          width: `${2 + Math.random() * 3}px`,
          height: `${2 + Math.random() * 3}px`,
          background: color,
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 4}s`,
          opacity: 0.6,
        }}
      />
    ))}
  </div>
);

// --- PHASE CARD ---
interface PhaseData {
  phase: string;
  title: string;
  date: string;
  status: 'live' | 'next' | 'future';
  items: string[];
  icons: React.ComponentType<{ size?: number; className?: string }>[];
  accent: string;
  glowRgb: string;
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const statusColors = {
    live: { dot: 'bg-green-400 shadow-[0_0_12px_rgba(0,255,65,0.8)]', badge: 'bg-green-500/20 text-green-400 border-green-500/40', line: 'bg-green-500' },
    next: { dot: 'bg-cyan-400 shadow-[0_0_12px_rgba(0,200,220,0.6)]', badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40', line: 'bg-cyan-500/40' },
    future: { dot: 'bg-gray-600', badge: 'bg-white/5 text-gray-500 border-white/10', line: 'bg-white/10' },
  };
  const s = statusColors[data.status];

  return (
    <div
      ref={ref}
      className={`flex-shrink-0 w-[340px] md:w-[380px] flex flex-col items-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Node */}
      <div className="relative mb-6 flex flex-col items-center">
        <div className={`w-5 h-5 rounded-full ${s.dot} z-10 transition-all duration-500`}>
          {data.status === 'live' && (
            <div className="absolute inset-0 rounded-full bg-green-400/40 animate-ping" />
          )}
        </div>
      </div>

      {/* Card */}
      <div className={`relative w-full rounded-2xl border bg-[#060d06]/80 backdrop-blur-xl p-6 transition-all duration-500 hover:scale-[1.02] group
        ${data.status === 'live' ? 'border-green-500/30 hover:border-green-500/50' :
          data.status === 'next' ? 'border-cyan-500/20 hover:border-cyan-500/40' :
          'border-white/8 hover:border-white/15'}`}
      >
        <Particles color={data.accent} />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${s.badge}`}>
            Phase {data.phase}
          </span>
          <span className="text-[11px] font-mono text-gray-600">{data.date}</span>
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-xl font-bold text-white mb-2">{data.title}</h3>

        {/* Illustration */}
        <div className="relative z-10 mb-4">
          {data.illustration}
        </div>

        {/* Items */}
        <ul className="relative z-10 space-y-2">
          {data.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-gray-400">
              <div className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${data.status === 'live' ? 'bg-green-400' : data.status === 'next' ? 'bg-cyan-400' : 'bg-gray-600'}`} />
              {item}
            </li>
          ))}
        </ul>

        {/* Icon row */}
        <div className="relative z-10 flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
          {data.icons.map((Icon, i) => (
            <div key={i} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/8 transition-colors">
              <Icon size={14} className={data.status === 'live' ? 'text-green-400' : data.status === 'next' ? 'text-cyan-400' : 'text-gray-600'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- PAGE ---
const RoadmapPage: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const phases: PhaseData[] = [
    {
      phase: '01',
      title: 'Initial Deployment',
      date: 'Just Now',
      status: 'live',
      accent: 'rgba(0,255,65,0.4)',
      glowRgb: '0,255,65',
      icons: [Terminal, Rocket, Shield],
      items: [
        'NFTPulse landing & branding live',
        'Discord server & community onboarding',
        'Beta role distribution (Operators / Testers)',
        'Core bot & app development (monitoring + mint engine)',
      ],
      illustration: <MiniTerminal />,
    },
    {
      phase: '02',
      title: 'Bot V1 & Genesis NFT',
      date: '+1–2 months',
      status: 'next',
      accent: 'rgba(0,200,220,0.4)',
      glowRgb: '0,200,220',
      icons: [Cpu, Gem, Globe],
      items: [
        'Release of NFTPulse Bot V1 for early testers',
        'Launch of Genesis access NFT collection',
        'Surprise feature drop for early holders',
        'Support for more EVM chains (Base, Arbitrum, +1)',
      ],
      illustration: (
        <div className="bg-black/60 rounded-lg border border-cyan-500/20 p-4 h-28 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5 animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="relative">
              <Gem size={36} className="text-cyan-400" />
              <div className="absolute -inset-2 bg-cyan-400/20 rounded-full blur-md animate-pulse" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">GENESIS NFT</div>
              <div className="text-[10px] text-cyan-400 font-mono">Lifetime access pass</div>
              <div className="text-[10px] text-gray-600 font-mono mt-1">Mint: Coming Soon</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      phase: '03',
      title: 'Mobile & Infrastructure',
      date: '+2 months after V1',
      status: 'future',
      accent: 'rgba(100,100,100,0.3)',
      glowRgb: '100,100,100',
      icons: [Smartphone, Gauge, Globe],
      items: [
        'First mobile app (monitoring & dashboards)',
        'New access model tied to Genesis NFT',
        'Global infrastructure upgrade for latency & stability',
        'Expanded chain support & advanced features',
      ],
      illustration: (
        <div className="bg-black/40 rounded-lg border border-white/8 p-4 h-28 flex items-center justify-center relative overflow-hidden">
          <div className="flex items-center gap-5">
            <div className="w-14 h-24 rounded-xl border-2 border-gray-700 bg-black/80 flex items-center justify-center relative">
              <div className="absolute top-1 w-4 h-0.5 rounded-full bg-gray-700" />
              <Smartphone size={20} className="text-gray-600" />
              <div className="absolute bottom-1 w-3 h-3 rounded-full border border-gray-700" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-16 h-1.5 rounded-full bg-gray-800" />
                <div className="w-8 h-1.5 rounded-full bg-gray-800" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-10 h-1.5 rounded-full bg-gray-800" />
                <div className="w-12 h-1.5 rounded-full bg-gray-800" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-14 h-1.5 rounded-full bg-gray-800" />
                <div className="w-6 h-1.5 rounded-full bg-gray-800" />
              </div>
              <div className="text-[9px] text-gray-600 font-mono mt-1">Mobile app preview</div>
            </div>
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

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-green-500/10 bg-[#020a02]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="NFTPulse Logo" width={32} height={32} className="rounded-md" />
            <span className="font-bold text-xl tracking-tight text-white">NFTPULSE</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <Link href="/features" className="hover:text-green-400 transition-colors">Features</Link>
            <Link href="/roadmap" className="text-green-400">Roadmap</Link>
            <Link href="/pricing" className="hover:text-green-400 transition-colors">Pricing</Link>
          </div>
          <Link
            href="https://nftpulse-app.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-400 text-black px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)]"
          >
            Launch App <ExternalLink size={14} />
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-20 px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
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

        {/* Horizontal Timeline */}
        <div className="relative max-w-[1200px] mx-auto">
          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-8 px-4 snap-x snap-mandatory scrollbar-hide md:justify-center"
            style={{ scrollbarWidth: 'none' }}
          >
            {/* Connecting line (behind cards) */}
            <div className="absolute top-[10px] left-[calc(170px+1rem)] right-[calc(170px+1rem)] h-px hidden md:block">
              <div className="h-full bg-gradient-to-r from-green-500/60 via-cyan-500/30 to-white/10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 via-cyan-500/20 to-transparent blur-sm" />
              </div>
            </div>

            {phases.map((phase, i) => (
              <div key={i} className="snap-center">
                <PhaseCard data={phase} index={i} />
              </div>
            ))}
          </div>

          {/* Scroll hint on mobile */}
          <div className="md:hidden text-center mt-4">
            <span className="text-xs text-gray-600 font-mono animate-pulse">
              ← Scroll to explore →
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-green-500/10 bg-[#020a02] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="NFTPulse Logo" width={24} height={24} className="rounded-md" />
            <span className="font-bold tracking-tight text-gray-400">NFTPULSE SYSTEM</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-600">
            <Link href="#" className="hover:text-green-400 transition-colors">Documentation</Link>
            <Link href="https://x.com/_nftpulse_" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">Twitter</Link>
            <Link href="/terms" className="hover:text-green-400 transition-colors">Terms</Link>
          </div>
          <div className="text-xs text-gray-700 font-mono">
            SYSTEM STATUS: <span className="text-green-400">OPERATIONAL</span>
          </div>
        </div>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .particle-float { animation: particle-float 4s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `,
        }}
      />
    </div>
  );
};

export default RoadmapPage;
