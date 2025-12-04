import './globals.css';
import { Inter } from 'next/font/google';

// Configuration de la police
const inter = Inter({ subsets: ['latin'] });

// Configuration SEO (Titre de l'onglet, description Google)
export const metadata = {
  title: 'NFTPulse | Dominate the Mempool',
  description: 'The fastest automated NFT minting infrastructure. Zero latency. Institutional-grade security.',
  icons: {
    icon: '/favicon.ico', // Assure-toi d'avoir un fichier favicon.ico dans le dossier public/
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* On applique la couleur de fond sombre directement ici pour éviter les flashs blancs au chargement */}
      <body className={`${inter.className} bg-[#02040a] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}