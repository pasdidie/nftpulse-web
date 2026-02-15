'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  LayoutDashboard,
  Wrench,
  Gift,
  Zap,
  BarChart3,
  Trophy,
  Wallet,
  ArrowLeftRight,
  Image as ImageIcon,
  Tag,
  ShieldCheck,
  Layers,
  Lock,
  Sparkles,
} from 'lucide-react';

// --- LINK ---
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

// --- FEATURE CARD WITH MOUSE GLOW ---
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
  delay?: number;
  accent?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  children,
  delay = 0,
  accent = 'green',
}) => {
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const colors: Record<string, { glow: string; icon: string; border: string }> = {
    green: { glow: '0,255,65', icon: 'text-green-400', border: 'hover:border-green-500/40' },
    cyan: { glow: '0,200,220', icon: 'text-cyan-400', border: 'hover:border-cyan-500/40' },
    amber: { glow: '245,180,50', icon: 'text-amber-400', border: 'hover:border-amber-500/40' },
    red: { glow: '255,60,60', icon: 'text-red-400', border: 'hover:border-red-500/40' },
  };
  const c = colors[accent] || colors.green;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-white/8 bg-[#060d06]/80 backdrop-blur-xl p-8 group transition-all duration-500 animate-fade-in-up opacity-0 flex-shrink-0 w-[340px] md:w-[380px] snap-center ${c.border}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(${c.glow},0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10">
        <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${c.icon} group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={24} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>
        {children}
      </div>
    </div>
  );
};

// --- MINI FEATURE PILL ---
const Pill = ({ icon: Icon, label }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string }) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-xs text-gray-300 font-medium">
    <Icon size={14} className="text-green-400 shrink-0" />
    {label}
  </div>
);

// --- PAGE ---
const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020a02] text-white font-sans selection:bg-green-500/30">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-green-600/8 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/6 rounded-full blur-[100px] mix-blend-screen" />
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
            <Link href="/features" className="text-green-400">
              Features
            </Link>
            <Link href="/roadmap" className="hover:text-green-400 transition-colors">
              Roadmap
            </Link>
            <Link href="/pricing" className="hover:text-green-400 transition-colors">
              Pricing
            </Link>
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
      <div className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 animate-fade-in-up text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-950/50 border border-green-500/30 text-green-400 text-xs font-medium uppercase tracking-widest mb-6">
            <Zap size={12} />
            Modules
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5">
            Everything you need.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-emerald-300">
              Nothing you don&apos;t.
            </span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Four powerful modules built for speed, control, and maximum output.
          </p>
        </div>

        {/* Feature Cards - Horizontal scroll */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {/* DASHBOARD */}
          <FeatureCard
            title="Dashboard"
            description="Your command center. Track every mint, monitor your portfolio performance, and analyze your activity in real time."
            icon={LayoutDashboard}
            accent="green"
            delay={100}
          >
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-black/40 rounded-xl border border-white/5 p-4 text-center">
                <BarChart3 size={18} className="text-green-400 mx-auto mb-2" />
                <div className="text-xs text-gray-500">Activity</div>
              </div>
              <div className="bg-black/40 rounded-xl border border-white/5 p-4 text-center">
                <Trophy size={18} className="text-green-400 mx-auto mb-2" />
                <div className="text-xs text-gray-500">Successes</div>
              </div>
              <div className="bg-black/40 rounded-xl border border-white/5 p-4 text-center">
                <Layers size={18} className="text-green-400 mx-auto mb-2" />
                <div className="text-xs text-gray-500">Portfolio</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill icon={BarChart3} label="Real-time analytics" />
              <Pill icon={Trophy} label="Success tracking" />
            </div>
          </FeatureCard>

          {/* TOOLBOX */}
          <FeatureCard
            title="Toolbox"
            description="Full wallet management suite. Create wallets, move funds, view your NFTs, list them on marketplaces, or sell instantly."
            icon={Wrench}
            accent="cyan"
            delay={200}
          >
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2 bg-black/40 rounded-lg border border-white/5 p-3">
                <Wallet size={16} className="text-cyan-400 shrink-0" />
                <span className="text-xs text-gray-300">Create wallets</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 rounded-lg border border-white/5 p-3">
                <ArrowLeftRight size={16} className="text-cyan-400 shrink-0" />
                <span className="text-xs text-gray-300">Move funds</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 rounded-lg border border-white/5 p-3">
                <ImageIcon size={16} className="text-cyan-400 shrink-0" />
                <span className="text-xs text-gray-300">View NFTs</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 rounded-lg border border-white/5 p-3">
                <Tag size={16} className="text-cyan-400 shrink-0" />
                <span className="text-xs text-gray-300">List & sell</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill icon={Wallet} label="Multi-wallet support" />
              <Pill icon={ArrowLeftRight} label="Bulk transfers" />
            </div>
          </FeatureCard>

          {/* MINT */}
          <FeatureCard
            title="Mint"
            description="Lightning-fast minting engine. Execute across multiple wallets simultaneously with maximum security and minimal latency."
            icon={Zap}
            accent="red"
            delay={300}
          >
            <div className="bg-black/60 rounded-xl border border-white/5 p-4 mb-4 font-mono text-xs">
              <div className="text-gray-500 mb-2">{">"} mint --wallets 5 --target 0x7a...4f9</div>
              <div className="text-green-400 mb-1">{">"} Wallets loaded: W1, W2, W3, W4, W5</div>
              <div className="text-green-400 mb-1">{">"} Gas optimized. Submitting txns...</div>
              <div className="text-green-400 font-bold">{">"} 5/5 MINTED SUCCESSFULLY</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill icon={Layers} label="Multi-wallet mint" />
              <Pill icon={ShieldCheck} label="Secure execution" />
              <Pill icon={Zap} label="Ultra-low latency" />
            </div>
          </FeatureCard>

          {/* REWARDS */}
          <FeatureCard
            title="Rewards"
            description="Earn hidden rewards as you use the platform. The more active you are, the more you unlock. Some things are better left discovered."
            icon={Gift}
            accent="amber"
            delay={400}
          >
            <div className="bg-black/40 rounded-xl border border-amber-500/10 p-5 text-center mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />
              <div className="relative">
                <Sparkles size={32} className="text-amber-400 mx-auto mb-3 animate-pulse" />
                <div className="text-sm font-bold text-white mb-1">Hidden Rewards System</div>
                <div className="text-xs text-gray-500">Use the platform. Accumulate points. Unlock secrets.</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill icon={Lock} label="Secret milestones" />
              <Pill icon={Gift} label="Exclusive drops" />
            </div>
          </FeatureCard>
        </div>

        {/* Scroll hint */}
        <div className="text-center mt-4 mb-8">
          <span className="text-xs text-gray-600 font-mono animate-pulse">← Scroll to explore →</span>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center animate-fade-in-up opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          <Link
            href="https://nftpulse-app.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-black font-bold rounded-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,255,65,0.2)] hover:shadow-[0_0_40px_rgba(0,255,65,0.4)]"
          >
            Launch App <ExternalLink size={18} />
          </Link>
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `,
        }}
      />
    </div>
  );
};

export default FeaturesPage;
