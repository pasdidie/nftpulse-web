'use client';

import React from 'react';
import Image from 'next/image';
import { Disc, Map, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const Link = ({ href, children, className }: LinkProps) => (
  <a href={href} className={className}>
    {children}
  </a>
);

type RoadmapStatus = 'active' | 'done' | 'future';

interface RoadmapItemProps {
  phase: string;
  title: string;
  date: string;
  items: string[];
  status: RoadmapStatus;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ phase, title, date, items, status }) => {
  const isActive = status === 'active';
  const isDone = status === 'done';
  const isFuture = status === 'future';

  return (
    <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 gap-10 items-center group opacity-90 hover:opacity-100 transition-opacity">
      {/* Ligne centrale */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -ml-px group-hover:bg-blue-500/50 transition-colors" />

      {/* Point central */}
      <div
        className={`absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-2 transform -translate-x-1/2 mt-6 z-10 transition-all duration-500
        ${
          isActive
            ? 'bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] scale-125'
            : isDone
            ? 'bg-emerald-500 border-emerald-400'
            : 'bg-[#0a0c14] border-gray-600'
        }`}
      />

      {/* Titre */}
      <div className={`md:text-right md:pr-10 mb-2 md:mb-0 ${isDone ? 'text-gray-400' : 'text-white'}`}>
        <div
          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-2 tracking-widest uppercase
          ${
            isActive
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : isDone
              ? 'bg-emerald-500/10 text-emerald-500'
              : 'bg-white/5 text-gray-500'
          }`}
        >
          Phase {phase}
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm font-mono text-gray-500 mt-1">{date}</p>
      </div>

      {/* Détail */}
      <div className="md:pl-10 pb-12">
        <div
          className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300
          ${
            isActive
              ? 'bg-blue-900/10 border-blue-500/30'
              : isFuture
              ? 'bg-white/5 border-white/5 hover:border-white/10'
              : 'bg-emerald-900/5 border-emerald-500/20'
          }`}
        >
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                {isDone ? (
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                ) : isActive ? (
                  <ArrowRight size={16} className="text-blue-400 mt-0.5" />
                ) : (
                  <Circle size={16} className="text-gray-600 mt-0.5" />
                )}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const RoadmapPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#02040a]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="NFTPulse Logo" width={32} height={32} className="rounded-md" />
            <span className="font-bold text-xl tracking-tight text-white">NFTPULSE</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/roadmap" className="text-white">
              Roadmap
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
          </div>
          <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2">
            <Disc size={14} className="animate-spin" /> System Online
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 text-purple-400 font-mono text-sm mb-4">
            <Map size={16} /> MISSION TIMELINE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">The Path to Dominance</h1>
        </div>

        <div className="relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <RoadmapItem
            phase="01"
            title="Initial Deployment"
            date="Now – Q4 2025"
            status="active"
            items={[
              'Launch of NFTPulse landing & branding',
              'Discord server opening & first community onboarding',
              'Beta role distribution (Operators / Testers)',
              'Core bot & app development (monitoring + mint engine)',
            ]}
          />

          <RoadmapItem
            phase="02"
            title="Bot V1 & Genesis NFT"
            date="+1–2 months after launch"
            status="future"
            items={[
              'Release of NFTPulse Bot V1 for early testers',
              'Launch of Genesis access NFT collection',
              'Surprise feature drop reserved for early holders',
              'Support for more EVM chains (Base, Arbitrum, +1)',
            ]}
          />

          <RoadmapItem
            phase="03"
            title="Mobile & Infrastructure Upgrade"
            date="+2 months after V1"
            status="future"
            items={[
              'First mobile app version (monitoring & dashboards)',
              'New access model fully tied to the Genesis NFT',
              'Global infrastructure upgrade for lower latency & more stability',
            ]}
          />
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `,
        }}
      />
    </div>
  );
};

export default RoadmapPage;
