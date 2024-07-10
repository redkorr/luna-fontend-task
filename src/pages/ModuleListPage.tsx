import Navigation from '@/components/Navigation';
import Spinner from '@/components/Spinner';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { columns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { useApi } from '@/hooks/useApi';
import { Module } from '@/types';
import { AlertCircle } from 'lucide-react';

const ModuleListPage = () => {
  const { data, isLoading, error } = useApi<Array<Module>>('/modules');

  return (
    <div className='flex flex-col items-center gap-2'>
      <Navigation />

      {isLoading && <Spinner />}
      {data && <DataTable columns={columns} data={data} />}

      {error && (
        <Alert variant='destructive'>
          <AlertCircle className='w-6 h-6' />
          <AlertTitle>{error.message}</AlertTitle>
        </Alert>
      )}
    </div>
  );
};

export default ModuleListPage;
