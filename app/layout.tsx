// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'NFTPulse',
  description: 'Mint infra',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#02040a] text-white">
        {children}
      </body>
    </html>
  );
}
