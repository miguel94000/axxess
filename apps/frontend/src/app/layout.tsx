import '@shadcn-test/styles/global.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bienvenue sur le Jeu GG - Grattez pour gagner',
  description: 'Un jeu en ligne permettant de gagner 500 000 €',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-xl font-bold">
            💰 GG Le Jeu De Grattage Ultime 💰
          </h1>
        </header>
        <main className="flex-grow flex items-center justify-center p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          © 2025 - GG le jeu
        </footer>
      </body>
    </html>
  );
}
