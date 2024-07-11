import { Module } from '@/types';
import MobileModuleListItem from './MobileModuleListItem';

interface MobileModuleListProps {
  data: Array<Module>;
}

export default function MobileModuleList({ data }: MobileModuleListProps) {
  return (
    <div className='grid gap-4'>
      {data.map((module) => (
        <div className='grid gap-4'>
          <MobileModuleListItem module={module} />
        </div>
      ))}
    </div>
  );
}
