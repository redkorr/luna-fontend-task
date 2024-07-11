import {
  Dialog,
  DialogContent,
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
    <Dialog data-testid='dialog'>
      <DialogTrigger asChild>
        <Button
          disabled={!available}
          className='flex gap-1 md:w-40'
          data-testid='edit-btn'
        >
          <SquarePen className='w-4 h-4' />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='md:max-w-[425px] max-w-[350px]'>
        <DialogHeader>
          <DialogTitle>Edit module</DialogTitle>
        </DialogHeader>

        <ModuleForm isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
