'use client';

import React from 'react';
import Image from 'next/image';
import { Disc, Key, CheckCircle2, XCircle, Shield } from 'lucide-react';

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

const Link = ({ href, children, className, target, rel }: LinkProps) => (
  <a href={href} className={className} target={target} rel={rel}>
    {children}
  </a>
);

interface FeatureItem {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  type: string;
  price: string;
  subtitle: string;
  features: FeatureItem[];
  recommended?: boolean;
  buttonText: string;
  isPrimary?: boolean;
  link?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  type,
  price,
  subtitle,
  features,
  recommended = false,
  buttonText,
  isPrimary = false,
  link,
}) => (
  <div
    className={`relative p-8 rounded-2xl border backdrop-blur-xl flex flex-col gap-6 group hover:scale-[1.02] transition-transform duration-300
    ${recommended ? 'border-blue-500/50 bg-blue-900/10' : 'border-white/10 bg-[#0a0c14]/50'}`}
  >
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg border border-white/20">
        Most Wanted
      </div>
    )}

    <div>
      <h3
        className={`text-lg font-bold uppercase tracking-wider ${
          recommended ? 'text-blue-400' : 'text-gray-400'
        }`}
      >
        {type}
      </h3>
      <div className="flex items-baseline gap-1 mt-2">
        <span className="text-4xl font-bold text-white">{price}</span>
        {price !== 'Free' && price !== 'TBA' && (
          <span className="text-sm text-gray-500">/ lifetime</span>
        )}
      </div>
      <p className="text-sm text-gray-400 mt-2 h-12">{subtitle}</p>
    </div>

    <div className="space-y-4 flex-1 border-t border-white/5 pt-6">
      {features.map((feat, i) => (
        <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
          {feat.included ? (
            <CheckCircle2 size={16} className={recommended ? 'text-blue-400' : 'text-gray-400'} />
          ) : (
            <XCircle size={16} className="text-white/10" />
          )}
          <span className={feat.included ? '' : 'text-gray-600 line-through'}>{feat.text}</span>
        </div>
      ))}
    </div>

    {link ? (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2
        ${
          isPrimary
            ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20'
            : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
        }`}
      >
        {buttonText}
      </a>
    ) : (
      <button
        className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2
        ${
          isPrimary
            ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20'
            : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
        }`}
      >
        {buttonText}
      </button>
    )}
  </div>
);

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
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
            <Link href="/roadmap" className="hover:text-white transition-colors">
              Roadmap
            </Link>
            <Link href="/pricing" className="text-white">
              Pricing
            </Link>
          </div>
          <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2">
            <Disc size={14} className="animate-spin" /> System Online
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 text-blue-400 font-mono text-sm mb-4">
            <Key size={16} /> ACCESS VIA NFT
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Clearance</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Long-term access to NFTPulse will be granted via a{' '}
            <span className="text-blue-300 font-semibold">Genesis access NFT</span>. During beta,
            hand-picked testers can already use the tools through Discord.
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <PricingCard
            type="Beta Tester"
            price="Free"
            subtitle="Temporary access during closed beta, granted through Discord roles."
            buttonText="Join Discord"
            link="https://discord.gg/N24YgTBx3V"
            features={[
              { text: 'Access to core beta modules (monitoring + basic bots)', included: true },
              { text: 'Private Discord channels & feedback loop', included: true },
              { text: 'Standard support (best-effort, no SLA)', included: true },
              { text: 'Limited wallet / chain limits & occasional resets', included: true },
              { text: 'Guaranteed long-term access to all future modules', included: false },
              { text: 'Priority infrastructure & early mobile access', included: false },
            ]}
          />

          <PricingCard
            type="Genesis Pass"
            price="TBA"
            subtitle="Access managed on-chain. Owning the Genesis NFT = your key to the full protocol."
            recommended
            isPrimary
            buttonText="Genesis NFT – Mint Soon"
            features={[
              { text: 'Lifetime access to stable modules & future upgrades', included: true },
              { text: 'Higher limits for wallets, chains & monitored collections', included: true },
              { text: 'Priority infrastructure on critical mints', included: true },
              { text: 'Private Genesis alpha group & strategy drops', included: true },
              { text: 'Access to mobile app as it rolls out', included: true },
              { text: 'Potential future utility / perks for holders (non-guaranteed)', included: true },
            ]}
          />
        </div>

        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
            <Shield size={16} className="text-emerald-500" />
            Access and payments will be secured by Ethereum smart contracts (Genesis NFT).
          </div>
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

export default PricingPage;
