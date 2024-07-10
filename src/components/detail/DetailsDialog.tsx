import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ModuleForm from '@/components/ModuleForm';
import { SquarePen } from 'lucide-react';
import { Button } from '../ui/button';

interface DetailsDialogProps {
  isSubmitted: boolean;
  setIsSubmitted: (arg: boolean) => void;
  available: boolean;
}

const DetailsDialog = ({
  isSubmitted,
  setIsSubmitted,
  available,
}: DetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!available} className='flex gap-1 md:w-40'>
          <SquarePen className='w-4 h-4' />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to module here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ModuleForm isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
