import { ModeToggle } from '@/components/ModeToggle';
import ModuleForm from '@/components/ModuleForm';
import RealTimeTemperature from '@/components/RealTimeTemperature';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useApi } from '@/hooks/useApi';
import { cn } from '@/lib/utils';
import { Module } from '@/types';
import { AlertCircle, ArrowLeft, SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const DetailsPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { id } = useParams();
  const { data, isLoading, error, callApi } = useApi<Module>(`/modules/${id}`);

  useEffect(() => {
    callApi();
  }, [isSubmitted]);

  return (
    <div className='flex flex-col gap-2 md:justify-center'>
      <div className='flex md:max-w-[800px] justify-between'>
        <Button variant='outline' size='default' className=' max-w-24'>
          <Link to='/' className='flex items-center justify-center gap-1'>
            <ArrowLeft className='w-4' />
            Go Back
          </Link>
        </Button>
        <ModeToggle />
      </div>
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
                      <span className='text-2xl'>
                        {data.targetTemperature}&deg;C
                      </span>
                    </div>
                    <div className='flex flex-col'>
                      <span>Temperature now</span>
                      <RealTimeTemperature
                        targetTemperature={data.targetTemperature}
                        className='text-2xl'
                      />
                    </div>
                  </div>
                </div>
                <CardDescription>{data.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex justify-around text-sm md:justify-center md:gap-8 text-muted-foreground'>
                <div
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        disabled={!data.available}
                        className='flex gap-1 md:w-40'
                      >
                        <SquarePen className='w-4 h-4' />
                        <span>Edit</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to module here. Click save when you're
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      <ModuleForm
                        isSubmitted={isSubmitted}
                        setIsSubmitted={setIsSubmitted}
                      />
                    </DialogContent>
                  </Dialog>
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
