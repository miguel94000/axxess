import { Button } from '@shadcn-in-nx/ui';
import { useState } from 'react';
import { z } from 'zod';

export interface LoginProps {
  login: string;
  setLogin: (login: string) => void;
  handleLogin: (login: string) => void;
}

// Schéma de validation avec Zod
const loginSchema = z
  .string()
  .nonempty('Veuillez entrer votre nom')
  .min(3, 'Le nom doit contenir au moins 3 caractères');

export const Login: React.FC<LoginProps> = ({
  login,
  setLogin,
  handleLogin,
}) => {
  const [error, setError] = useState<string>('');

  const validateLogin = (): boolean => {
    const result = loginSchema.safeParse(login.trim());
    if (!result.success) {
      setError(result.error.errors[0].message);
      return false;
    }
    setError('');
    return true;
  };

  const onSubmit = () => {
    if (validateLogin()) {
      handleLogin(login.trim());
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Entrez votre nom</h2>
      <input
        type="text"
        value={login}
        onChange={(e) => {
          setLogin(e.target.value);
          if (error) validateLogin();
        }}
        className="p-2 border rounded"
        placeholder="Votre nom"
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button onClick={onSubmit} disabled={!login.trim()}>
        Lancer la partie
      </Button>
    </div>
  );
};
