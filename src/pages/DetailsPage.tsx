import DetailsDialog from '@/components/detail/DetailsDialog';
import { ModuleChart } from '@/components/ModuleChart';
import Navigation from '@/components/Navigation';
import RealTimeTemperature from '@/components/RealTimeTemperature';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useApi } from '@/hooks/useApi';
import { cn } from '@/lib/utils';
import { Module } from '@/types';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { id } = useParams();
  const { data, isLoading, error, callApi } = useApi<Module>(`/modules/${id}`);

  useEffect(() => {
    callApi();
  }, [isSubmitted]);

  return (
    <div className='flex flex-col gap-2 md:items-center'>
      <Navigation withBackButton />
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
                  <CardTitle className='mb-2'>{data.name}</CardTitle>
                  <div className='flex justify-center gap-4'>
                    <div className='flex flex-col '>
                      <span>Target temperature</span>
                      <p className='text-2xl'>{data.targetTemperature}&deg;C</p>
                    </div>
                    <div className='flex flex-col'>
                      <span>Temperature now</span>
                      <RealTimeTemperature
                        targetTemperature={data.targetTemperature}
                        className='text-2xl'
                        id={data.id}
                      />
                    </div>
                  </div>
                </div>
                <CardDescription>{data.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex justify-around mb-3 text-sm md:justify-center md:gap-8 text-muted-foreground'>
                <div
                  data-testid='rl-temp-details'
                  className={cn(
                    {
                      'bg-green-500/10 text-green-500': data.available,
                      'bg-red-500/10 text-red-500': !data.available,
                    },
                    'flex items-center rounded-md px-3 py-2 font-medium md:w-40 justify-center'
                  )}
                >
                  {data.available ? 'Available' : 'Unavailable'}
                </div>
                <div className='flex items-center rounded-md bg-secondary text-secondary-foreground'>
                  <DetailsDialog
                    available={data.available}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                  />
                </div>
              </div>
              <ModuleChart />
            </CardContent>
          </Card>
        )}
      </div>

      {error && <p>{error.message}</p>}
    </div>
  );
};

export default DetailsPage;
