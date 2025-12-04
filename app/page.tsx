// @ts-nocheck

'use client';

import React, { ReactNode, MouseEventHandler } from 'react';
import { Disc, ChevronRight, Lock } from 'lucide-react';

// --- TYPES POUR LE LIEN ---
interface CustomLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
}

// --- COMPOSANT LIEN SIMPLE ---
const Link: React.FC<CustomLinkProps> = ({
  href,
  children,
  className,
  onClick,
  target,
  rel,
}) => (
  <a
    href={href}
    className={className}
    onClick={onClick}
    target={target}
    rel={rel}
  >
    {children}
  </a>
);

// --- COMPOSANT CUBE 3D ---
const NeonCube: React.FC = () => {
  return (
    <div className="cube-container w-64 h-64 relative perspective-1000">
      <div className="cube w-full h-full relative preserve-3d animate-spin-slow">
        {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
          <div
            key={face}
            className={`absolute w-full h-full border-2 border-blue-500/50 bg-blue-900/10 backdrop-blur-sm box-shadow-neon flex items-center justify-center transform-style-3d face-${face}`}
          >
            <div className="w-16 h-16 border border-purple-500/30 rounded-full animate-pulse relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
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
    <div className="min-h-screen bg-[#02040a] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans flex flex-col">
      {/* Effets d'arrière-plan */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      {/* Barre de navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#02040a]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg">
              P
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              NFTPULSE
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/roadmap" className="hover:text-white transition-colors">
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

      {/* Section Héro */}
      <section className="relative z-10 pt-32 pb-10 px-6 max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu Gauche */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-medium uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Beta Access Live
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              DOMINATE THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient-x">
                MEMPOOL
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              The fastest automated minting infrastructure. Zero latency.
              Institutional-grade security. Stop competing. Start dominating.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/features"
                className="group relative px-8 py-4 bg-blue-600 text-white font-bold rounded-lg overflow-hidden transition-all hover:scale-105"
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
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-all"
              >
                Join Discord
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold font-mono">0.2s</div>
                <div className="text-xs text-gray-500 uppercase">Execution</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  99.9%
                </div>
                <div className="text-xs text-gray-500 uppercase">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono">$42M+</div>
                <div className="text-xs text-gray-500 uppercase">Volume Secured</div>
              </div>
            </div>
          </div>

          {/* Contenu Droite (Cube) */}
          <div
            className="relative flex items-center justify-center h-[500px] perspective-1000 animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
            <NeonCube />
          </div>
        </div>
      </section>

      {/* Section Accès Privé (Gatekeeper) */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-gradient-to-b from-[#02040a] to-blue-950/20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl rotate-3 mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.3)]">
            <Lock className="text-white" size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Private Beta Access
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            NFTPulse is currently in <strong>Closed Beta</strong>. Access is
            merit-based: earned by active contribution in our Discord or via
            application.
            <br />
            <br />
            <span className="text-blue-400 font-semibold">
              Genesis Pass (Lifetime Access)
            </span>{' '}
            mint coming soon for V1 launch.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              href="https://discord.gg/N24YgTBx3V"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg font-bold transition-all w-full md:w-auto justify-center shadow-lg shadow-blue-900/20"
            >
              Join Discord &amp; Earn Role
            </Link>
            <span className="text-gray-500 font-mono text-sm">OR</span>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSfrpClyknpxqbPI4ismMCzc9IHbyrwvdN10CM5pon_RSFQW_g/viewform?usp=sharing&ouid=118074420697624704159"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold transition-all w-full md:w-auto justify-center"
            >
              Apply for Beta
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#02040a] py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-xs">
              P
            </div>
            <span className="font-bold tracking-tight text-gray-300">
              NFTPULSE SYSTEM
            </span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">
              Documentation
            </Link>
            <Link
              href="https://x.com/_nftpulse_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Twitter
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
          <div className="text-xs text-gray-700 font-mono">
            SYSTEM STATUS:{' '}
            <span className="text-green-500">OPERATIONAL</span>
          </div>
        </div>
      </footer>

      {/* Styles CSS globaux pour l'animation */}
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
        .animate-spin-slow { animation: spin 10s infinite linear; }
        .box-shadow-neon { box-shadow: 0 0 15px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.1); }
        @keyframes spin { from { transform: rotateX(-15deg) rotateY(0deg); } to { transform: rotateX(-15deg) rotateY(360deg); } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
      `,
        }}
      />
    </div>
  );
};

export default LandingPage;
