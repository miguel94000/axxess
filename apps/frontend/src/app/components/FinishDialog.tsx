import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn-in-nx/ui';

export interface FinishDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const FinishDialog: React.FC<FinishDialogProps> = ({
  open,
  setOpen,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" fontSize="lg" className="my-3 gap-1">
          TEST
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event: any) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-extrabold	uppercase	">
            Jeu terminé
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'destructive'} type="button">
              ok
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
