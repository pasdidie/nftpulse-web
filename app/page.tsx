'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  ChevronRight,
  ChevronDown,
  Lock,
  ExternalLink,
  Wifi,
  Activity,
  Zap,
  Shield,
  Layers,
  Wallet,
  Search,
  MousePointerClick,
  KeyRound,
  ShieldCheck,
  FileText,
  MessageCircle,
} from 'lucide-react';
import Carousel from './components/Carousel';

/* ============================================================
   HELPERS
   ============================================================ */

const Link = ({ href, children, className, target, rel, 'aria-label': ariaLabel }: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}) => (
  <a href={href} className={className} target={target} rel={rel} aria-label={ariaLabel}>
    {children}
  </a>
);

/* ============================================================
   ANIMATED COUNTER
   ============================================================ */

const AnimatedCounter: React.FC<{
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}> = ({ target, suffix = '', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

/* ============================================================
   MATRIX RAIN
   ============================================================ */

const MatrixRain: React.FC = () => {
  const columns = useMemo(() => {
    const cols = [];
    for (let i = 0; i < 50; i++) {
      const chars = [];
      const charCount = 15 + Math.floor(Math.random() * 20);
      for (let j = 0; j < charCount; j++) {
        chars.push(
          Math.random() > 0.5
            ? String(Math.floor(Math.random() * 2))
            : String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
        );
      }
      cols.push({
        left: (i / 50) * 100,
        duration: 5 + Math.random() * 8,
        delay: Math.random() * -12,
        opacity: 0.12 + Math.random() * 0.25,
        fontSize: 10 + Math.floor(Math.random() * 5),
        chars,
      });
    }
    return cols;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {columns.map((col, i) => (
        <div
          key={i}
          className="absolute top-0 matrix-column font-mono text-green-400 whitespace-pre leading-tight"
          style={{
            left: `${col.left}%`,
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`,
            opacity: col.opacity,
            fontSize: `${col.fontSize}px`,
          }}
        >
          {col.chars.map((char, j) => (
            <div key={j} style={{ opacity: 1 - j * (0.7 / col.chars.length) }}>{char}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

/* ============================================================
   CHAIN LOGOS
   ============================================================ */

const EthLogo = () => (
  <svg width="18" height="18" viewBox="0 0 256 417" fill="none" aria-label="Ethereum">
    <path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" fill="#687AE5"/>
    <path d="M127.962 0L0 212.32l127.962 75.639V154.158z" fill="#8C9FEF"/>
    <path d="M127.961 312.187l-1.575 1.92V414.45l1.575 4.6L256 236.587z" fill="#687AE5"/>
    <path d="M127.962 419.05V312.187L0 236.587z" fill="#8C9FEF"/>
    <path d="M127.961 287.958l127.96-75.637-127.96-58.162z" fill="#4F5FB5"/>
    <path d="M0 212.32l127.96 75.639V154.158z" fill="#687AE5"/>
  </svg>
);

const MegaEthLogo = () => (
  <svg width="18" height="18" viewBox="0 0 100 100" fill="none" aria-label="MegaETH">
    <circle cx="50" cy="50" r="48" fill="#2D2D2D"/>
    <circle cx="50" cy="50" r="38" stroke="white" strokeWidth="4" fill="none"/>
    <text x="50" y="48" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial">M</text>
    <circle cx="40" cy="62" r="4" fill="white"/>
    <circle cx="50" cy="66" r="4" fill="white"/>
    <circle cx="60" cy="62" r="4" fill="white"/>
  </svg>
);

const BaseLogo = () => (
  <svg width="18" height="18" viewBox="0 0 111 111" fill="none" aria-label="Base">
    <circle cx="55.5" cy="55.5" r="55.5" fill="#0052FF"/>
    <path d="M55.5 94C76.763 94 94 76.763 94 55.5S76.763 17 55.5 17C35.294 17 18.743 32.578 17.093 52.353H67.5v6.294H17.093C18.743 78.422 35.294 94 55.5 94z" fill="white"/>
  </svg>
);

const AbstractLogo = () => (
  <svg width="18" height="18" viewBox="0 0 100 100" fill="none" aria-label="Abstract">
    <rect width="100" height="100" rx="18" fill="#1CD45E"/>
    <path d="M50 22C50 22 38 34 38 34L28 52L38 48L44 56L50 78L56 56L62 48L72 52L62 34C62 34 50 22 50 22Z" fill="white" fillOpacity="0.9"/>
  </svg>
);

const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="Discord">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
  </svg>
);

/* ============================================================
   SYSTEM STATUS
   ============================================================ */

const networks = [
  { name: 'ETH Mainnet', logo: <EthLogo />, ping: '12ms' },
  { name: 'MegaETH Mainnet', logo: <MegaEthLogo />, ping: '8ms' },
  { name: 'Base Mainnet', logo: <BaseLogo />, ping: '15ms' },
  { name: 'Abstract Mainnet', logo: <AbstractLogo />, ping: '11ms' },
];

const SystemStatus: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-500/8 hover:bg-green-500/15 border border-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
        aria-label="System status — All systems operational"
        title="All systems operational"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
        <span className="hidden sm:inline">Live</span>
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-72 bg-[#0a120a]/95 backdrop-blur-xl border border-green-500/15 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-fade-in-up z-50">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-green-500/10">
            <Activity size={13} className="text-green-400" />
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">Network Status</span>
            <span className="ml-auto text-[10px] text-green-400 font-mono">ALL OPERATIONAL</span>
          </div>
          <div className="space-y-2.5">
            {networks.map((net, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center shrink-0">{net.logo}</div>
                <div className="flex-1">
                  <div className="text-[11px] font-medium text-white">{net.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-[10px] text-green-400/80 font-mono">Operational</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Wifi size={10} className="text-green-400/50" />
                  <span className="text-[10px] text-gray-500 font-mono">{net.ping}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   NEON CUBE (improved with face labels)
   ============================================================ */

const cubeLabels = [
  { face: 'front', label: 'BUNDLE' },
  { face: 'right', label: 'SIMULATE' },
  { face: 'back', label: 'RELAY' },
  { face: 'left', label: 'MONITOR' },
  { face: 'top', label: 'EXECUTE' },
  { face: 'bottom', label: 'DEPLOY' },
] as const;

const NeonCube: React.FC = () => {
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const idleAngle = useRef(30);
  const animFrame = useRef<number>(0);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    lastPos.current = { x: clientX, y: clientY };
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;
    const dx = clientX - lastPos.current.x;
    const dy = clientY - lastPos.current.y;
    setRotation(prev => ({ x: prev.x - dy * 0.4, y: prev.y + dx * 0.4 }));
    lastPos.current = { x: clientX, y: clientY };
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    idleAngle.current = rotation.y;
  }, [rotation.y]);

  useEffect(() => {
    if (isDragging) return;
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      idleAngle.current += delta * 15;
      setRotation(prev => ({ x: prev.x, y: idleAngle.current }));
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [isDragging]);

  return (
    <div
      className="w-56 h-56 relative perspective-1000 select-none"
      onMouseDown={e => handleStart(e.clientX, e.clientY)}
      onMouseMove={e => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={e => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={e => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleEnd}
      role="img"
      aria-label="Interactive 3D cube showing NFTPulse capabilities: Bundle, Simulate, Relay, Monitor, Execute, Deploy"
    >
      <div
        className="w-full h-full relative preserve-3d transition-none"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        {cubeLabels.map(({ face, label }) => (
          <div
            key={face}
            className={`absolute w-full h-full border border-green-400/40 bg-green-950/8 box-shadow-neon flex flex-col items-center justify-center gap-2 face-${face}`}
          >
            <div className="text-[10px] font-mono font-bold tracking-[0.25em] text-green-400/70">{label}</div>
            <div className="w-8 h-px bg-green-400/20" />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   FAQ ITEM
   ============================================================ */

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm md:text-base font-medium text-white group-hover:text-green-400 transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-green-400' : ''}`}
        />
      </button>
      {open && (
        <div className="pb-5 text-sm text-gray-400 leading-relaxed animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          {answer}
        </div>
      )}
    </div>
  );
};

/* ============================================================
   FEATURE TILE (for carousel)
   ============================================================ */

const FeatureTile: React.FC<{
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}> = ({ icon: Icon, title, description, metric, metricLabel }) => (
  <div className="flex-shrink-0 w-[300px] md:w-[340px] snap-center rounded-2xl border border-white/8 bg-[#060d06]/70 backdrop-blur-sm p-7 group hover:border-green-500/30 transition-all duration-300">
    <div className="w-11 h-11 rounded-xl bg-green-500/8 border border-green-500/15 flex items-center justify-center mb-5 group-hover:bg-green-500/12 transition-colors">
      <Icon size={20} className="text-green-400" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400 leading-relaxed mb-4">{description}</p>
    {metric && (
      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
        <span className="text-lg font-bold font-mono text-green-400">{metric}</span>
        <span className="text-[11px] text-gray-500 uppercase tracking-wide">{metricLabel}</span>
      </div>
    )}
  </div>
);

/* ============================================================
   PAGE
   ============================================================ */

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020a02] text-white selection:bg-green-500/30 overflow-x-hidden font-sans">

      {/* ── Background: Gradient mesh + subtle grid + scanlines ── */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-mesh">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a1f0a_1px,transparent_1px),linear-gradient(to_bottom,#0a1f0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15" />
        <div className="absolute inset-0 scanlines opacity-[0.015]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-overlay" />
      </div>

      {/* ── Navbar: Glass sticky ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-[#020a02]/70 backdrop-blur-xl" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="NFTPulse Home">
            <Image src="/logo.png" alt="NFTPulse Logo" width={28} height={28} className="rounded-md" />
            <span className="font-bold text-lg tracking-tight text-white">NFTPULSE</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-gray-500">
            <Link href="#product" className="hover:text-green-400 transition-colors">Product</Link>
            <Link href="/features" className="hover:text-green-400 transition-colors">Modules</Link>
            <Link href="#security" className="hover:text-green-400 transition-colors">Security</Link>
            <Link href="/pricing" className="hover:text-green-400 transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-green-400 transition-colors flex items-center gap-1">
              <FileText size={13} /> Docs
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <SystemStatus />
            <Link
              href="https://nftpulse-app.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-black px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_16px_rgba(0,255,65,0.2)] hover:shadow-[0_0_24px_rgba(0,255,65,0.35)]"
            >
              Launch App <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Beta Banner (clickable) ── */}
      <div className="fixed top-14 w-full z-40 bg-green-500/8 border-b border-green-500/15 backdrop-blur-sm">
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSfrpClyknpxqbPI4ismMCzc9IHbyrwvdN10CM5pon_RSFQW_g/viewform?usp=sharing&ouid=118074420697624704159"
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-center gap-3 text-[11px]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
          </span>
          <span className="text-green-400 font-semibold uppercase tracking-wider">Beta Access Open</span>
          <span className="text-gray-500 hidden sm:inline">— Limited seats, rolling applications</span>
          <span className="text-green-400 font-bold flex items-center gap-1">Apply now <ChevronRight size={12} /></span>
        </Link>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative z-10 pt-36 pb-16 px-6 max-w-7xl mx-auto min-h-[calc(100vh-3.5rem)]  flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div className="animate-slide-in-left">
            <h1 className="mb-6">
              <span className="block text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-300 leading-[1.1]">
                DOMINATE THE
              </span>
              <span className="block text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-emerald-300 animate-gradient-x leading-[1.05] mt-1">
                MEMPOOL
              </span>
              <span className="block text-base md:text-lg font-mono text-green-400/70 tracking-wide mt-3 uppercase">
                Zero-latency mint execution
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-lg mb-2" style={{ lineHeight: '1.75' }}>
              Private transaction routing, pre-mint simulation, and multi-wallet orchestration — all non-custodial.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Built for WL and public mint wars. Average routing latency under 10ms across 4 EVM chains.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSfrpClyknpxqbPI4ismMCzc9IHbyrwvdN10CM5pon_RSFQW_g/viewform?usp=sharing&ouid=118074420697624704159"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-7 py-3.5 bg-green-500 text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-[1.03] shadow-[0_0_24px_rgba(0,255,65,0.2)] text-sm"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Get Beta Access <ChevronRight size={16} />
                </span>
              </Link>
              <Link
                href="https://nftpulse-app.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 border border-green-500/20 text-green-400 font-semibold rounded-xl hover:bg-green-500/5 hover:border-green-500/30 transition-all text-sm"
              >
                Launch App
              </Link>
              <Link
                href="https://discord.gg/N24YgTBx3V"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#5865F2] hover:border-[#5865F2]/30 transition-all"
                aria-label="Join Discord"
              >
                <DiscordIcon />
              </Link>
            </div>

            {/* Reassurance */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500 font-mono">
              <span className="flex items-center gap-1.5"><KeyRound size={11} className="text-green-400/60" /> Non-custodial</span>
              <span className="text-gray-700">•</span>
              <span className="flex items-center gap-1.5"><Shield size={11} className="text-green-400/60" /> Keys stay local</span>
              <span className="text-gray-700">•</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={11} className="text-green-400/60" /> No approvals needed</span>
            </div>
          </div>

          {/* Right: Cube */}
          <div className="relative flex items-center justify-center h-[380px] lg:h-[450px] perspective-1000 animate-slide-in-right" style={{ animationDelay: '150ms' }}>
            <div className="absolute w-[300px] h-[300px] bg-green-500/[0.06] blur-[100px] rounded-full" />
            <div className="absolute w-[150px] h-[150px] bg-cyan-500/[0.04] blur-[60px] rounded-full translate-x-12 -translate-y-6" />
            <NeonCube />
          </div>
        </div>

        {/* Live Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          {[
            { value: 12847, suffix: '+', label: 'Mints Executed', prefix: '' },
            { value: 4, suffix: '', label: 'EVM Chains', prefix: '' },
            { value: 8, suffix: 'ms', label: 'Avg Latency', prefix: '<' },
            { value: 99, suffix: '%', label: 'Uptime (30d)', prefix: '' },
          ].map((stat, i) => (
            <div key={i} className="px-5 py-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center group hover:border-green-500/20 transition-all">
              <div className="text-2xl md:text-3xl font-black font-mono text-white mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} duration={1800 + i * 200} />
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Supported Chains */}
        <div className="mt-10 flex flex-col items-center gap-3 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-medium">Supported Chains</span>
          <div className="flex items-center gap-5">
            {[
              { logo: <EthLogo />, name: 'Ethereum' },
              { logo: <MegaEthLogo />, name: 'MegaETH' },
              { logo: <BaseLogo />, name: 'Base' },
              { logo: <AbstractLogo />, name: 'Abstract' },
            ].map((chain, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] group hover:border-green-500/20 transition-all">
                <div className="w-4 h-4 flex items-center justify-center">{chain.logo}</div>
                <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">{chain.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USP Strip ── */}
      <section id="product" className="relative z-10 py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] text-green-400 uppercase tracking-[0.3em] font-bold">Why NFTPulse</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">Built for speed. Designed for control.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Search, title: 'Auto-detect mint config', desc: 'Automatically scans and parses contract ABI, mint price, max supply, and function selectors. No manual setup.', proof: 'ERC-721 / ERC-1155 compatible' },
              { icon: Wallet, title: 'Multi-wallet orchestration', desc: 'Load and execute across multiple wallets simultaneously. Individual gas settings, unified dashboard.', proof: 'Up to 50 wallets per session' },
              { icon: Zap, title: 'Gas strategy presets', desc: 'Pre-configured gas strategies for different scenarios: snipe, safe, and custom. Real-time gas estimation.', proof: 'Dynamic gas based on network state' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 group hover:border-green-500/20 transition-all">
                <item.icon size={22} className="text-green-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{item.desc}</p>
                <span className="text-[10px] text-green-400/60 font-mono uppercase tracking-wide">{item.proof}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="relative z-10 py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[10px] text-green-400 uppercase tracking-[0.3em] font-bold">How it works</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">Three steps to domination</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Connect', desc: 'Link your wallets securely. Non-custodial — your keys never leave your device.', icon: Wallet },
              { step: '02', title: 'Monitor', desc: 'Track upcoming mints, detect contracts, simulate transactions before committing.', icon: Search },
              { step: '03', title: 'Execute', desc: 'One-click multi-wallet minting with optimized gas. Real-time status across all wallets.', icon: MousePointerClick },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-green-500/8 border border-green-500/15 flex items-center justify-center mb-5 group-hover:bg-green-500/12 group-hover:scale-105 transition-all">
                  <item.icon size={24} className="text-green-400" />
                </div>
                <div className="text-[10px] font-mono text-green-400/50 tracking-widest mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Tiles (Carousel) ── */}
      <section className="relative z-10 py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] text-green-400 uppercase tracking-[0.3em] font-bold">Modules</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">Everything under one roof</h2>
          </div>
          <Carousel>
            <FeatureTile
              icon={Layers}
              title="Multi-Chain Dashboard"
              description="Unified view of all your wallets, mints, and portfolio across every supported chain."
              metric="4"
              metricLabel="Chains — ETH, Base, MegaETH, Abstract"
            />
            <FeatureTile
              icon={Zap}
              title="Mint Engine"
              description="Execute mints across multiple wallets simultaneously. Gas optimization and pre-simulation included."
              metric="<10ms"
              metricLabel="avg routing latency"
            />
            <FeatureTile
              icon={Wallet}
              title="Wallet Toolbox"
              description="Create, manage, and transfer across wallets. View NFTs, list on marketplaces, bulk operations."
              metric="50+"
              metricLabel="wallets per session"
            />
            <FeatureTile
              icon={Shield}
              title="Private Transactions"
              description="Bundle and relay transactions privately to avoid frontrunning. MEV-protected execution."
              metric="0"
              metricLabel="MEV exposure"
            />
            <FeatureTile
              icon={Search}
              title="Pre-Mint Simulation"
              description="Simulate transactions before submitting. Catch reverts, check gas costs, verify mint parameters."
              metric="100%"
              metricLabel="revert detection"
            />
            <FeatureTile
              icon={Activity}
              title="Real-Time Monitoring"
              description="Live mempool monitoring, gas tracking, and mint status updates. Never miss a drop."
              metric="24/7"
              metricLabel="uptime monitoring"
            />
          </Carousel>
        </div>
      </section>

      {/* ── Security Section ── */}
      <section id="security" className="relative z-10 py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[10px] text-green-400 uppercase tracking-[0.3em] font-bold">Security</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">Your keys. Your NFTs. Always.</h2>
            <p className="text-sm text-gray-400 mt-3 max-w-xl mx-auto leading-relaxed">
              NFTPulse is non-custodial by design. We never store, transmit, or access your private keys.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: KeyRound, title: 'Non-Custodial Architecture', desc: 'Private keys are generated and stored locally on your device. They never touch our servers.' },
              { icon: ShieldCheck, title: 'No Token Approvals', desc: 'NFTPulse doesn\'t require ERC-20 approvals or wallet permissions. You control every transaction.' },
              { icon: Lock, title: 'Local Encryption', desc: 'All wallet data is encrypted at rest using AES-256. Decrypted only in-memory during active sessions.' },
              { icon: Shield, title: 'Open Security Model', desc: 'Architecture documentation available on request. Regular security reviews and transparent incident reporting.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:border-green-500/15 transition-all">
                <div className="w-10 h-10 rounded-lg bg-green-500/8 border border-green-500/15 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="relative z-10 py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] text-green-400 uppercase tracking-[0.3em] font-bold">Community</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">From our beta testers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'The multi-wallet orchestration changed how I approach public mints. No more juggling MetaMask windows.', author: '0xAlpha', role: 'Alpha Group Lead' },
              { quote: 'Non-custodial was the dealbreaker for me. Finally a tool that doesn\'t ask for my seed phrase.', author: 'mintoor.eth', role: 'NFT Collector' },
              { quote: 'Sub-10ms routing on Base. Haven\'t lost a gas war since I started using NFTPulse.', author: 'basedDegen', role: 'Active Minter' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <MessageCircle size={16} className="text-green-400/40 mb-4" />
                <p className="text-sm text-gray-300 leading-relaxed mb-5">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-[10px] font-bold text-green-400">
                    {item.author[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">@{item.author}</div>
                    <div className="text-[10px] text-gray-500">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Private Beta — Matrix Rain ── */}
      <section className="relative z-10 py-24 overflow-hidden border-t border-white/[0.04]">
        <div className="absolute inset-0 bg-[#010800]" />
        <MatrixRain />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020a02] via-transparent to-[#020a02]" />

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="rounded-2xl border border-green-500/15 bg-[#060d06]/60 backdrop-blur-xl p-8 md:p-12 text-center shadow-[0_0_48px_rgba(0,255,65,0.04)]">
            <div className="w-14 h-14 mx-auto bg-gradient-to-tr from-cyan-600 to-green-500 rounded-2xl rotate-3 mb-7 flex items-center justify-center shadow-[0_0_32px_rgba(0,255,65,0.2)]">
              <Lock className="text-black" size={28} />
            </div>

            <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3">Private Beta Access</h2>

            <p className="text-gray-400 text-sm md:text-base mb-3 max-w-md mx-auto leading-relaxed">
              Access is merit-based — earned by active contribution in Discord or via application.
            </p>
            <p className="text-green-400 font-semibold text-xs mb-8">
              Genesis Pass (Lifetime Access) mint coming soon.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="https://discord.gg/N24YgTBx3V"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-bold transition-all w-full sm:w-auto justify-center text-sm"
              >
                <DiscordIcon /> Join Discord
              </Link>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSfrpClyknpxqbPI4ismMCzc9IHbyrwvdN10CM5pon_RSFQW_g/viewform?usp=sharing&ouid=118074420697624704159"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-green-500/8 border border-green-500/15 text-white rounded-xl font-bold transition-all w-full sm:w-auto justify-center text-sm"
              >
                Apply for Beta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-10 py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] text-green-400 uppercase tracking-[0.3em] font-bold">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">Common questions</h2>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-7">
            <FAQItem
              question="How do I get beta access?"
              answer="Apply via the form on this page or join our Discord server and earn a beta role through community contribution. Access is rolling — we review applications weekly."
            />
            <FAQItem
              question="Which wallets are supported?"
              answer="NFTPulse works with any EVM-compatible wallet. You can import existing wallets or generate new ones directly in the app. All wallets are stored locally and encrypted."
            />
            <FAQItem
              question="Is my private key safe?"
              answer="Yes. NFTPulse is fully non-custodial. Your private keys are generated locally, encrypted with AES-256, and never transmitted to our servers. We have zero access to your funds."
            />
            <FAQItem
              question="What mints are supported?"
              answer="Any ERC-721 or ERC-1155 mint on supported EVM chains (Ethereum, Base, MegaETH, Abstract). The system auto-detects contract parameters including mint price, supply, and function selectors."
            />
            <FAQItem
              question="What is the Genesis Pass?"
              answer="The Genesis Pass is an upcoming NFT that grants lifetime access to NFTPulse. It replaces the beta role system and will be available to mint for early community members. Details coming soon."
            />
          </div>
        </div>
      </section>

      {/* ── Premium Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-[#020a02] py-16 px-6" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="NFTPulse Logo" width={24} height={24} className="rounded-md" />
                <span className="font-bold tracking-tight text-white">NFTPULSE</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                Non-custodial minting infrastructure for EVM chains. Built for speed, designed for control.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">Product</h4>
              <div className="space-y-2.5">
                <Link href="/features" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Modules</Link>
                <Link href="/pricing" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Pricing</Link>
                <Link href="/roadmap" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Roadmap</Link>
                <Link href="#" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Changelog</Link>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">Resources</h4>
              <div className="space-y-2.5">
                <Link href="#" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Documentation</Link>
                <Link href="#" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Status Page</Link>
                <Link href="#security" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Security</Link>
                <Link href="#" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">API (soon)</Link>
              </div>
            </div>

            {/* Legal + Social */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">Legal</h4>
              <div className="space-y-2.5">
                <Link href="/terms" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Terms of Service</Link>
                <Link href="/terms" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</Link>
              </div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 mt-6">Social</h4>
              <div className="flex items-center gap-3">
                <Link href="https://discord.gg/N24YgTBx3V" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#5865F2] transition-colors" aria-label="Discord">
                  <DiscordIcon />
                </Link>
                <Link href="https://x.com/_nftpulse_" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Twitter / X">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-gray-600 font-mono">
              &copy; 2026 NFTPulse. All rights reserved.
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600">
              SYSTEM STATUS:
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              <span className="text-green-400">OPERATIONAL</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
