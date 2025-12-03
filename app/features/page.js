'use client';
import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link'; // Utilisez ceci dans votre VS Code
import { Terminal, Shield, Zap, Database, Crosshair, Lock, Disc, Activity, FlaskConical, GitBranch } from 'lucide-react';

// Mock Link pour la prévisualisation
const Link = ({ href, children, className }) => <a href={href} className={className}>{children}</a>;

// --- COMPONENTS ---
const BentoCard = ({ title, subtitle, icon: Icon, size = "md", children, delay = 0, isDev = false }) => {
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const colSpan = size === "lg" ? "md:col-span-2" : "md:col-span-1";
  const rowSpan = size === "tall" ? "md:row-span-2" : "md:row-span-1";

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border bg-[#0a0c14]/80 backdrop-blur-xl p-6 ${colSpan} ${rowSpan} group transition-all duration-500 animate-fade-in-up opacity-0
        ${isDev ? 'border-dashed border-white/20 hover:border-purple-500/50' : 'border-white/10 hover:border-blue-500/30'}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{ opacity, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(${isDev ? '168,85,247' : '59,130,246'},0.15), transparent 40%)` }} 
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg group-hover:scale-110 transition-transform duration-300
          ${isDev ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
          <Icon size={20} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{subtitle}</p>
        <div className="mt-auto">{children}</div>
      </div>
    </div>
  );
};

const TerminalSim = () => {
  const [lines, setLines] = useState([
    "> NFTPulse Module [SNIPER] initialized",
    "> Listening to mempool...",
  ]);

  useEffect(() => {
    const sequence = [
      { text: "> Target found: 0x7a...4f9", delay: 800 },
      { text: "> Gas spike detected (50 gwei)", delay: 1500, color: "text-yellow-400" },
      { text: ">> MINT SUCCESSFUL", delay: 2500, color: "text-green-400 font-bold glow" },
    ];
    let timeouts = [];
    sequence.forEach(({ text, delay, color }) => {
      timeouts.push(setTimeout(() => setLines(prev => [...prev.slice(-5), { text, color }]), delay));
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="font-mono text-xs p-4 bg-black/90 rounded-lg border border-white/5 shadow-2xl h-40 overflow-hidden flex flex-col justify-end">
      {lines.map((l, i) => <div key={i} className={l.color || 'text-gray-400'}>{l.text || l}</div>)}
    </div>
  );
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-blue-500/30">
      
       {/* Background */}
       <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#02040a]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg">P</div>
            <span className="font-bold text-xl tracking-tight text-white">NFTPULSE</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/features" className="text-white">Features</Link>
            <Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2">
            <Disc size={14} className="animate-spin" /> System Online
          </button>
        </div>
      </nav>

      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Core Modules</h1>
            <p className="text-gray-400 max-w-2xl text-lg">
                Explore the tactical suite designed to give you an unfair advantage. 
                <br />
                <span className="text-purple-400 text-sm font-mono mt-2 inline-block">
                  [!] MULTIPLE EXPERIMENTAL MODULES CURRENTLY IN R&D
                </span>
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto">
          
          {/* Sniper - Large */}
          <BentoCard 
            title="Sniper Engine v2" 
            subtitle="Advanced Mempool monitoring. Executes transactions 0.2s after liquidity detection."
            icon={Crosshair}
            size="lg"
            delay={100}
          >
            <TerminalSim />
          </BentoCard>

          {/* Wallet Manager */}
          <BentoCard 
            title="Vault Manager" 
            subtitle="Orchestrate 50+ wallets. Mass-mint, consolidate, and scatter funds instantly."
            icon={Shield}
            delay={200}
          >
            <div className="flex -space-x-3 mt-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-xs font-mono">W{i}</div>
              ))}
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shadow-lg">+</div>
            </div>
          </BentoCard>

          {/* SeaDrop */}
          <BentoCard 
            title="SeaDrop Intel" 
            subtitle="Direct contract interaction for OpenSea, Blur and customs contracts."
            icon={Zap}
            size="tall"
            delay={300}
          >
             <div className="h-full w-full bg-blue-500/5 rounded-lg border border-blue-500/20 p-4 relative flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
               <Activity className="text-blue-400 animate-pulse" size={48} />
             </div>
          </BentoCard>

          {/* Security */}
          <BentoCard 
            title="Local Encryption" 
            subtitle="AES-256 standard. Your private keys never leave your device."
            icon={Database}
            delay={400}
          >
             <div className="flex items-center gap-3 mt-2 text-emerald-400 text-sm font-mono bg-emerald-900/20 p-2 rounded border border-emerald-500/20">
               <Lock size={14} /> ZERO CLOUD
             </div>
          </BentoCard>

          {/* R&D Card - Added */}
          <BentoCard 
            title="Labs / In Development" 
            subtitle="More modules are being forged in the dark. Expect frequent updates."
            icon={FlaskConical}
            size="lg"
            delay={500}
            isDev={true}
          >
             <div className="flex items-center gap-4 mt-2">
               <div className="px-3 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-mono">
                 AUTO-TRADING
               </div>
               <div className="px-3 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-mono">
                 SOLANA BRIDGE
               </div>
               <div className="px-3 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-mono">
                 AI ANALYTICS
               </div>
             </div>
          </BentoCard>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}} />
    </div>
  );
}