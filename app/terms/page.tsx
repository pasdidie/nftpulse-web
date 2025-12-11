'use client';

import React from 'react';
import Image from 'next/image';
import { Disc } from 'lucide-react';

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const Link = ({ href, children, className, target, rel }: CustomLinkProps) => (
  <a href={href} className={className} target={target} rel={rel}>
    {children}
  </a>
);

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#02040a] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans flex flex-col">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#02040a]/70 backdrop-blur-md">
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

      {/* CONTENU TERMS */}
      <main className="relative z-10 pt-28 pb-16 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms & Usage</h1>
        <p className="text-sm text-gray-400 mb-6">
          Version beta – ces conditions pourront évoluer avant le lancement public de NFTPulse.
        </p>

        <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-2">1. Nature du service</h2>
            <p>
              NFTPulse fournit des outils d&apos;automatisation et de monitoring pour les marchés NFT
              (bots de mint, suivi de wallets, alertes, etc.). NFTPulse n&apos;est pas une plateforme
              d&apos;échange, ni un conseiller financier.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">2. Aucune recommandation d&apos;investissement</h2>
            <p>
              Les informations, signaux ou données générés par NFTPulse sont fournis à titre
              indicatif uniquement. Tu restes seul responsable de tes décisions d&apos;achat, de vente
              ou de mint.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">3. Clés privées et sécurité</h2>
            <p>
              NFTPulse ne doit jamais te demander ta seed phrase. Tu es entièrement responsable de
              la sécurité de tes wallets, de tes clés privées et des machines sur lesquelles tu
              exécutes les bots NFTPulse.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">4. Phase beta & disponibilité</h2>
            <p>
              Le service est actuellement en phase beta. Les fonctionnalités peuvent changer, être
              limitées ou interrompues sans préavis. Aucune garantie de disponibilité ou de
              performance n&apos;est donnée pendant cette phase.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">5. Utilisation raisonnable</h2>
            <p>
              Tu t&apos;engages à ne pas utiliser NFTPulse pour des activités illégales, de spam ou
              toute forme d&apos;attaque (DoS, exploitation de failles, etc.). NFTPulse se réserve le
              droit de suspendre l&apos;accès en cas d&apos;abus manifeste.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">6. Évolution des conditions</h2>
            <p>
              Ces conditions pourront être mises à jour à mesure que le projet évolue. La version
              la plus récente sera toujours disponible sur cette page.
            </p>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-[#02040a] py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="NFTPulse Logo"
              width={24}
              height={24}
              className="rounded-md"
            />
            <span className="font-bold tracking-tight text-gray-300">NFTPULSE SYSTEM</span>
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
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
          <div className="text-xs text-gray-700 font-mono">
            SYSTEM STATUS: <span className="text-green-500">OPERATIONAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
