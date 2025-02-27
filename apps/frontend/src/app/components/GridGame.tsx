export interface GridGameProps {
  login: string;
  scratched: number[];
  setScratched: (scratched: number[]) => void;
  isGameOver: boolean;
  setIsGameOver: (isGameOver: boolean) => void;
  handleScratch: (index: number) => void;
}

export const GridGame: React.FC<GridGameProps> = (props: GridGameProps) => {
  const { login, scratched, setScratched, handleScratch } = props;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Tentez de gagner en grattant 3 cases
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleScratch(index)}
            className={`h-24 w-24 border flex items-center justify-center cursor-pointer transition-colors ${
              scratched.includes(index) ? 'bg-green-300' : 'bg-gray-200'
            }`}
          >
            {scratched.includes(index) ? 'Gratté' : ''}
          </div>
        ))}
      </div>
    </div>
  );
};
