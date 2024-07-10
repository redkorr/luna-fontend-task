import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { cn } from '@/lib/utils';

interface NavigationProps {
  withBackButton?: boolean;
}

const Navigation = ({ withBackButton = false }: NavigationProps) => {
  return (
    <div
      className={cn(
        { 'flex-row-reverse': withBackButton == false },
        'flex justify-between w-full max-w-[800px]'
      )}
    >
      {withBackButton && (
        <Button
          variant='outline'
          size='default'
          className=' max-w-24'
          data-testid='back-btn'
        >
          <Link to='/' className='flex items-center justify-center gap-1'>
            <ArrowLeft className='w-4' />
            Go Back
          </Link>
        </Button>
      )}
      <ModeToggle />
    </div>
  );
};

export default Navigation;
