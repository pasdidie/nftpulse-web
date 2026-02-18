'use client';

import React from 'react';
import Image from 'next/image';

const DiscordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-label="Discord">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-label="X / Twitter">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Footer: React.FC = () => {
  return (
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
              <a href="/features" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Features</a>
              <a href="/pricing" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Pricing</a>
              <a href="/roadmap" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Roadmap</a>
              <a href="#" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Changelog</a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">Resources</h4>
            <div className="space-y-2.5">
              <a href="#" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Documentation</a>
              <a href="#" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Status Page</a>
              <a href="/#security" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Security</a>
            </div>
          </div>

          {/* Legal + Social */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">Legal</h4>
            <div className="space-y-2.5">
              <a href="/terms" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="/terms" className="block text-sm text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a>
            </div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 mt-6">Social</h4>
            <div className="flex items-center gap-3">
              <a href="https://discord.gg/N24YgTBx3V" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#5865F2] transition-colors" aria-label="Discord">
                <DiscordIcon />
              </a>
              <a href="https://x.com/_nftpulse_" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="X / Twitter">
                <XIcon />
              </a>
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
  );
};

export default Footer;
