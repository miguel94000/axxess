// src/app/page.tsx
'use client';
import { useState } from 'react';
import { GridGame } from './components/GridGame';
import { Login } from './components/Login';

export default function Home() {
  const [login, setLogin] = useState('');
  const [isIdentified, setIsIdentified] = useState(false);
  const [scratched, setScratched] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleLogin = () => {
    if (login.trim() !== '') {
      setIsIdentified(true);
      // Vous pouvez aussi stocker le login dans le localStorage ou context pour les appels futurs
    }
  };

  const handleScratch = async (index: number) => {
    if (scratched.length < 3 && !scratched.includes(index)) {
      setScratched([...scratched, index]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!isIdentified ? (
        <Login login={login} setLogin={setLogin} handleLogin={handleLogin} />
      ) : (
        <GridGame
          login={login}
          scratched={scratched}
          setScratched={setScratched}
          isGameOver={isGameOver}
          setIsGameOver={setIsGameOver}
          handleScratch={handleScratch}
        />
      )}
    </div>
  );
}
