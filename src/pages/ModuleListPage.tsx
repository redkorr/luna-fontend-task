import MobileModuleList from '@/components/module-list/MobileModuleList';
import Navigation from '@/components/Navigation';
import Spinner from '@/components/Spinner';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { columns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { useApi } from '@/hooks/useApi';
import { Module } from '@/types';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const ModuleListPage = () => {
  const { data, isLoading, error, callApi } = useApi<Array<Module>>('/modules');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isSubmitted) return;
    setTimeout(() => {
      callApi();
      document.getElementById('closeDialog')?.click();
    }, 250);

    setIsSubmitted(false);
  }, [isSubmitted]);

  return (
    <div className='flex flex-col items-center gap-2'>
      <Navigation isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />

      {isLoading && <Spinner />}
      {data && (
        <div className='hidden w-[800px] md:block'>
          <DataTable columns={columns} data={data} />
        </div>
      )}
      {data && (
        <div className='block w-full md:hidden'>
          <MobileModuleList data={data} />
        </div>
      )}
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
