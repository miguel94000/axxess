import { Button } from '@shadcn-in-nx/ui';

export interface LoginProps {
  login: string;
  setLogin: (login: string) => void;
  handleLogin: (login: string) => void;
}

export const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const { login, setLogin, handleLogin } = props;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Entrez votre nom</h2>
      <input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        className="p-2 border rounded"
        placeholder="Votre nom "
      />
      <Button onClick={() => handleLogin(login)}>Lancer la partie</Button>
    </div>
  );
};
