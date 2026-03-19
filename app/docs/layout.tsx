'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    title: 'Getting Started',
    links: [
      { href: '/docs', label: 'Overview' },
      { href: '/docs/getting-started', label: 'Quick Start' },
      { href: '/docs/safety', label: 'Safety & Best Practices' },
    ],
  },
  {
    title: 'Modules',
    links: [
      { href: '/docs/wallets', label: 'Wallets' },
      { href: '/docs/mint', label: 'Mint Engine' },
      { href: '/docs/toolbox', label: 'Toolbox' },
      { href: '/docs/portfolio', label: 'Portfolio' },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#020a02] text-white font-sans selection:bg-green-500/30">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a1f0a_1px,transparent_1px),linear-gradient(to_bottom,#0a1f0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10" />
      </div>

      <Navbar activePage="Docs" />

      <div className="relative z-10 pt-20 max-w-7xl mx-auto px-6 flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 shrink-0 pr-8 py-8 border-r border-white/[0.06]">
          <div className="sticky top-28 space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="text-[10px] text-green-400 uppercase tracking-[0.2em] font-bold mb-3">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                            isActive
                              ? 'bg-green-500/10 text-green-400 font-medium border-l-2 border-green-400'
                              : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                          }`}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="pt-6 border-t border-white/[0.06]">
              <a
                href="https://discord.gg/N24YgTBx3V"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-[#5865F2] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                Need help? Join Discord
              </a>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 py-8 md:pl-10">
          <article className="prose-docs max-w-3xl">
            {children}
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
