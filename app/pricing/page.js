'use client';
import React from 'react';
// import Link from 'next/link'; // Utilisez ceci dans votre VS Code
import { Disc, Key, CheckCircle2, XCircle, Shield } from 'lucide-react';

// Mock Link pour la prévisualisation
const Link = ({ href, children, className }) => <a href={href} className={className}>{children}</a>;

const PricingCard = ({ type, price, subtitle, features, recommended = false, buttonText, isPrimary = false, link }) => (
  <div className={`relative p-8 rounded-2xl border backdrop-blur-xl flex flex-col gap-6 group hover:scale-[1.02] transition-transform duration-300
    ${recommended ? 'border-blue-500/50 bg-blue-900/10' : 'border-white/10 bg-[#0a0c14]/50'}`}>
    
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg border border-white/20">
        Most Wanted
      </div>
    )}

    <div>
      <h3 className={`text-lg font-bold uppercase tracking-wider ${recommended ? 'text-blue-400' : 'text-gray-400'}`}>{type}</h3>
      <div className="flex items-baseline gap-1 mt-2">
        <span className="text-4xl font-bold text-white">{price}</span>
        {price !== 'Free' && price !== 'TBA' && <span className="text-sm text-gray-500">/ lifetime</span>}
      </div>
      <p className="text-sm text-gray-400 mt-2 h-10">{subtitle}</p>
    </div>

    <div className="space-y-4 flex-1 border-t border-white/5 pt-6">
      {features.map((feat, i) => (
        <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
          {feat.included ? 
            <CheckCircle2 size={16} className={recommended ? 'text-blue-400' : 'text-gray-600'} /> : 
            <XCircle size={16} className="text-white/10" />
          }
          <span className={feat.included ? '' : 'text-gray-600 decoration-gray-700'}>{feat.text}</span>
        </div>
      ))}
    </div>

    {link ? (
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2
        ${isPrimary ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20' : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'}`}
      >
        {buttonText}
      </a>
    ) : (
      <button className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2
        ${isPrimary ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20' : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'}`}>
        {buttonText}
      </button>
    )}
  </div>
);

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
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
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link>
            <Link href="/pricing" className="text-white">Pricing</Link>
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
            <Key size={16} /> SECURED ENTRY
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Clearance</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Join the elite. Access is currently restricted to merit-based applicants or future Genesis Pass holders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          
          {/* Card 1: Beta */}
          <PricingCard 
            type="Beta Tester" 
            price="Free" 
            subtitle="Earned via Discord contribution and manual verification."
            buttonText="Join Discord"
            link="https://discord.gg/N24YgTBx3V"
            features={[
              { text: "Access to Beta Builds", included: true },
              { text: "Discord Private Channels", included: true },
              { text: "Standard Support", included: true },
              { text: "Manual Minting Tools", included: true },
              { text: "0ms Latency Nodes", included: false },
              { text: "Profit Sharing", included: false }
            ]}
          />

          {/* Card 2: Genesis */}
          <PricingCard 
            type="Genesis Pass" 
            price="TBA" 
            subtitle="Minting Soon. The ultimate key to the protocol." 
            recommended={true}
            isPrimary={true}
            buttonText="Mint Coming Soon"
            features={[
              { text: "Lifetime Full Access", included: true },
              { text: "Genesis Alpha Group", included: true },
              { text: "Priority Support 24/7", included: true },
              { text: "Automated Sniper Bots", included: true },
              { text: "0ms Latency Nodes", included: true },
              { text: "Revenue Share (DAO)", included: true }
            ]}
          />
        </div>
        
        <div className="mt-16 flex justify-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
                <Shield size={16} className="text-emerald-500" />
                Payments secured by Ethereum Smart Contracts.
            </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}} />
    </div>
  );
}
