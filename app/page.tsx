'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ChevronRight, Lock, ExternalLink, Wifi, Activity } from 'lucide-react';

// --- COMPOSANT MATRIX RAIN ---
const MatrixRain: React.FC = () => {
  const columns = useMemo(() => {
    const cols = [];
    for (let i = 0; i < 60; i++) {
      const chars = [];
      const charCount = 15 + Math.floor(Math.random() * 20);
      for (let j = 0; j < charCount; j++) {
        chars.push(Math.random() > 0.5 ? String(Math.floor(Math.random() * 2)) : String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)));
      }
      cols.push({
        left: (i / 60) * 100,
        duration: 4 + Math.random() * 8,
        delay: Math.random() * -12,
        opacity: 0.15 + Math.random() * 0.35,
        fontSize: 10 + Math.floor(Math.random() * 6),
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

// --- NEON CURSOR ---
const NeonCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -50, y: -50 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{ left: pos.x - 6, top: pos.y - 6 }}
    >
      <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(0,255,65,0.9),0_0_20px_rgba(0,255,65,0.4),0_0_40px_rgba(0,255,65,0.15)]" />
    </div>
  );
};

// --- CHAIN LOGOS ---
const EthLogo = () => (
  <svg width="18" height="18" viewBox="0 0 256 417" fill="none">
    <path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" fill="#687AE5"/>
    <path d="M127.962 0L0 212.32l127.962 75.639V154.158z" fill="#8C9FEF"/>
    <path d="M127.961 312.187l-1.575 1.92V414.45l1.575 4.6L256 236.587z" fill="#687AE5"/>
    <path d="M127.962 419.05V312.187L0 236.587z" fill="#8C9FEF"/>
    <path d="M127.961 287.958l127.96-75.637-127.96-58.162z" fill="#4F5FB5"/>
    <path d="M0 212.32l127.96 75.639V154.158z" fill="#687AE5"/>
  </svg>
);

const MegaEthLogo = () => (
  <svg width="18" height="18" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#2D2D2D"/>
    <circle cx="50" cy="50" r="38" stroke="white" strokeWidth="4" fill="none"/>
    <text x="50" y="48" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial">M</text>
    <circle cx="40" cy="62" r="4" fill="white"/>
    <circle cx="50" cy="66" r="4" fill="white"/>
    <circle cx="60" cy="62" r="4" fill="white"/>
  </svg>
);

const BaseLogo = () => (
  <svg width="18" height="18" viewBox="0 0 111 111" fill="none">
    <circle cx="55.5" cy="55.5" r="55.5" fill="#0052FF"/>
    <path d="M55.5 94C76.763 94 94 76.763 94 55.5S76.763 17 55.5 17C35.294 17 18.743 32.578 17.093 52.353H67.5v6.294H17.093C18.743 78.422 35.294 94 55.5 94z" fill="white"/>
  </svg>
);

const AbstractLogo = () => (
  <svg width="18" height="18" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="18" fill="#1CD45E"/>
    <path d="M50 22C50 22 38 34 38 34L28 52L38 48L44 56L50 78L56 56L62 48L72 52L62 34C62 34 50 22 50 22Z" fill="white" fillOpacity="0.9"/>
  </svg>
);

// --- SYSTEM STATUS POPUP ---
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
        className="bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
        System Online
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-72 bg-[#0a120a]/95 backdrop-blur-xl border border-green-500/20 rounded-xl p-4 shadow-[0_0_30px_rgba(0,255,65,0.1)] animate-fade-in-up z-50">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-green-500/10">
            <Activity size={14} className="text-green-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Network Status</span>
            <span className="ml-auto text-[10px] text-green-400 font-mono">ALL OPERATIONAL</span>
          </div>
          <div className="space-y-3">
            {networks.map((net, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center shrink-0">{net.logo}</div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-white">{net.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-[10px] text-green-400 font-mono">Operational</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Wifi size={10} className="text-green-400/60" />
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

// --- INTERFACE TYPESCRIPT ---
type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

// --- COMPOSANT LINK ---
const Link = ({ href, children, className, onClick, target, rel }: CustomLinkProps) => (
  <a href={href} className={className} onClick={onClick} target={target} rel={rel}>
    {children}
  </a>
);

// --- COMPOSANT CUBE 3D INTERACTIF ---
const NeonCube: React.FC = () => {
  const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'] as const;
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
    setRotation(prev => ({
      x: prev.x - dy * 0.4,
      y: prev.y + dx * 0.4,
    }));
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
      idleAngle.current += delta * 20;
      setRotation(prev => ({ x: prev.x, y: idleAngle.current }));
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [isDragging]);

  return (
    <div
      className="cube-container w-64 h-64 relative perspective-1000 cursor-grab active:cursor-grabbing select-none"
      onMouseDown={e => handleStart(e.clientX, e.clientY)}
      onMouseMove={e => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={e => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={e => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleEnd}
    >
      <div
        className="cube w-full h-full relative preserve-3d"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        {faces.map((face) => (
          <div
            key={face}
            className={`absolute w-full h-full border border-green-400/60 bg-green-950/10 backdrop-blur-sm box-shadow-neon flex items-center justify-center transform-style-3d face-${face}`}
          >
            <div className="w-16 h-16 border border-cyan-400/40 rounded-full animate-pulse relative">
              <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- PAGE PRINCIPALE ---
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020a02] text-white selection:bg-green-500/30 overflow-x-hidden font-sans flex flex-col">
      <NeonCursor />

      {/* Effets d'arrière-plan */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-600/8 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyan-600/8 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a1f0a_1px,transparent_1px),linear-gradient(to_bottom,#0a1f0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />
        <div className="absolute inset-0 scanlines opacity-[0.03]" />
      </div>

      {/* Barre de navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-green-500/10 bg-[#020a02]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="NFTPulse Logo" width={32} height={32} className="rounded-md" />
            <span className="font-bold text-xl tracking-tight text-white">NFTPULSE</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <Link href="/features" className="hover:text-green-400 transition-colors">Features</Link>
            <Link href="/roadmap" className="hover:text-green-400 transition-colors">Roadmap</Link>
            <Link href="/pricing" className="hover:text-green-400 transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <SystemStatus />
            <Link
              href="https://nftpulse-app.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-black px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)]"
            >
              Launch App <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Section Héro */}
      <section className="relative z-10 pt-32 pb-10 px-6 max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-950/50 border border-green-500/30 text-green-400 text-xs font-medium uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Beta Access Live
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              DOMINATE THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-emerald-300 animate-gradient-x">
                MEMPOOL
              </span>
            </h1>

            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
              The fastest automated minting infrastructure. Zero latency.
              Institutional-grade security. Stop competing. Start dominating.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/features"
                className="group relative px-8 py-4 bg-green-500 text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105 shadow-[0_0_25px_rgba(0,255,65,0.2)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Explore Modules <ChevronRight size={18} />
                </span>
              </Link>
              <Link
                href="https://discord.gg/N24YgTBx3V"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border border-green-500/20 text-green-400 font-medium rounded-lg hover:bg-green-500/5 hover:border-green-500/40 transition-all"
              >
                Join Discord
              </Link>
            </div>
          </div>

          <div
            className="relative flex items-center justify-center h-[500px] perspective-1000 animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="absolute inset-0 bg-green-500/8 blur-[100px] rounded-full" />
            <NeonCube />
          </div>
        </div>
      </section>

      {/* Section Accès Privé - Matrix Rain Background */}
      <section className="relative z-10 py-24 border-t border-green-500/10 overflow-hidden">
        <div className="absolute inset-0 bg-[#010800]" />
        <MatrixRain />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020a02] via-transparent to-[#020a02]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-cyan-600 to-green-500 rounded-2xl rotate-3 mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(0,255,65,0.3)]">
            <Lock className="text-black" size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Private Beta Access</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            NFTPulse is currently in <strong className="text-white">Closed Beta</strong>. Access is merit-based: earned by
            active contribution in our Discord or via application.
            <br /><br />
            <span className="text-green-400 font-semibold">Genesis Pass (Lifetime Access)</span> mint coming soon for V1 launch.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              href="https://discord.gg/N24YgTBx3V"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg font-bold transition-all w-full md:w-auto justify-center shadow-lg shadow-indigo-900/20"
            >
              Join Discord &amp; Earn Role
            </Link>
            <span className="text-gray-600 font-mono text-sm">OR</span>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSfrpClyknpxqbPI4ismMCzc9IHbyrwvdN10CM5pon_RSFQW_g/viewform?usp=sharing&ouid=118074420697624704159"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-500/10 border border-green-500/20 text-white rounded-lg font-bold transition-all w-full md:w-auto justify-center"
            >
              Apply for Beta
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-green-500/10 bg-[#020a02] py-12 px-6 mt-auto">
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

      {/* Styles CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .face-front  { transform: rotateY(0deg) translateZ(8rem); }
        .face-right  { transform: rotateY(90deg) translateZ(8rem); }
        .face-back   { transform: rotateY(180deg) translateZ(8rem); }
        .face-left   { transform: rotateY(-90deg) translateZ(8rem); }
        .face-top    { transform: rotateX(90deg) translateZ(8rem); }
        .face-bottom { transform: rotateX(-90deg) translateZ(8rem); }
        .box-shadow-neon { box-shadow: 0 0 15px rgba(0, 255, 65, 0.25), inset 0 0 15px rgba(0, 255, 65, 0.08); }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
        .scanlines { background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.03) 2px, rgba(0, 255, 65, 0.03) 4px); }
        @keyframes matrix-fall { 0% { transform: translateY(-100%); } 100% { transform: translateY(calc(100vh + 100%)); } }
        .matrix-column { animation: matrix-fall linear infinite; }
      `,
        }}
      />
    </div>
  );
};

export default LandingPage;
