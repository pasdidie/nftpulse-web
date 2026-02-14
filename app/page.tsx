'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight, Lock, ExternalLink } from 'lucide-react';

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

  // Idle animation when not dragging
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
      {/* Effets d'arrière-plan */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-600/8 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyan-600/8 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a1f0a_1px,transparent_1px),linear-gradient(to_bottom,#0a1f0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />
        {/* Scanlines */}
        <div className="absolute inset-0 scanlines opacity-[0.03]" />
      </div>

      {/* Barre de navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-green-500/10 bg-[#020a02]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="NFTPulse Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="font-bold text-xl tracking-tight text-white">NFTPULSE</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <Link href="/features" className="hover:text-green-400 transition-colors">
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

      {/* Section Héro */}
      <section className="relative z-10 pt-32 pb-10 px-6 max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu Gauche */}
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

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-green-500/10">
              <div>
                <div className="text-2xl font-bold font-mono text-white">0.2s</div>
                <div className="text-xs text-gray-600 uppercase tracking-wider">Execution</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-green-400">99.9%</div>
                <div className="text-xs text-gray-600 uppercase tracking-wider">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-white">$42M+</div>
                <div className="text-xs text-gray-600 uppercase tracking-wider">Volume Secured</div>
              </div>
            </div>
          </div>

          {/* Contenu Droite (Cube interactif) */}
          <div
            className="relative flex items-center justify-center h-[500px] perspective-1000 animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="absolute inset-0 bg-green-500/8 blur-[100px] rounded-full" />
            <NeonCube />
          </div>
        </div>
      </section>

      {/* Section Accès Privé */}
      <section className="relative z-10 py-24 border-t border-green-500/10 bg-gradient-to-b from-[#020a02] to-green-950/20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-cyan-600 to-green-500 rounded-2xl rotate-3 mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(0,255,65,0.2)]">
            <Lock className="text-black" size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Private Beta Access</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            NFTPulse is currently in <strong className="text-white">Closed Beta</strong>. Access is merit-based: earned by
            active contribution in our Discord or via application.
            <br />
            <br />
            <span className="text-green-400 font-semibold">Genesis Pass (Lifetime Access)</span> mint
            coming soon for V1 launch.
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
            <Image
              src="/logo.png"
              alt="NFTPulse Logo"
              width={24}
              height={24}
              className="rounded-md"
            />
            <span className="font-bold tracking-tight text-gray-400">NFTPULSE SYSTEM</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-600">
            <Link href="#" className="hover:text-green-400 transition-colors">
              Documentation
            </Link>
            <Link
              href="https://x.com/_nftpulse_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors"
            >
              Twitter
            </Link>
            <Link href="/terms" className="hover:text-green-400 transition-colors">
              Terms
            </Link>
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
        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 65, 0.03) 2px,
            rgba(0, 255, 65, 0.03) 4px
          );
        }
      `,
        }}
      />
    </div>
  );
};

export default LandingPage;
