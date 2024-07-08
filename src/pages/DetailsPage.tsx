import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useApi } from '@/hooks/useApi';
import { Module } from '@/types';
import { AlertCircle, ArrowLeft, SquarePen } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useApi<Module>(`/modules/${id}`);

  return (
    <div className='flex flex-col gap-2 md:justify-center'>
      <Button variant='outline' size='default' className=' max-w-24'>
        <Link to='/' className='flex items-center justify-center gap-1'>
          <ArrowLeft className='w-4' />
          Go Back
        </Link>
      </Button>
      {isLoading && <p>Loading...</p>}
      <div className='flex flex-col gap-2 md:max-w-[800px]'>
        {!data?.available && (
          <Alert variant='destructive'>
            <AlertCircle className='w-6 h-6' />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>This module is not editable.</AlertDescription>
          </Alert>
        )}
        {data && (
          <Card>
            <CardHeader>
              <div className='flex flex-col gap-2'>
                <div className='flex-1'>
                  <CardTitle className=''>{data.name}</CardTitle>
                  <p className='text-2xl'>{data.targetTemperature}&deg;C</p>
                </div>
                <CardDescription>{data.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex justify-around text-sm md:justify-center md:gap-8 text-muted-foreground'>
                <div
                  id='availability'
                  className={`rounded-md px-3 py-2 font-medium md:w-40 ${
                    data.available
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  {data.available ? 'Available' : 'Unavailable'}
                </div>
                <div className='flex items-center rounded-md bg-secondary text-secondary-foreground'>
                  <Button
                    disabled={!data.available}
                    className='flex gap-1 md:w-40'
                  >
                    <SquarePen className='w-4 h-4' />
                    <span>Edit</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {error && <p>{error.message}</p>}
    </div>
  );
};

export default DetailsPage;
