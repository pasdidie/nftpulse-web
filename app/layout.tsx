import React from 'react';
import type { Metadata } from 'next';
// import './globals.css'; // Décommente dans ton projet local si tu as ce fichier
// import { Inter } from 'next/font/google'; // À utiliser en local si tu veux la police Inter

// const inter = Inter({ subsets: ['latin'] });
const inter = { className: 'font-sans' }; // Fallback simple

export const metadata: Metadata = {
  title: 'NFTPulse | Dominate the Mempool',
  description:
    'The fastest automated NFT minting infrastructure. Zero latency. Institutional-grade security.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#02040a] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
