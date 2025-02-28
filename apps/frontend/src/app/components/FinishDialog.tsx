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
}
export const FinishDialog: React.FC<FinishDialogProps> = (
  props: FinishDialogProps
) => {
  const { open, setOpen, prize, won } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(event: any) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-extrabold	uppercase	">
            La partie est terminé
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          {won ? (
            <>
              🏆 Félicitations !
              <br />
              <br />
              Vous avez gagné :
              <br />
              <span className="font-bold text-red-500">{prize}</span>
            </>
          ) : (
            <>
              Vous avez perdu ! 🙁
              <br />
              <br />
            </>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
