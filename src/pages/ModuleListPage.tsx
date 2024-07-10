import Navigation from '@/components/Navigation';
import { columns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import { useApi } from '@/hooks/useApi';
import { Module } from '@/types';

const ModuleListPage = () => {
  const { data, isLoading, error } = useApi<Array<Module>>('/modules');

  return (
    <div className='flex flex-col items-center gap-2'>
      <Navigation />

      {isLoading && <p>Loading...</p>}
      {data && <DataTable columns={columns} data={data} />}

      {error && <p>{error.message}</p>}
    </div>
  );
};

export default ModuleListPage;
