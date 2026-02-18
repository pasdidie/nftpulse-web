'use client';

import React, { useMemo } from 'react';
import { Key, CheckCircle2, XCircle, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- MATRIX RAIN VERTICAL LINES ---
const MatrixBackground: React.FC = () => {
  const columns = useMemo(() => {
    const cols = [];
    for (let i = 0; i < 50; i++) {
      const chars = [];
      const charCount = 20 + Math.floor(Math.random() * 25);
      for (let j = 0; j < charCount; j++) {
        chars.push(Math.random() > 0.5 ? String(Math.floor(Math.random() * 2)) : String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)));
      }
      cols.push({
        left: (i / 50) * 100,
        duration: 5 + Math.random() * 10,
        delay: Math.random() * -15,
        opacity: 0.15 + Math.random() * 0.3,
        fontSize: 10 + Math.floor(Math.random() * 4),
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
            <div key={j} style={{ opacity: 1 - j * (0.6 / col.chars.length) }}>{char}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

// --- PRICING CARD ---
interface FeatureItem { text: string; included: boolean; }

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
  type, price, subtitle, features, recommended = false, buttonText, isPrimary = false, link,
}) => (
  <div
    className={`relative p-8 rounded-2xl border backdrop-blur-xl flex flex-col gap-6 group hover:scale-[1.02] transition-transform duration-300
    ${recommended ? 'border-green-500/40 bg-green-950/20' : 'border-white/10 bg-[#060d06]/50'}`}
  >
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg text-black">
        Most Wanted
      </div>
    )}

    <div>
      <h3 className={`text-lg font-bold uppercase tracking-wider ${recommended ? 'text-green-400' : 'text-gray-400'}`}>
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
            <CheckCircle2 size={16} className={recommended ? 'text-green-400' : 'text-gray-400'} />
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
        ${isPrimary
          ? 'bg-green-500 text-black hover:bg-green-400 shadow-[0_0_25px_rgba(0,255,65,0.2)]'
          : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
        }`}
      >
        {buttonText}
      </a>
    ) : (
      <button
        className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2
        ${isPrimary
          ? 'bg-green-500 text-black hover:bg-green-400 shadow-[0_0_25px_rgba(0,255,65,0.2)]'
          : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
        }`}
      >
        {buttonText}
      </button>
    )}
  </div>
);

// --- PAGE ---
const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020a02] text-white font-sans selection:bg-green-500/30 overflow-x-hidden relative">
      {/* Background with Matrix rain */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#010800]" />
        <MatrixBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020a02]/60 via-transparent to-[#020a02]/60" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <Navbar activePage="Pricing" />

      {/* Content */}
      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-950/50 border border-green-500/30 text-green-400 text-xs font-medium uppercase tracking-widest mb-6">
            <Key size={12} /> Access via NFT
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5">
            Choose Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-emerald-300">
              Clearance
            </span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Long-term access to NFTPulse will be granted via a{' '}
            <span className="text-green-400 font-semibold">Genesis access NFT</span>. During beta,
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

        <div className="mt-16 flex justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-green-500/5 border border-green-500/15 text-sm text-gray-400">
            <Shield size={16} className="text-green-400" />
            Access and payments secured by Ethereum smart contracts (Genesis NFT).
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;
