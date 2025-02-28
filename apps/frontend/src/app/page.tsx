// src/app/page.tsx
'use client';
import { useState } from 'react';
import { GridGame } from './components/GridGame';
import { Login } from './components/Login';
import axios from 'axios';
import { FinishDialog } from './components/FinishDialog';
import { Participant } from '@models';

export default function Home() {
  const [login, setLogin] = useState('');
  const [id, setId] = useState('');
  const [isIdentified, setIsIdentified] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [prize, setPrize] = useState('');
  const [won, setWon] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleLogin = async () => {
    if (login.trim() !== '') {
      const result = await axios.post('http://localhost:3001/participation', {
        login,
      });
      setId(result.data.id);
      setPrize(result.data.prize);
      setIsIdentified(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <FinishDialog
        open={isGameOver}
        setOpen={setIsGameOver}
        prize={prize}
        won={won}
        participants={participants}
      />
      {!isIdentified ? (
        <Login login={login} setLogin={setLogin} handleLogin={handleLogin} />
      ) : (
        <GridGame
          id={id}
          setIsGameOver={setIsGameOver}
          setWon={setWon}
          setParticipants={setParticipants}
        />
      )}
    </div>
  );
}
