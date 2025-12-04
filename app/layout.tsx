import React from 'react';
// import './globals.css'; // Décommentez cette ligne dans votre projet local VS Code
// import { Inter } from 'next/font/google'; // Décommentez pour la police Google dans VS Code

// Configuration de la police (Simulée pour la preview, utilisez Inter dans VS Code)
// const inter = Inter({ subsets: ['latin'] });
const inter = { className: 'font-sans' }; // Fallback pour la preview

// Configuration SEO
export const metadata = {
  title: 'NFTPulse | Dominate the Mempool',
  description: 'The fastest automated NFT minting infrastructure. Zero latency. Institutional-grade security.',
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
      {/* On applique la couleur de fond sombre directement ici */}
      <body className={`${inter.className} bg-[#02040a] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}