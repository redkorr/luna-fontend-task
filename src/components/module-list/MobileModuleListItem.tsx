import { Module } from '@/types';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Link } from 'react-router-dom';
import RealTimeTemperature from '../RealTimeTemperature';

interface MobileModuleListItemProps {
  module: Module;
}

const MobileModuleListItem = ({ module }: MobileModuleListItemProps) => {
  return (
    <div
      key={module.id}
      className='flex items-center gap-4 p-4 border-2 rounded-lg shadow-sm bg-background'
    >
      <div className='grid flex-1 gap-1'>
        <div className='flex items-center justify-between'>
          <h3 className='font-medium'>{module.name}</h3>
          <Badge variant='outline' className='px-2 py-1 text-xs'>
            {module.available ? 'Available' : 'Unavailable'}
          </Badge>
        </div>
        <div className='flex justify-between'>
          <div className='w-11/12'>
            <div className='text-sm text-muted-foreground'>
              <span className='font-medium'>Target:</span>{' '}
              <p className='text-2xl'>{module.targetTemperature}&deg;C</p>
            </div>
            <div className='text-sm text-muted-foreground'>
              <span className='font-medium'>Now:</span>{' '}
              {module.available ? (
                <RealTimeTemperature
                  targetTemperature={module.targetTemperature}
                  className='text-2xl'
                  id={module.id}
                />
              ) : (
                <div className='text-2xl '>No data</div>
              )}
            </div>
          </div>
          <div className='flex items-center'>
            <DropdownMenu data-testid='actions-btn'>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='w-8 h-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='w-4 h-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(module.id)}
                >
                  Copy Module ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={`/${module.id}`}>View Details</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileModuleListItem;
