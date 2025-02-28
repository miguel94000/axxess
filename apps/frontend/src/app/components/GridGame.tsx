import { GridCase, GridCaseStateEnum } from '@models';
import axios from 'axios';
import { useState } from 'react';
export interface GridGameProps {
  id: string;
  setIsGameOver: (isGameOver: boolean) => void;
  setWon: (won: boolean) => void;
}

export const GridGame: React.FC<GridGameProps> = (props: GridGameProps) => {
  const { id, setIsGameOver, setWon } = props;
  const [grid, setGrid] = useState<GridCase[]>(
    Array.from({ length: 9 }, (_, index) => ({
      position: index,
      state: GridCaseStateEnum.UNCHECKED,
    }))
  );

  const markCase = async (position: number) => {
    const caseIndex = grid.findIndex((c) => c.position === position);
    const result = await axios.post('http://localhost:3001/scratched', {
      id,
      position,
    });
    const isWinning = result.data.isWinning;
    const tries = result.data.tries;

    if (caseIndex !== -1) {
      grid[caseIndex].state = isWinning
        ? GridCaseStateEnum.WINNING
        : GridCaseStateEnum.LOSING;
    }
    setGrid([...grid]);
    if (tries === 3) {
      setIsGameOver(true);
      setWon(result.data.won);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Tentez de gagner en grattant 3 cases
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {grid.map((_, index) => (
          <div
            key={index}
            onClick={() => markCase(index)}
            className={`h-24 w-24 border flex items-center justify-center cursor-pointer transition-colors ${
              grid[index].state === GridCaseStateEnum.WINNING
                ? 'bg-green-300'
                : grid[index].state === GridCaseStateEnum.LOSING
                ? 'bg-red-300'
                : 'bg-gray-200'
            }`}
          >
            {grid[index].state === GridCaseStateEnum.WINNING
              ? 'trouvé'
              : grid[index].state === GridCaseStateEnum.LOSING
              ? 'perdu'
              : ''}
          </div>
        ))}
      </div>
    </div>
  );
};
