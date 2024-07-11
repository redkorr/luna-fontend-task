import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import AddModuleForm from './AddModuleForm';

interface AddModuleButtonProps {
  isSubmitted: boolean;
  setIsSubmitted: (arg: boolean) => void;
}

const AddModuleButton = ({
  isSubmitted,
  setIsSubmitted,
}: AddModuleButtonProps) => {
  return (
    <Dialog data-testid='dialog'>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <Plus className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Add Module</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='md:max-w-[425px] max-w-[350px]'>
        <DialogHeader>
          <DialogTitle>Add module</DialogTitle>
        </DialogHeader>
        <AddModuleForm
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddModuleButton;
