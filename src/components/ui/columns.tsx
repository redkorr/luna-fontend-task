import { Module } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  CircleCheck,
  CircleX,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from './button';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import RealTimeTemperature from '../RealTimeTemperature';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<Module>[] = [
  {
    accessorKey: 'name',
    header: () => <div className='text-left'>Name</div>,
    cell: ({ row }) => (
      <div className={cn(row.original.id, 'text-left')}>
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'available',
    header: () => <div className='text-center'>Available</div>,
    cell: ({ row }) => (
      <div className='flex justify-center capitalize'>
        {row.getValue('available') ? (
          <CircleCheck className='text-green-600' />
        ) : (
          <CircleX className='text-red-600' />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'targetTemperature',
    header: ({ column }) => {
      return (
        <div className='flex justify-end'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Target Temperature
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className='text-right'>
        {row.getValue('targetTemperature')}&deg;C
      </div>
    ),
  },
  {
    accessorKey: 'temperatureNow',
    header: () => <div className='text-right'>Temperature Now</div>,
    cell: ({ row }) => (
      <RealTimeTemperature
        className='text-right'
        targetTemperature={row.getValue('targetTemperature')}
        id={row.original.id}
      />
    ),
  },
  {
    header: () => <div className='text-center'>Actions</div>,
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const module = row.original;

      return (
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
      );
    },
  },
];
