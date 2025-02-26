// src/app/layout.tsx
import './global.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mon Jeu - Grattez pour gagner',
  description: 'Une application de jeu en ligne avec shadcn/ui et Tailwind CSS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-xl font-bold">Mon Jeu de Grattage</h1>
        </header>
        <main className="min-h-screen p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          © 2025 - Mon Jeu
        </footer>
      </body>
    </html>
  );
}
