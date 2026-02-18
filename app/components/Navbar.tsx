'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ExternalLink, Wifi, Activity } from 'lucide-react';

/* ── Chain Logos ── */

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

/* ── System Status ── */

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

/* ── Nav Links ── */

const navLinks = [
  { label: 'Product', href: '/#product' },
  { label: 'Features', href: '/features' },
  { label: 'Security', href: '/#security' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Roadmap', href: '/roadmap' },
];

/* ── Navbar Component ── */

interface NavbarProps {
  activePage?: string;
}

const Navbar: React.FC<NavbarProps> = ({ activePage }) => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-[#020a02]/70 backdrop-blur-xl" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2" aria-label="NFTPulse Home">
          <Image src="/logo.png" alt="NFTPulse Logo" width={28} height={28} className="rounded-md" />
          <span className="font-bold text-lg tracking-tight text-white">NFTPULSE</span>
        </a>

        <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-gray-500">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`hover:text-green-400 transition-colors ${activePage === link.label ? 'text-green-400' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <SystemStatus />
          <a
            href="https://nftpulse-app.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-400 text-black px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_16px_rgba(0,255,65,0.2)] hover:shadow-[0_0_24px_rgba(0,255,65,0.35)]"
          >
            Launch App <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
