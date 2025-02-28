import { Participant } from '@models';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shadcn-in-nx/ui';

export interface FinishDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  prize: string;
  won: boolean;
  participants: Participant[];
}

export const FinishDialog: React.FC<FinishDialogProps> = ({
  open,
  setOpen,
  prize,
  won,
  participants,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(event: any) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-extrabold uppercase">
            La partie est terminée
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          {won ? (
            <>
              🏆 Félicitations ! <br />
              <br />
              Vous avez gagné : <br />
              <span className="font-bold text-red-500">{prize}</span>
            </>
          ) : (
            <>
              Vous avez perdu ! 🙁
              <br />
              <br />
            </>
          )}
          <div className="mt-4">
            <span className="font-bold">Les trois derniers participants :</span>

            <table className="mx-auto mt-2 border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Nom</th>
                  <th className="border px-4 py-2">Résultat</th>
                  <th className="border px-4 py-2">Date de partie</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{participant.login}</td>
                    <td className="border px-4 py-2">
                      {participant.won ? 'Gagné' : 'Perdu'}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(participant.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <span className="font-bold">
              Vous pourrez retenter votre chance dès demain !
            </span>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
